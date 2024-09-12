<template>
  <div class="d-flex justify-center">
    <v-card class="d-flex justify-center" width="50%" color="primary">
      <div class="mt-15">
        <h1>Add New Car</h1>
        <v-form ref="form">
          <!-- Car Name -->
          <v-text-field
              v-model="form.carName"
              label="Car Name"
              hint="Enter car name"
              required
              outlined
          ></v-text-field>

          <!-- Car Type -->
          <v-select
              v-model="form.carType"
              :items="carTypes"
              label="Car Type"
              hint="Select car type"
              required
              outlined
          ></v-select>

          <!-- Price per Day -->
          <v-text-field
              v-model="form.pricePerDay"
              label="Price Per Day (USD)"
              hint="Enter price per day"
              type="number"
              required
              outlined
          ></v-text-field>

          <!-- Seating Capacity -->
          <v-text-field
              v-model="form.seatingCapacity"
              label="Seating Capacity"
              hint="Enter seating capacity"
              type="number"
              required
              outlined
          ></v-text-field>

          <!-- Fuel Type -->
          <v-select
              v-model="form.fuelType"
              :items="fuelTypes"
              label="Fuel Type"
              hint="Select fuel type"
              required
              outlined
          ></v-select>

          <!-- Transmission Type -->
          <v-select
              v-model="form.transmission"
              :items="transmissionTypes"
              label="Transmission Type"
              hint="Select transmission type"
              required
              outlined
          ></v-select>

          <!-- Availability -->
          <v-checkbox
              v-model="form.available"
              label="Available"
              hint="Check if car is available for rent"
          ></v-checkbox>

          <!-- Upload Car Images -->
          <h3>Upload Car Images</h3>
          <div class="file-container">
            <form>
              <input
                  type="file"
                  id="media"
                  accept="image/*"
                  multiple
                  @change="handleFileUpload"
              />
              <div>
                <section>
                  <v-img width="30" src="/uploadImageIcon.png" />
                  <p>Upload car images here. Max size: 50MB</p>
                </section>
              </div>
            </form>
          </div>

          <!-- Uploaded Images -->
          <div>
            <div class="images">
              <div
                  v-for="(src, index) in imageSrc"
                  :key="index"
                  class="images-lists"
              >
                <div class="image-container">
                  <img :src="src" id="output" class="image-style" />
                </div>
                <div class="cross-icon">
                  <img width="30" src="/cancel.png" @click="removeItem(index)" />
                </div>
                <p class="text-center">
                  {{ selectedFiles[index].name }}
                </p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <v-btn color="success" class="mt-3" @click="submitForm">Add Car</v-btn>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { db, storage } from "@/firebase"; // Firebase Firestore and Storage
import { collection, addDoc } from "firebase/firestore"; // Firestore
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage

// Car details form data
const form = ref({
  carName: '',
  carType: '',
  pricePerDay: null,
  seatingCapacity: null,
  fuelType: '',
  transmission: '',
  available: false,
  media: {}
});

// Dropdown options
const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Coupe', 'Van', 'Truck'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissionTypes = ['Manual', 'Automatic'];

// Image handling
const imageSrc = ref([]);
const selectedFiles = ref([]);

const handleFileUpload = (e) => {
  const files = e.target.files;
  if (!files.length) return;

  for (let i = 0; i < files.length; i++) {
    selectedFiles.value.push(files[i]);
    const src = URL.createObjectURL(files[i]);
    imageSrc.value.push(src);
  }
};

const removeItem = (index) => {
  imageSrc.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
};

// Upload images to Firebase Storage and save data to Firestore
const submitForm = async () => {
  try {
    // Step 1: Upload all images to Firebase Storage
    const imageUrls = [];

    for (const file of selectedFiles.value) {
      const storagePath = `cars/${file.name}`;
      const imageRef = storageRef(storage, storagePath);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL); // Collect all image URLs
    }

    // Step 2: Add car details to Firestore
    const carData = {
      carName: form.value.carName,
      carType: form.value.carType,
      pricePerDay: form.value.pricePerDay,
      seatingCapacity: form.value.seatingCapacity,
      fuelType: form.value.fuelType,
      transmission: form.value.transmission,
      available: form.value.available,
      imageUrls: imageUrls // Store all image URLs
    };

    const docRef = await addDoc(collection(db, "cars"), carData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding car: ", error);
  }
};
</script>

<style>
/* Add your custom styling here */
.file-container {
  position: relative;
  cursor: pointer;
}
form {
  width: 100%;
  border-radius: 5px;
  border: 1.5px dashed #a0a0a0;
  cursor: pointer;
  padding: 20px;
  text-align: center;
}
.images {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.images-lists {
  margin: 10px;
  text-align: center;
}
.image-container {
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  padding: 4px;
}
.image-style {
  height: 150px;
  width: 150px;
  object-fit: cover;
}
.cross-icon {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>
