<template>
  <v-app>
    <v-app-bar
        :elevate-on-scroll="true"
        flat
        :class="scrolled ? 'scrolled-navbar' : 'transparent-navbar'"
    >
      <v-toolbar-title></v-toolbar-title>
      <v-img src="/yu logo.PNG"> </v-img>
      <v-spacer></v-spacer>

      <div class="navbar-items">
        <v-btn text class="navbar-text" @click="$router.push('/')" href="#">HOME</v-btn>
        <v-btn text class="navbar-text" href="#">PITANJA</v-btn>
        <v-btn text class="navbar-text" href="#">KONTAKT</v-btn>
        <v-btn text class="navbar-text" href="#">VIŠE</v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Display user's email if logged in -->
      <div v-if="user">
        <v-btn text class="navbar-text">{{ user.email }}</v-btn>
        <v-btn @click="logout" color="error">Logout</v-btn>
      </div>

      <!-- Show login/signup options if not logged in -->
      <div v-else>
        <v-text-field
            solo
            hide-details
            placeholder="Type here"
            class="mr-2 search-text-field"
        ></v-text-field>
        <v-btn class="search-button">Search</v-btn>
        <v-btn class="navbar-text" href="/login">Login</v-btn>
        <v-btn class="navbar-text" href="/signup">Sign Up</v-btn>
      </div>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { auth } from '@/firebase'; // Import Firebase Auth
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import auth state and sign out

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
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    async logout() {
      // Logout user from Firebase
      await signOut(auth);
      this.user = null;
    },

    goto
  },
};
</script>

<style scoped>
/* Your existing styles here */
</style>
