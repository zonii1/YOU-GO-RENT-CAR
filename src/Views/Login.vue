<template class="d-flex justify-center">
  <v-card class="ma-10 pa-5 mt-15" color="pink">
    <v-row>
      <v-col class="d-flex justify-center">
        <v-card width="100%" height="100%" class="pa-2 ma-3 ">
          <h1>Login</h1>

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
            <v-btn color="red" @click="login">Login</v-btn>
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
import {auth} from '@/firebase'; // Import Firebase Auth object
import {signInWithEmailAndPassword} from 'firebase/auth'; // Import sign-in method from Firebase

export default {
  data: () => ({
    email: '',
    password: '',
    errorMessage: '', // To store error messages
  }),
  methods: {
    GoToRentCar() {
      this.$router.push({name: 'rentCar'});
    },
    async login() {
      try {
        // Call the modular method for user login
        const userCredential = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
        );
        console.log('User logged in successfully:', userCredential.user);
        this.GoToRentCar();
        this.errorMessage = ''; // Clear error message on success
      } catch (error) {
        // Handle errors (e.g., wrong password, user not found)
        this.errorMessage = error.message;
        console.error('Error logging in:', error);


      }
    },
  },
};
</script>
