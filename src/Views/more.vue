<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="ml-3">
        <v-icon large class="mr-2">mdi-office-building</v-icon>
        {{ companyName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goToLogin">Login</v-btn>
      <v-btn text @click="goToRegister">Register</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="pa-5" elevation="10">
              <v-row>
                <v-col cols="12" md="6">
                  <v-img :src="companyImage" contain></v-img>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-title class="headline">
                    Welcome to {{ companyName }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ companySlogan }}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-form ref="form" @submit.prevent="register">
                      <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="Email"
                          required
                          prepend-icon="mdi-email"
                      ></v-text-field>
                      <v-text-field
                          v-model="password"
                          :rules="passwordRules"
                          label="Password"
                          type="password"
                          required
                          prepend-icon="mdi-lock"
                      ></v-text-field>
                      <v-text-field
                          v-model="confirmPassword"
                          :rules="confirmPasswordRules"
                          label="Confirm Password"
                          type="password"
                          required
                          prepend-icon="mdi-lock-check"
                      ></v-text-field>
                      <v-alert v-if="errorMessage" type="error" dismissible>
                        {{ errorMessage }}
                      </v-alert>
                      <v-btn type="submit" color="primary" block class="my-4">
                        Register
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            © {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved.
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data: () => ({
    companyName: 'Your Company Name',
    companySlogan: 'Leading the way in car rentals',
    companyImage: '/images/company-logo.png',
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
    goToRegister() {
      this.$router.push({ name: 'Register' });
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
          // Redirect to the homepage or dashboard after registration
          this.$router.push({ name: 'HomePage' });
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

.v-card {
  border-radius: 12px;
}

.v-app-bar {
  position: fixed;
}

.v-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.headline {
  font-weight: bold;
}

.v-card-title,
.v-card-subtitle {
  margin-bottom: 16px;
}

.v-img {
  max-height: 200px;
}

@media (max-width: 960px) {
  .v-card {
    margin-top: 80px;
  }
}
</style>
