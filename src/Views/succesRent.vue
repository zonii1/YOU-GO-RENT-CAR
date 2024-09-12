<template>
  <v-container class="mt-5 text-center">

    <v-card color="pink" class="mx-auto mt-15" width="400">
      <v-card-title>
        <h2>Car Rented Successfully!</h2>
      </v-card-title>

      <v-card-text class="">
        <div class="d-flex justify-center">
          <v-img width=""  src="/greenMark.png"></v-img>
        </div>

        <p>Thank you for renting a car with us.</p>
        <p>We hope you enjoy your ride!</p>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="$router.push('/')">Back to Home</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>


export default {
  name: "SuccessRent",

};
</script>

<style scoped>
.v-container {
  max-width: 500px;
  margin: auto;
}
</style>
