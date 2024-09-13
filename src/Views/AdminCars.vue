<template>
  <v-container class="mt-5">
    <h2>All Car Reservations</h2>
    <v-data-table
        :headers="headers"
        :items="reservations"
        class="elevation-1"
        :items-per-page="10"
    >
      <template v-slot:item.timestamp="{ item }">
        {{ formatDate(item.timestamp) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { db } from '@/firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods

export default {
  data() {
    return {
      reservations: [],
      headers: [
        { text: 'Car Name', value: 'carName' },
        { text: 'Registration Number', value: 'carRegistrationNumber' },
        { text: 'Pickup City', value: 'pickupCity' },
        { text: 'Dropoff City', value: 'dropoffCity' },
        { text: 'Pickup Date', value: 'pickupDate' },
        { text: 'Dropoff Date', value: 'dropoffDate' },
        { text: 'Pickup Time', value: 'pickupTime' },
        { text: 'Dropoff Time', value: 'dropoffTime' },
        { text: 'Cardholder Name', value: 'cardName' },
        { text: 'Reservation Time', value: 'timestamp' },
      ],
    };
  },
  async created() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      const reservationsRef = collection(db, 'reservations');
      const snapshot = await getDocs(reservationsRef);
      this.reservations = snapshot.docs.map((doc) => doc.data());
    },
    formatDate(timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleString();
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1000px;
  margin: auto;
}
</style>
