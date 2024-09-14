<template>
  <div class="ma-15">
    <h2 class="mt-2">All Contact Messages</h2>
    <v-data-table
        :headers="[{ title: 'email', key: 'email' },{ title: 'Username', key: 'name' },{ title: 'message', key: 'message' },{ title: 'date', key: 'timestamp' },{ title: 'delete', value: 'actions', sortable: false }]"
        :items="messages"
        class="elevation-1 mt-3"
        :items-per-page="10"
        item-key="id"
    >
      <!-- Format the timestamp -->
      <template v-slot:item.timestamp="{ item }">
        {{ formatDate(item.timestamp) }}
      </template>

      <!-- Add the delete icon -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="deleteMessage(item.id)">
          mdi-close
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default {
  data() {
    return {
      messages: [],
      headers: [
        { text: 'No.', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Message', value: 'message' },
        { text: 'Timestamp', value: 'timestamp' },
        { text: '', value: 'actions', sortable: false }, // Actions column
      ],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      const messagesRef = collection(db, 'contactMessages');
      getDocs(messagesRef)
          .then((snapshot) => {
            this.messages = snapshot.docs.map((doc, index) => ({
              id: doc.id,
              index: index + 1,
              ...doc.data(),
            }));
          })
          .catch((error) => {
            console.error('Error fetching messages:', error);
          });
    },
    formatDate(timestamp) {
      if (timestamp && timestamp.toDate) {
        const date = timestamp.toDate();
        return date.toLocaleString();
      }
      return '';
    },
    deleteMessage(id) {
      deleteDoc(doc(db, 'contactMessages', id))
          .then(() => {
            this.messages = this.messages.filter((message) => message.id !== id);
          })
          .catch((error) => {
            console.error('Error deleting message:', error);
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
