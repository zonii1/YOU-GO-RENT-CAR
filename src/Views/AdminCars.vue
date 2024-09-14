<template>

  <v-container class="mt-5">
    <h2 class="mt-2">All Car Reservations</h2>
    <v-data-table
        :items="reservations"
        class="elevation-1 mt-3"
        :items-per-page="10"
        item-key="id"
    >
      <template v-slot:item.timestamp="{ item }">
        {{ formatDate(item.timestamp) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      reservations: [],
      headers: [
        'No.',
        'Car Name',
        'Registration Number',
        'Pickup City',
        'Dropoff City',
        'Pickup Date',
        'Dropoff Date',
        'Pickup Time',
        'Dropoff Time',
        'Cardholder Name',
        'Reservation Time',
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
      this.reservations = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        index: index + 1,
        ...doc.data(),
      }));
    },
    formatDate(timestamp) {
      if (timestamp && timestamp.toDate) {
        const date = timestamp.toDate();
        return date.toLocaleString();
      }
      return '';
    },
  },
};
</script>

