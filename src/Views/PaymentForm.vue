<template>
  <v-container class="mt-5">
    <h2>Payment for {{ carName }}</h2>

    <v-form ref="form" v-model="valid" lazy-validation>
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
import { db } from '@/firebase'; // Import Firestore
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'; // Firestore methods

export default {
  props: ['id'], // Receive car ID as prop
  data() {
    return {
      valid: false, // Form validation
      carName: '', // Store car name
      formData: {
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3) || 'Name must be at least 3 characters'
      ],
      numberRules: [
        v => !!v || 'Card number is required',
        v => (v && v.length === 16) || 'Card number must be 16 digits'
      ],
      expiryRules: [
        v => !!v || 'Expiry date is required',
        v => /^\d{2}\/\d{2}$/.test(v) || 'Expiry date must be in MM/YY format'
      ],
      cvvRules: [
        v => !!v || 'CVV is required',
        v => (v && v.length === 3) || 'CVV must be 3 digits'
      ]
    };
  },
  mounted() {
    // Retrieve carName from the query parameters in the URL
    this.carName = this.$route.query.carName || 'Unknown Car'; // Fallback to 'Unknown Car' if carName isn't passed
  },
  methods: {
    async submitPayment() {
      try {
        // Step 1: Save payment information to Firestore
        const paymentsRef = collection(db, 'payments');

        await addDoc(paymentsRef, {
          carName: this.carName,
          carId: this.id,
          cardName: this.formData.cardName,
          cardNumber: this.formData.cardNumber,
          expiryDate: this.formData.expiryDate,
          cvv: this.formData.cvv,
          timestamp: new Date()
        });

        // Step 2: Update the car's availability to false in Firestore
        const carRef = doc(db, 'cars', this.id);
        await updateDoc(carRef, {
          available: false
        });

        // Step 3: Show a success message
        alert('Payment successful! The car is now rented and unavailable.');

        // Step 4: Redirect the user to the home page (or a confirmation page)
        this.$router.push('/');
      } catch (error) {
        console.error("Error processing payment and updating car availability: ", error);
        alert('Payment failed. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
</style>
