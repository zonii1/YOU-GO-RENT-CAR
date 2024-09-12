<template class="d-flex justify-center">
  <v-card class="ma-10 pa-5 mt-15" color="pink">
    <v-row>
      <v-col class="d-flex justify-center">
        <v-card width="100%" height="100%" class="pa-2 ma-3 ">
          <h1>Register</h1>

<div class="d-flex justify-center">
  <v-text-field
      width="50%"
      v-model="email"
      label="Email"
      hint="Enter your email"
      required
  ></v-text-field>


</div>

          <div class="d-flex justify-center">
          <v-text-field
              v-model="password"

              label="Password"
              type="password"
              hint="Enter your password"
              required
          ></v-text-field>
            </div>

          <v-alert v-if="errorMessage" type="error" dismissible>
            {{ errorMessage }}
          </v-alert>

          <div class="justify-end d-flex">
            <v-btn color="red" @click="register">Register</v-btn>
          </div>

        </v-card>
      </v-col>
      <v-col>
        <v-img src="/background.png"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {auth} from '@/firebase'; // Import the Firebase Auth object
import {createUserWithEmailAndPassword} from 'firebase/auth'; // Import the function directly

export default {
  data: () => ({
    email: '',
    password: '',
    errorMessage: '', // To store error messages
  }),
  methods: {
    async register() {
      try {
        // Call the modular method for user registration
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
        );
        console.log('User registered successfully:', userCredential.user);
        this.errorMessage = ''; // Clear error message on success
      } catch (error) {
        // Handle errors (e.g., invalid email, weak password)
        this.errorMessage = error.message;
        console.error('Error registering user:', error);
      }
    },
  },
};
</script>
