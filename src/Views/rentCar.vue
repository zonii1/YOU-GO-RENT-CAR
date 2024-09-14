<template>
  <v-app>
    <v-container fluid class="main pt-10">
      <v-card class="ma-0 pa-0 background-image">
        <v-row class="mt-10">
          <v-col>
            <div class="text-content">
              <h1 class="main-title">
                YOU GO<br /><span class="highlight">RENT</span>
              </h1>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- Car Rental Section -->
      <v-container>
        <!-- Pick-Up and Drop-Off Section -->


        <v-divider class="my-6"></v-divider>

        <!-- Popular CarAdmin.vue Section -->
        <v-row>
          <v-col>
            <h2>Popular Cars</h2>
          </v-col>
        </v-row>

        <!-- CarAdmin.vue fetched from Firestore -->
        <v-row>
          <!-- Update the Car Card to Link to CarDetail.vue -->
          <v-col
              v-for="car in popularCars"
              :key="car.id"
              cols="12"

              sm="6"
              md="3"
          >
            <v-card

                class="car-card"
                @click="$router.push({ name: 'CarDetail', params: { id: car.id } })"
            >
              <v-card-title>{{ car.carName }}</v-card-title>
              <v-card-subtitle>{{ car.carType }}</v-card-subtitle>
              <v-card-text>
                <v-img

                    max-height="250"
                    :src="car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : 'path/to/placeholder.jpg'"
                    cover
                ></v-img>
                <div class="d-flex justify-space-between ma-2">
                  <span>{{ car.transmission }}</span>
                  <span>{{ car.seatingCapacity }} People</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="car-button" block
                >{{ car.pricePerDay }} USD/day</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import { db } from '@/firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods

export default {
  data() {
    return {
      scrolled: false,
      pickUpCity: null,
      dropOffCity: null,
      pickUpDate: new Date().toISOString().substr(0, 10), // Set current date
      dropOffDate: null,
      pickUpTime: null,
      dropOffTime: null,
      cities: ['Pula', 'Zagreb', 'Krk', 'Zadar', 'Split', 'Dubrovnik'],
      popularCars: [], // Will be populated with Firestore data
    };
  },
  async mounted() {
    // Fetch car data from Firestore when component is mounted
    await this.fetchCarsFromFirestore();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    async fetchCarsFromFirestore() {
      try {
        const carsCollection = collection(db, 'cars'); // Reference to the 'cars' collection in Firestore
        const carsSnapshot = await getDocs(carsCollection);
        const carsList = carsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            carName: data.carName || 'No Name',
            carType: data.carType || 'Unknown Type',
            imageUrls: data.imageUrls || [],
            tank: data.tank || 'Unknown',
            transmission: data.transmission || 'Unknown',
            seatingCapacity: data.seatingCapacity || 'Unknown',
            pricePerDay: data.pricePerDay || 'N/A',
            available: data.available || 'N/A',
            // Include any other fields you need
          };
        });
        this.popularCars = carsList; // Set the fetched cars to the `popularCars` array
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.background-image {
  background-image: url('../assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 30vh;
}
.text-content {
  text-align: left;
  padding-left: 60px;
}
.main-title {
  font-size: 80px;
  font-weight: bold;
  color: white;
}
.highlight {
  color: #ff4081;
}
.car-card {
  background-color: #ff4081 !important;
  color: white !important;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.car-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}
.car-button {
  background-color: white !important;
  color: #ff4081 !important;
  font-weight: bold;
}
</style>
