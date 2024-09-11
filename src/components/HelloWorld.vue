<template>
  <v-app>
    <v-container fluid class="main">
      <!-- Navbar -->
      <v-app-bar :elevate-on-scroll="true" color="primary" dark>
        <v-toolbar-title>
          
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text href="#">HOME</v-btn>
        <v-btn text href="#">POSLOVNICE</v-btn>
        <v-btn text href="#">POSEBNE PONUDE</v-btn>
        <v-btn text href="#">PITANJA</v-btn>
        <v-btn text href="#">KONTAKT</v-btn>
        <v-btn text href="#">VIŠE</v-btn>

        <v-text-field
          solo
          hide-details
          placeholder="Type here"
          class="mr-2"
        ></v-text-field>
        <v-btn color="secondary">Search</v-btn>
      </v-app-bar>

      <!-- Content Section -->
      <v-container class="text-center my-12">
        <v-row>
          <v-col cols="12">
            <h1 class="display-2">YOU GO<br /><span>RENT</span></h1>
            <p class="subheading">
              Where every mile feels like a smile! <br />
              Experience the joy of the open road with our top rental options. <br />
              Every kilometer feels even sweeter!
            </p>
            <v-btn color="secondary">JOIN US</v-btn>
          </v-col>
        </v-row>

        <!-- Login Form -->
        <v-card class="mx-auto mt-6" max-width="400">
          <v-card-title>
            <h2>Login Here</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Enter Email Here" type="email"></v-text-field>
            <v-text-field label="Enter Password Here" type="password"></v-text-field>
            <v-btn color="primary" block>Login</v-btn>
            <v-divider class="my-4"></v-divider>
            <p class="text-center">
              Don't have an account?<br />
              <v-btn text href="#">Sign up</v-btn> here
            </p>
            <p class="text-center">Log in with</p>
            <v-btn icon>
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-google</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-skype</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>

      </v-container>

      <!-- Car Rental Section -->
      <v-container>
        <v-row>
          <v-col>
            <v-radio-group v-model="pickDrop">
              <v-radio label="Pick - Up" value="pick-up"></v-radio>
              <v-radio label="Drop - Off" value="drop-off"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col>
            <v-select label="Select your city"></v-select>
          </v-col>

          <v-col>
            <v-text-field label="Date" type="date"></v-text-field>
          </v-col>

          <v-col>
            <v-text-field label="Time" type="time"></v-text-field>
          </v-col>

          <v-col>
            <v-btn icon>
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

        <!-- Popular Cars Section -->
        <v-row>
          <v-col>
            <h2>Popular Cars</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="car in popularCars" :key="car.name" cols="12" sm="6" md="4">
            <v-card>
              <v-card-title>{{ car.name }}</v-card-title>
              <v-card-subtitle>{{ car.type }}</v-card-subtitle>
              <v-card-text>
                <v-placeholder height="200"></v-placeholder>
                <div class="d-flex justify-space-between">
                  <span>{{ car.tank }}</span>
                  <span>{{ car.transmission }}</span>
                  <span>{{ car.capacity }} People</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="secondary" block>{{ car.price }}/day</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

        <!-- Recommendation Cars Section -->
        <v-row>
          <v-col>
            <h2>Recommendation Cars</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="car in recommendedCars" :key="car.name" cols="12" sm="6" md="4">
            <v-card>
              <v-card-title>{{ car.name }}</v-card-title>
              <v-card-subtitle>{{ car.type }}</v-card-subtitle>
              <v-card-text>
                <v-placeholder height="200"></v-placeholder>
                <div class="d-flex justify-space-between">
                  <span>{{ car.tank }}</span>
                  <span>{{ car.transmission }}</span>
                  <span>{{ car.capacity }} People</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="secondary" block>{{ car.price }}/day</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-btn block color="primary" class="mt-6">Show more cars</v-btn>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      pickDrop: 'pick-up',
      popularCars: [
        {
          name: 'Audi TT',
          type: 'Sport',
          tank: '60L',
          transmission: 'Manual',
          capacity: 2,
          price: '$99.00'
        },
        {
          name: 'Audi A3',
          type: 'Hatchback',
          tank: '50L',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'Audi A4',
          type: 'Sedan',
          tank: '54L',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'Audi RS6',
          type: 'Sport',
          tank: '73L',
          transmission: 'Manual',
          capacity: 5,
          price: '$120.00'
        }
      ],
      recommendedCars: [
        {
          name: 'BMW M3',
          type: 'Sport',
          tank: '52L',
          transmission: 'Manual',
          capacity: 5,
          price: '$72.00'
        },
        {
          name: 'BMW M3',
          type: 'Sport',
          tank: '59L',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'BMW M4',
          type: 'Sport',
          tank: '59L',
          transmission: 'Manual',
          capacity: 5,
          price: '$74.00'
        },
        {
          name: 'New MG ZS',
          type: 'SUV',
          tank: '80L',
          transmission: 'Manual',
          capacity: 4,
          price: '$80.00'
        },
        {
          name: 'Golf 8R',
          type: 'Sport',
          tank: '50L',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'Golf 7R',
          type: 'Hatchback',
          tank: '50L',
          transmission: 'Manual',
          capacity: 4,
          price: '$76.00'
        },
        {
          name: 'VW Arteon',
          type: 'Sport',
          tank: '60L',
          transmission: 'Manual',
          capacity: 5,
          price: '$80.00'
        },
        {
          name: 'VW Passat',
          type: 'Limousine',
          tank: '66L',
          transmission: 'Manual',
          capacity: 5,
          price: '$74.00'
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
.YouGoRentLogo {
  height: 50px;
}
</style>
