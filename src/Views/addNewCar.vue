<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-5">
          <v-card-title class="justify-center">
            <h1 class="text-h4 font-weight-bold">Add New Car</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" class="mt-4">
            <v-row>
              <!-- Car Name -->
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="form.carName"
                    label="Car Name"
                    hint="Enter car name"
                    required
                    outlined
                ></v-text-field>
              </v-col>

              <!-- Car Type -->
              <v-col cols="12" sm="6">
                <v-select
                    v-model="form.carType"
                    :items="carTypes"
                    label="Car Type"
                    hint="Select car type"
                    required
                    outlined
                ></v-select>
              </v-col>

              <!-- Price per Day -->
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="form.pricePerDay"
                    label="Price Per Day (USD)"
                    hint="Enter price per day"
                    type="number"
                    required
                    outlined
                ></v-text-field>
              </v-col>

              <!-- Seating Capacity -->
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="form.seatingCapacity"
                    label="Seating Capacity"
                    hint="Enter seating capacity"
                    type="number"
                    required
                    outlined
                ></v-text-field>
              </v-col>

              <!-- Fuel Type -->
              <v-col cols="12" sm="6">
                <v-select
                    v-model="form.fuelType"
                    :items="fuelTypes"
                    label="Fuel Type"
                    hint="Select fuel type"
                    required
                    outlined
                ></v-select>
              </v-col>

              <!-- Transmission Type -->
              <v-col cols="12" sm="6">
                <v-select
                    v-model="form.transmission"
                    :items="transmissionTypes"
                    label="Transmission Type"
                    hint="Select transmission type"
                    required
                    outlined
                ></v-select>
              </v-col>

              <!-- Availability -->

            </v-row>

            <!-- Upload Car Images -->
            <h3 class="mt-6 mb-4 text-h5 font-weight-medium">Upload Car Images</h3>
            <v-file-input
                v-model="selectedFiles"
                label="Select Images"
                accept="image/*"
                multiple
                prepend-icon="mdi-camera"
                outlined
                show-size
                counter
                @change="handleFileUpload"
            ></v-file-input>

            <!-- Uploaded Images -->
            <v-row v-if="imageSrc.length" class="mt-4">
              <v-col
                  v-for="(src, index) in imageSrc"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
              >
                <v-card class="pa-1">
                  <v-img :src="src" aspect-ratio="1" class="rounded"></v-img>
                  <v-card-actions class="justify-center">
                    <v-btn icon color="red" @click="removeItem(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-subtitle class="text-truncate">
                    {{ selectedFiles[index].name }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-btn
                color="success"
                class="mt-6"
                @click="submitForm"

                block
                large
            >
              Add Car
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
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
  available: true,
});

// Dropdown options
const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Coupe', 'Van', 'Truck'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissionTypes = ['Manual', 'Automatic'];

// Image handling
const imageSrc = ref([]);
const selectedFiles = ref([]);

const handleFileUpload = () => {
  imageSrc.value = [];
  for (let i = 0; i < selectedFiles.value.length; i++) {
    const file = selectedFiles.value[i];
    const src = URL.createObjectURL(file);
    imageSrc.value.push(src);
  }
};

const removeItem = (index) => {
  selectedFiles.value.splice(index, 1);
  imageSrc.value.splice(index, 1);
};

// Upload images to Firebase Storage and save data to Firestore
const submitForm = async () => {
  try {
    // Validate form before submission
    if (!form.value.carName || !form.value.carType || !form.value.pricePerDay || !form.value.seatingCapacity || !form.value.fuelType || !form.value.transmission) {
      alert('Please fill in all required fields.');
      return;
    }

    // Step 1: Upload all images to Firebase Storage
    const imageUrls = [];

    for (const file of selectedFiles.value) {
      const storagePath = `cars/${Date.now()}_${file.name}`;
      const imageRef = storageRef(storage, storagePath);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL);
    }

    // Step 2: Add car details to Firestore
    const carData = {
      carName: form.value.carName,
      carType: form.value.carType,
      pricePerDay: form.value.pricePerDay,
      seatingCapacity: form.value.seatingCapacity,
      fuelType: form.value.fuelType,
      transmission: form.value.transmission,
      available: true,
      imageUrls: imageUrls,
    };

    const docRef = await addDoc(collection(db, "cars"), carData);
    console.log("Document written with ID: ", docRef.id);
    alert('Car added successfully!');

    // Reset form after submission
    form.value = {
      carName: '',
      carType: '',
      pricePerDay: null,
      seatingCapacity: null,
      fuelType: '',
      transmission: '',
      available: false,
    };
    selectedFiles.value = [];
    imageSrc.value = [];


  } catch (error) {
    console.error("Error adding car: ", error);
    alert('An error occurred while adding the car. Please try again.');
  }

};
</script>

<style scoped>
.v-card-title h1 {
  margin: 0;
}
.v-card-subtitle {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.rounded {
  border-radius: 8px;
}
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
