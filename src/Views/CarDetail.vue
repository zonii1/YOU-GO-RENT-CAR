<template>
  <v-container fluid class="car-detail-container">
    <!-- Car Image Carousel (Display when car data is available) -->
    <v-row v-if="car" class="mt-5">
      <v-col cols="12">
        <v-carousel hide-delimiters height="400">
          <!-- Loop through the car images to create carousel items -->
          <v-carousel-item v-for="(image, index) in car.imageUrls" :key="index">
            <v-img :src="image" height="400px" cover></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <!-- Car Details -->
      <v-col cols="12" sm="6" class="mt-4">
        <h1>{{ car.carName }}</h1>
        <p><strong>Type:</strong> {{ car.carType }}</p>
        <p><strong>Price Per Day:</strong> ${{ car.pricePerDay }}</p>
        <p><strong>Seating Capacity:</strong> {{ car.seatingCapacity }}</p>
        <p><strong>Transmission:</strong> {{ car.transmission }}</p>
        <p><strong>Fuel Type:</strong> {{ car.fuelType }}</p>

        <v-btn color="primary" large @click="rentCar">Rent It</v-btn>
      </v-col>
    </v-row>

    <!-- Loading state -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate></v-progress-circular>
        <p>Loading car details...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/firebase"; // Import Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

export default {
  props: ['id'], // Get the car ID from the route
  data() {
    return {
      car: null, // To store car details
      error: null, // To store any errors that occur during fetch
    };
  },
  async mounted() {
    await this.fetchCarDetails();
  },
  methods: {
    async fetchCarDetails() {
      try {
        // Fetch the car details from Firestore using the car ID
        const carRef = doc(db, "cars", this.id); // Reference to the specific car document
        const carSnap = await getDoc(carRef);

        if (carSnap.exists()) {
          this.car = carSnap.data(); // Set the car details
        } else {
          // Handle the case where the car is not found
          this.error = "Car details not found!";
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        this.error = "Failed to load car details. Please try again later.";
      }
    },
    rentCar() {
      // Redirect to the payment page with car ID and carName
      this.$router.push({
        name: 'PaymentForm',
        params: {id: this.id},
        query: {carName: this.car.carName}
      });
    }
  }
};
</script>

<style scoped>
.car-detail-container {
  padding: 20px;
}

.v-carousel-item {
  height: 400px;
  background-color: transparent;
}
</style>
