// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles'; // Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import router from './router'; // Import router

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// Use Vuetify and Router with Vue
app.use(vuetify);
app.use(router); // Add the router to the app

app.mount('#app');
