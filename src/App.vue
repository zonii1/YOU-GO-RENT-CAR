<template>
  <v-app>
    <v-app-bar

        color="pink"
        :class="scrolled ? 'scrolled-navbar' : 'transparent-navbar'"
    >
      <v-toolbar-title></v-toolbar-title>
      <v-img src="/yu logo.PNG"> </v-img>
      <v-spacer></v-spacer>

      <div class="navbar-items ">
        <v-btn text class="navbar-text" @click="goToPage('')" >HOME</v-btn>
        <v-btn text class="navbar-text" @click="goToPage('QandA')">Q&A</v-btn>
        <v-btn text class="navbar-text" @click="goToPage('contact')">KONTAKT</v-btn>
        <v-btn v-if="user" text class="navbar-text" @click="goToPage('rentCar')">Rent a Car</v-btn>
        <v-btn v-if="user && user.email === 'admin@gmail.com'" text class="navbar-text" @click="goToPage('addNewCar')">New Car</v-btn>
        <v-btn v-if="user && user.email === 'admin@gmail.com'" text class="navbar-text" @click="goToPage('AdminCars')">Reservations</v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Display user's email if logged in -->
      <div v-if="user">
        <v-btn text class="navbar-text">{{ user.email }}</v-btn>
        <v-btn  @click="logout" color="yellow">Logout</v-btn>
      </div>

      <!-- Show login/signup options if not logged in -->
      <div v-else>

        <v-btn class="search-button">Search</v-btn>
        <v-btn class="navbar-text" href="/login">Login</v-btn>
        <v-btn class="navbar-text" href="/register">Sign Up</v-btn>
      </div>
    </v-app-bar>

    <div class="mt-15"></div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { auth } from '@/firebase'; // Import Firebase Auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {createRouter as $router} from "vue-router";
import router from "@/router/index.js"; // Import auth state and sign out

export default {
  data() {
    return {
      scrolled: false,
      user: null, // Store the logged-in user information
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // Firebase auth listener to detect user login state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, store the user's email
        this.user = user;
      } else {
        // No user is logged in
        this.user = null;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    $router,
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    async logout() {
      // Logout user from Firebase
      await signOut(auth);
      this.user = null;
      await router.push('/');
    },
    goToPage(name)
    {
      console.log("test")
      router.push('/' + name);

    },


  },
};
</script>

<style scoped>
/* Your existing styles here */
</style>
