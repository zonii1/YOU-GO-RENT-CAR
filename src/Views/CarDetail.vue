<template>
  <v-container fluid class="car-detail-container">
    <v-btn color="pink" href="/rentCar" icon=""><</v-btn>
    <!-- Car Details Section -->
    <v-row v-if="car" class="mt-5">
      <!-- Image Carousel -->
      <v-col cols="12" md="7">
        <v-carousel
            hide-delimiters
            height="400"
            show-arrows-on-hover
            class="carousel-elevation"
        >
          <v-carousel-item
              v-for="(image, index) in car.imageUrls"
              :key="index"
          >
            <v-img :src="image" height="400px" cover></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <!-- Car Information -->
      <v-col cols="12" md="5">
        <v-card outlined class="pa-4">
          <v-card-title class="headline">
            {{ car.carName }}
          </v-card-title>
          <v-card-subtitle class="subtitle-1 mb-3">
            {{ car.carType }}
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-list dense class="mt-3">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-cash</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Price Per Day: ${{ car.pricePerDay }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-seat-recline-normal</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Seating Capacity: {{ car.seatingCapacity }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-steering</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Transmission: {{ car.transmission }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-fuel</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Fuel Type: {{ car.fuelType }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions class="mt-4">
            <v-btn color="primary" large @click="rentCar">
              Rent It
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Loading car details...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/firebase"; // Import Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

export default {
  props: ["id"], // Get the car ID from the route
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
        name: "PaymentForm",
        params: { id: this.id },
        query: { carName: this.car.carName },
      });
    },
  },
};
</script>

<style scoped>
.car-detail-container {
  padding: 20px;
}

.carousel-elevation {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-card-title,
.v-card-subtitle {
  text-align: center;
}

.v-card-actions {
  justify-content: center;
}

.v-list-item-icon {
  margin-right: 12px;
}
</style>
