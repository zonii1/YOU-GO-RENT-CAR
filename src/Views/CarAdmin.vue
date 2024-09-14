<template>
  <div class="ma-15">
    <h2 class="mt-2">All Cars</h2>
    <v-data-table
        :headers="headers"
        :items="cars"
        class="elevation-1 mt-3"
        :items-per-page="10"
        item-key="id"
    >
      <!-- Display the car image -->
      <template v-slot:item.imageUrls="{ item }">
        <v-img
            v-if="item.imageUrls && item.imageUrls.length"
            :src="item.imageUrls[0]"
            max-width="100"
            max-height="100"
        ></v-img>
      </template>

      <!-- Format the dateAdded -->
      <template v-slot:item.dateAdded="{ item }">
        {{ formatDate(item.dateAdded) }}
      </template>

      <!-- Availability Toggle Switch -->
      <template v-slot:item.available="{ item }">
        <v-switch
            v-model="item.available"
            @change="updateAvailability(item)"
            inset
            color="green"
            hide-details
        ></v-switch>
      </template>

      <!-- Add the delete icon -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="deleteCar(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db, storage } from '@/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';

export default {
  data() {
    return {
      cars: [],
      headers: [
        {title: 'Car Name', value: 'carName'},
        {title: 'Car Type', value: 'carType'},
        {title: 'Price Per Day', value: 'pricePerDay'},
        {title: 'Seating Capacity', value: 'seatingCapacity'},
        {title: 'Fuel Type', value: 'fuelType'},
        {title: 'Transmission', value: 'transmission'},
        {title: 'Available', value: 'available', sortable: false},
        {title: 'Image', value: 'imageUrls', sortable: false},
        {title: 'delete', value: 'actions', sortable: false}, // Actions column
      ],
    };
  },
  created() {
    this.fetchCars();
  },
  methods: {
    fetchCars() {
      const carsRef = collection(db, 'cars');
      getDocs(carsRef)
          .then((snapshot) => {
            this.cars = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          })
          .catch((error) => {
            console.error('Error fetching cars:', error);
          });
    },
    formatDate(timestamp) {
      if (timestamp) {
        if (timestamp.toDate) {
          // Firestore Timestamp object
          const date = timestamp.toDate();
          return date.toLocaleString();
        } else if (timestamp instanceof Date) {
          // JavaScript Date object
          return timestamp.toLocaleString();
        } else if (typeof timestamp === 'string') {
          // ISO date string
          const date = new Date(timestamp);
          return date.toLocaleString();
        }
      }
      return '';
    },
    deleteCar(car) {
      // Confirm deletion
      if (!confirm(`Are you sure you want to delete ${car.carName}?`)) {
        return;
      }

      // Delete the car document
      deleteDoc(doc(db, 'cars', car.id))
          .then(() => {
            this.cars = this.cars.filter((item) => item.id !== car.id);
            // Optionally delete images from Firebase Storage
            if (car.imageUrls && car.imageUrls.length) {
              car.imageUrls.forEach((url) => {
                this.deleteImage(url);
              });
            }
          })
          .catch((error) => {
            console.error('Error deleting car:', error);
          });
    },
    deleteImage(url) {
      // Extract the storage path from the URL
      const pathStart = url.indexOf('/o/') + 3;
      const pathEnd = url.indexOf('?');
      let filePath = decodeURIComponent(url.substring(pathStart, pathEnd));

      // Create a reference to the file to delete
      const imageRef = storageRef(storage, filePath);

      // Delete the file
      deleteObject(imageRef)
          .then(() => {
            console.log('Image deleted successfully:', filePath);
          })
          .catch((error) => {
            console.error('Error deleting image:', error);
          });
    },
    updateAvailability(car) {
      // Update the 'available' field in Firestore
      const carRef = doc(db, 'cars', car.id);
      updateDoc(carRef, {available: car.available})
          .then(() => {
            console.log(
                `Availability of ${car.carName} updated to ${car.available}`
            );
          })
          .catch((error) => {
            console.error('Error updating availability:', error);
          });
    },
  },
};
</script>

<style scoped>
.ma-15 {
  margin: 15px;
}
</style>
