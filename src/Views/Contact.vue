<template>
  <v-container class="mt-5">
    <v-card class="mx-auto" width="600">
      <v-card-title>
        <h2>Contact Us</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Name Field -->
          <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              label="Your Name"
              required
          ></v-text-field>

          <!-- Email Field -->
          <v-text-field
              v-model="formData.email"
              :rules="emailRules"
              label="Your Email"
              required
          ></v-text-field>

          <!-- Message Field -->
          <v-textarea
              v-model="formData.message"
              :rules="messageRules"
              label="Your Message"
              rows="5"
              required
          ></v-textarea>

          <!-- Submit Button -->
          <v-btn
              :disabled="!valid"
              color="primary"
              class="mt-4"
              @click="submitContactForm"
          >
            Send Message
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// Import Firestore methods from Firebase
import { db } from "@/firebase"; // Ensure Firebase is correctly set up
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

export default {
  data() {
    return {
      valid: false, // Form validation status
      formData: {
        name: '',
        email: '',
        message: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3) || 'Name must be at least 3 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length >= 10) || 'Message must be at least 10 characters'
      ]
    };
  },
  methods: {
    async submitContactForm() {
      if (this.$refs.form.validate()) {
        try {
          // Save contact form data to Firestore
          await addDoc(collection(db, "contactMessages"), {
            name: this.formData.name,
            email: this.formData.email,
            message: this.formData.message,
            timestamp: new Date() // Add a timestamp
          });

          alert('Message Sent Successfully!');
          this.clearForm(); // Clear the form after submission
        } catch (error) {
          console.error("Error sending message: ", error);
          alert('Failed to send message. Please try again.');
        }
      }
    },
    clearForm() {
      this.formData.name = '';
      this.formData.email = '';
      this.formData.message = '';
      this.$refs.form.reset();
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
