<template>
  <v-app>
    <div class="d-flex justify-center mt-10">
      <v-card  height="" color="pink" class="ma-4 pa-10">
        <v-card-title>Register</v-card-title>
        <form @submit.prevent="submit">
          <v-text-field
              v-model="name.value.value"
              :counter="10"
              :error-messages="name.errorMessage.value"
              label="Name"
          ></v-text-field>

          <v-text-field
              v-model="phone.value.value"
              :counter="7"
              :error-messages="phone.errorMessage.value"
              label="Phone Number"
          ></v-text-field>

          <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
          ></v-text-field>



          <v-btn
              class="me-4"
              type="submit"
          >
            submit
          </v-btn>

          <v-btn @click="handleReset">
            clear
          </v-btn>
        </form>
      </v-card>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name (value) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    phone (value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Phone number needs to be at least 7 digits.'
    },
    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    select (value) {
      if (value) return true

      return 'Select an item.'
    },
    checkbox (value) {
      if (value === '1') return true

      return 'Must be checked.'
    },
  },
})
const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<style scoped>
/* Reset default margins and paddings */
html, body, v-app, v-container {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Ensure the container takes full height */
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Ensure the background image starts from the top and covers the entire area */
.background-image {
  background-image: url('../src/assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Make the navbar transparent by default */
.transparent-navbar {
  background-color: transparent !important;
  box-shadow: none !important;
}

/* Apply a black background when scrolled */
.scrolled-navbar {
  background-color: rgba(0, 0, 0, 0.8) !important;
  transition: background-color 0.3s ease;
}

/* Center the navbar items */
.navbar-items {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Increase font size of navbar text and add hover effect */
.navbar-text {
  font-size: 18px;
  color: white !important;
  margin: 0 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar-text:hover {
  background-color: #ff4081;
  color: white !important;
  border-radius: 5px;
}

/* Ensure the text field and text color are visible on the transparent navbar */
.white-text-field .v-input__control {
  color: white !important;
}

/* Change search text field to white background */
.search-text-field .v-input__control {
  background-color: white !important;
  color: black !important;
}

/* Style for search button to match login button */
.search-button {
  background-color: #ff4081 !important;
  color: white !important;
  font-weight: bold;
}

/* Login card styling */
.login-card {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
}

.login-title {
  color: white;
  text-align: center;
}

.login-field {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 10px;
}

.login-button {
  background-color: #ff4081;
  color: white;
  font-weight: bold;
}

.signup-link {
  color: #ff4081 !important;
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icon-btn {
  color: white;
  margin: 0 5px;
}

/* Set the background image */
.background-image {
  background-image: url('../src/assets/background.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

/* Styling for the main title and subtitle */
.text-content {
  text-align: left;
  padding-left: 60px;
}

.main-title {
  font-size: 80px;
  font-weight: bold;
  color: white;
}

.highlight {
  color: #ff4081;
}

.main-subtitle {
  font-size: 24px;
  color: white;
  margin-top: -20px;
}

.join-us-button {
  background-color: #ff4081;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 60px;
}

/* Styling for car cards */
.car-card {
  background-color: #ff4081 !important;
  color: white !important;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.car-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.car-button {
  background-color: white !important;
  color: #ff4081 !important;
  font-weight: bold;
}

/* Styling for the Pick-Up and Drop-Off section */
.pick-drop-section {
  background-color: #ff4081 !important;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.pick-drop-section .v-input__control,
.pick-drop-section .v-radio,
.pick-drop-section .v-select__selections {
  color: white !important;
}

.pick-drop-section .v-input__control input {
  color: white !important;
}

.pick-drop-section .v-radio-group__input .v-item--active .v-radio {
  background-color: white !important;
  border-color: white !important;
}

.pick-drop-section .v-select {
  background-color: rgba(255, 255, 255, 0.1);
}

.pick-drop-section .v-text-field {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
