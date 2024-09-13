<template>
  <v-app>
    <v-parallax src="/background.png" height="100vh">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="pa-5" outlined>
              <v-card-title class="headline text-center">Register</v-card-title>
              <v-card-text>
                <v-form ref="form" @submit.prevent="register">
                  <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Email"
                      hint="Enter your email"
                      required
                      prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      type="password"
                      hint="Enter your password"
                      required
                      prepend-icon="mdi-lock"
                  ></v-text-field>
                  <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="Confirm Password"
                      type="password"
                      hint="Re-enter your password"
                      required
                      prepend-icon="mdi-lock-check"
                  ></v-text-field>
                  <v-alert v-if="errorMessage" type="error" dismissible>
                    {{ errorMessage }}
                  </v-alert>
                  <v-btn type="submit" color="primary" block class="my-4">Register</v-btn>
                </v-form>
                <div class="text-center">
                  <v-btn href="/login" @click="goToLogin">Already have an account? Login</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </v-app>
</template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import router from "@/router/index.js";

export default {
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be at least 6 characters',
    ],
    confirmPasswordRules: [
      v => !!v || 'Confirmation is required',
      v => v === this.password || 'Passwords must match',
    ],
  }),
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    async register() {
      const form = this.$refs.form;
      if (form.validate()) {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Passwords do not match';
          return;
        }
        try {
          const userCredential = await createUserWithEmailAndPassword(
              auth,
              this.email,
              this.password
          );
          console.log('User registered successfully:', userCredential.user);
          this.errorMessage = '';
          // Redirect to the desired page after registration
          await router.push('/rentCar');
        } catch (error) {
          this.errorMessage = error.message;
          console.error('Error registering user:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.v-application {
  background-color: #f5f5f5;
}
</style>
