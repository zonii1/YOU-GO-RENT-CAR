<template>
  <v-app>
    <v-parallax src="/background.png" height="100vh">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="pa-5" outlined>
              <v-card-title class="headline text-center">Login</v-card-title>
              <v-card-text>
                <v-form ref="form" @submit.prevent="login">
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
                  <v-alert v-if="errorMessage" type="error" dismissible>
                    {{ errorMessage }}
                  </v-alert>
                  <v-btn type="submit" color="primary" block class="my-4">Login</v-btn>
                </v-form>
                <div class="text-center">
                  <v-btn href="/register" @click="goToSignUp">Don't have an account? Sign up</v-btn>
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
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data: () => ({
    email: '',
    password: '',
    errorMessage: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be at least 6 characters',
    ],
  }),
  methods: {
    goToForgotPassword() {
      this.$router.push({name: 'ForgotPassword'});
    },
    goToSignUp() {
      this.$router.push({name: 'register'});
    },
    async login() {
      const form = this.$refs.form;
      if (form.validate()) {
        try {
          const userCredential = await signInWithEmailAndPassword(
              auth,
              this.email,
              this.password
          );
          console.log('User logged in successfully:', userCredential.user);
          this.$router.push({name: 'rentCar'});
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = error.message;
          console.error('Error logging in:', error);
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
