<template>
  <v-app>
    <v-container  fluid class="main pt-10">

      <v-card class="ma-0 pa-0 background-image">
        <v-row class="mt-10">
          <v-col>
            <div class="text-content">
              <h1 class="main-title">YOU GO<br /><span class="highlight">RENT</span></h1>
              <p class="main-subtitle">
                Where every mile feels like a smile! <br />
                Experience the joy of the open road with our top rental options. <br />
                Every kilometer feels even sweeter!
              </p>
              <v-btn class="join-us-button">JOIN US</v-btn>
            </div>
          </v-col>

          <v-col>
            <v-card class="login-card mx-auto mt-6" max-width="400">
              <v-card-title class="login-title">
                <h2>Login Here</h2>
              </v-card-title>
              <v-card-text>
                <v-text-field
                    v-model="email"
                    label="Enter Email Here"
                    type="email"
                    class="login-field"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Enter Password Here"
                    type="password"
                    class="login-field"
                ></v-text-field>
                <v-btn class="login-button" block @click="login">Login</v-btn>
                <v-divider class="my-4"></v-divider>
                <p class="text-center">
                  Don't have an account?<br />
                  <v-btn text class="signup-link" href="#">Sign up</v-btn> here
                </p>
                <p class="text-center">Log in with</p>
                <div class="social-icons">
                  <v-btn icon class="social-icon-btn">
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn icon class="social-icon-btn">
                    <v-icon>mdi-instagram</v-icon>
                  </v-btn>
                  <v-btn icon class="social-icon-btn">
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                  <v-btn icon class="social-icon-btn">
                    <v-icon>mdi-google</v-icon>
                  </v-btn>
                  <v-btn icon class="social-icon-btn">
                    <v-icon>mdi-skype</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <!-- Car Rental Section -->
      <v-container>
        <!-- Pick-Up and Drop-Off Section -->


        <v-divider class="my-6"></v-divider>

        <!-- Popular Cars Section -->
        <v-row>
          <v-col>
            <h2>Popular Cars</h2>
          </v-col>
        </v-row>
        <v-row>
          <!-- Ensure all columns use the same width and class -->
          <v-col v-for="car in popularCars" :key="car.name" cols="12" sm="6" md="3">
            <v-card class="car-card">
              <v-card-title>{{ car.name }}</v-card-title>
              <v-card-subtitle>{{ car.type }}</v-card-subtitle>
              <v-card-text>
                <v-img :width="300" cover :src="car.image"></v-img>
                <div class="d-flex justify-space-between">
                  <span>{{ car.tank }}</span>
                  <span>{{ car.transmission }}</span>
                  <span>{{ car.capacity }} People</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="GoToLogin()" class="car-button" block>{{ car.price }}/day</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import {auth} from "@/firebase.js";
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword from Firebase


