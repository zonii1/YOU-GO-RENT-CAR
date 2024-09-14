<template>
  <v-btn class="ma-15" color="pink" href="/rentCar" icon=""><</v-btn>
  <v-container class="mt-5">
    <h2>Payment for {{ carName }}</h2>
    <h3>Registration Number: {{ carRegistrationNumber }}</h3>

    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Pick-up City -->
      <v-select
          v-model="formData.pickupCity"
          :items="cities"
          label="Pick-up City"
          :rules="cityRules"
          required
      ></v-select>

      <!-- Drop-off City -->
      <v-select
          v-model="formData.dropoffCity"
          :items="cities"
          label="Drop-off City"
          :rules="cityRules"
          required
      ></v-select>

      <!-- Pick-up Date -->
      <v-text-field
          v-model="formData.pickupDate"
          label="Pick-up Date"
          prepend-icon="mdi-calendar"
          type="date"
          :rules="dateRules"
          required
      ></v-text-field>

      <!-- Drop-off Date -->
      <v-text-field
          v-model="formData.dropoffDate"
          label="Drop-off Date"
          prepend-icon="mdi-calendar"
          type="date"
          :rules="dateRules"
          required
      ></v-text-field>

      <!-- Pick-up Time -->
      <v-text-field
          v-model="formData.pickupTime"
          label="Pick-up Time"
          prepend-icon="mdi-clock"
          type="time"
          :rules="timeRules"
          required
      ></v-text-field>

      <!-- Drop-off Time -->
      <v-text-field
          v-model="formData.dropoffTime"
          label="Drop-off Time"
          prepend-icon="mdi-clock"
          type="time"
          :rules="timeRules"
          required
      ></v-text-field>

      <!-- Phone Number -->
      <v-text-field
          v-model="formData.phoneNumber"
          :rules="phoneRules"
          label="Phone Number"
          required
      ></v-text-field>

      <!-- Cardholder's Name -->
      <v-text-field
          v-model="formData.cardName"
          :rules="nameRules"
          label="Cardholder's Name"
          required
      ></v-text-field>

      <!-- Card Number -->
      <v-text-field
          v-model="formData.cardNumber"
          :rules="numberRules"
          label="Card Number"
          hint="Enter a 16-digit card number"
          maxlength="16"
          required
      ></v-text-field>

      <!-- Expiry Date -->
      <v-text-field
          v-model="formData.expiryDate"
          :rules="expiryRules"
          label="Expiry Date (MM/YY)"
          required
      ></v-text-field>

      <!-- CVV -->
      <v-text-field
          v-model="formData.cvv"
          :rules="cvvRules"
          label="CVV"
          maxlength="3"
          type="password"
          required
      ></v-text-field>

      <!-- Pay Button -->
      <v-btn
          :disabled="!valid"
          color="success"
          class="mt-4"
          @click="submitPayment"
      >
        Pay Now
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { db, auth } from '@/firebase'; // Import Firestore and Auth
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'; // Firestore methods

export default {
  data() {
    return {
      valid: false, // Form validation
      carName: '', // Store car name
      carRegistrationNumber: '', // Store generated registration number
      userEmail: '', // User's email
      formData: {
        pickupCity: '',
        dropoffCity: '',
        pickupDate: new Date().toISOString().substr(0, 10), // Initialize with current date
        dropoffDate: '',
        pickupTime: '',
        dropoffTime: '',
        phoneNumber: '', // New field
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      },
      cities: ['Pula', 'Zagreb', 'Krk', 'Zadar', 'Split', 'Dubrovnik'],
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 3) || 'Name must be at least 3 characters',
      ],
      numberRules: [
        (v) => !!v || 'Card number is required',
        (v) => (v && v.length === 16) || 'Card number must be 16 digits',
        (v) => /^\d+$/.test(v) || 'Card number must be numeric',
      ],
      expiryRules: [
        (v) => !!v || 'Expiry date is required',
        (v) => /^\d{2}\/\d{2}$/.test(v) || 'Expiry date must be in MM/YY format',
      ],
      cvvRules: [
        (v) => !!v || 'CVV is required',
        (v) => (v && v.length === 3) || 'CVV must be 3 digits',
        (v) => /^\d+$/.test(v) || 'CVV must be numeric',
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => /^\d{9,15}$/.test(v) || 'Enter a valid phone number',
      ],
      cityRules: [(v) => !!v || 'City is required'],
      dateRules: [(v) => !!v || 'Date is required'],
      timeRules: [(v) => !!v || 'Time is required'],
    };
  },
  async mounted() {
    // Retrieve carName from the query parameters in the URL
    this.carName = this.$route.query.carName || 'Unknown Car';

    // Generate the car registration number
    await this.generateCarRegistrationNumber();

    // Retrieve the user's email
    this.userEmail = auth.currentUser ? auth.currentUser.email : '';
  },
  methods: {
    async generateCarRegistrationNumber() {
      let isUnique = false;

      while (!isUnique) {
        const cityCodes = ['ZG', 'ST', 'RI', 'PU', 'ZD', 'DU'];
        const randomCityCode =
            cityCodes[Math.floor(Math.random() * cityCodes.length)];

        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetters =
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            letters.charAt(Math.floor(Math.random() * letters.length));

        const registrationNumber = `${randomCityCode} ${randomNumbers}-${randomLetters}`;

        // Check if the registration number already exists
        const carRef = doc(db, 'cars', registrationNumber);
        const carDoc = await getDoc(carRef);

        if (!carDoc.exists()) {
          // Registration number is unique
          this.carRegistrationNumber = registrationNumber;
          isUnique = true;
        }
      }
    },
    async submitPayment() {
      if (this.$refs.form.validate()) {
        try {
          // Step 1: Save reservation information to Firestore
          const reservationsRef = collection(db, 'reservations');

          await addDoc(reservationsRef, {
            carName: this.carName,
            carRegistrationNumber: this.carRegistrationNumber,
            pickupCity: this.formData.pickupCity,
            dropoffCity: this.formData.dropoffCity,
            pickupDate: this.formData.pickupDate,
            dropoffDate: this.formData.dropoffDate,
            pickupTime: this.formData.pickupTime,
            dropoffTime: this.formData.dropoffTime,
            phoneNumber: this.formData.phoneNumber, // Include phone number
            userEmail: this.userEmail, // Include user's email
            cardName: this.formData.cardName,
            timestamp: new Date(),
          });

          // // Step 2: Create or update the car's availability in Firestore
          // const carRef = doc(db, 'cars', this.carRegistrationNumber);
          // await setDoc(carRef, {
          //   available: false,
          //   carName: this.carName,
          //   registrationNumber: this.carRegistrationNumber,
          // });

          // Step 3: Show a success message
          alert(
              `Payment successful! The car with registration ${this.carRegistrationNumber} is now rented and unavailable.`
          );

          // Step 4: Redirect the user to the home page (or a confirmation page)
          this.$router.push('/');
        } catch (error) {
          console.error(
              'Error processing payment and updating car availability: ',
              error
          );
          alert('Payment failed. Please try again.');
        }
      } else {
        alert('Please fill in all required fields correctly.');
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
</style>