export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      scrolled: false,
      pickDrop: 'pick-up',
      pickUpCity: null,
      dropOffCity: null,
      pickUpDate: new Date().toISOString().substr(0, 10),  // Set current date
      dropOffDate: null,
      pickUpTime: null,
      dropOffTime: null,
      cities: ['Pula', 'Zagreb', 'Krk', 'Zadar', 'Split', 'Dubrovnik'],
      popularCars: [
        {
          name: 'Audi TT',
          type: 'Sport',
          tank: '60L',
          image: '../src/assets/auti/audi_tt.png',
          transmission: 'Manual',
          capacity: 2,
          price: '$99.00'
        },
        {
          name: 'Audi A3',
          type: 'Hatchback',
          tank: '50L',
          image: '../src/assets/auti/audia3.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'Audi A4',
          type: 'Sedan',
          tank: '54L',
          image: '../src/assets/auti/audia4.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'Audi RS6',
          type: 'Sport',
          tank: '73L',
          image: '../src/assets/auti/audirs6.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$120.00'
        }
      ],
      recommendedCars: [
        {
          name: 'BMW M2',
          type: 'Sport',
          tank: '52L',
          image: '../src/assets/auti/bmw_m2.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$72.00'
        },
        {
          name: 'BMW M3',
          type: 'Sport',
          tank: '59L',
          image: '../src/assets/auti/bmw_m3.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'BMW M4',
          type: 'Sport',
          tank: '59L',
          image: '../src/assets/auti/bmw_m4.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$74.00'
        },
        {
          name: 'New MG ZS',
          type: 'SUV',
          tank: '80L',
          image: '../src/assets/auti/koenigsegg.png',
          transmission: 'Manual',
          capacity: 4,
          price: '$80.00'
        },
        {
          name: 'Golf 8R',
          type: 'Sport',
          tank: '50L',
          image: '../src/assets/auti/Volkswqagen Golf R-Line 1.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'Golf 7R',
          type: 'Hatchback',
          tank: '50L',
          image: '../src/assets/auti/volkswagen_7r.png',
          transmission: 'Manual',
          capacity: 4,
          price: '$76.00'
        },
        {
          name: 'VW Arteon',
          type: 'Sport',
          tank: '60L',
          image: '../src/assets/auti/png-transparent-car-volkswagen-arteon.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'VW Passat',
          type: 'Limousine',
          tank: '66L',
          image: '../src/assets/auti/png-transparent-car-volkswagen-passat.png',
          transmission: 'Manual',
          capacity: 5,
          price: '$74.00'
        }
      ]
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    GoToLogin()
    {
      this.$router.push({ name: 'login' });
    },
    GoToRentCar()
    {
      this.$router.push({ name: 'rentCar' });
    },
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log('User logged in successfully:', userCredential.user);
        this.GoToRentCar()
        // Handle successful login, such as redirecting the user to another page
      } catch (error) {
        this.errorMessage = error.message;
        console.error('Error logging in:', error);
      }
    },
  }
};
</script>

<style scoped>
/* Reset default margins and paddings */
html, body, v-app, v-container {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Ensure the container takes full height */
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Ensure the background image starts from the top and covers the entire area */
.background-image {
  background-image: url('../assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Make the navbar transparent by default */
.transparent-navbar {
  background-color: transparent !important;
  box-shadow: none !important;
}

/* Apply a black background when scrolled */
.scrolled-navbar {
  background-color: rgba(0, 0, 0, 0.8) !important;
  transition: background-color 0.3s ease;
}

/* Center the navbar items */
.navbar-items {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Increase font size of navbar text and add hover effect */
.navbar-text {
  font-size: 18px;
  color: white !important;
  margin: 0 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar-text:hover {
  background-color: #ff4081;
  color: white !important;
  border-radius: 5px;
}

/* Ensure the text field and text color are visible on the transparent navbar */
.white-text-field .v-input__control {
  color: white !important;
}

/* Change search text field to white background */
.search-text-field .v-input__control {
  background-color: white !important;
  color: black !important;
}

/* Style for search button to match login button */
.search-button {
  background-color: #ff4081 !important;
  color: white !important;
  font-weight: bold;
}

/* Login card styling */
.login-card {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
}

.login-title {
  color: white;
  text-align: center;
}

.login-field {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 10px;
}

.login-button {
  background-color: #ff4081;
  color: white;
  font-weight: bold;
}

.signup-link {
  color: #ff4081 !important;
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icon-btn {
  color: white;
  margin: 0 5px;
}

/* Set the background image */
.background-image {
  background-image: url('../assets/background.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

/* Styling for the main title and subtitle */
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

.main-subtitle {
  font-size: 24px;
  color: white;
  margin-top: -20px;
}

.join-us-button {
  background-color: #ff4081;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 60px;
}

/* Styling for car cards */
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

/* Styling for the Pick-Up and Drop-Off section */
.pick-drop-section {
  background-color: #ff4081 !important;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.pick-drop-section .v-input__control,
.pick-drop-section .v-radio,
.pick-drop-section .v-select__selections {
  color: white !important;
}

.pick-drop-section .v-input__control input {
  color: white !important;
}

.pick-drop-section .v-radio-group__input .v-item--active .v-radio {
  background-color: white !important;
  border-color: white !important;
}

.pick-drop-section .v-select {
  background-color: rgba(255, 255, 255, 0.1);
}

.pick-drop-section .v-text-field {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
