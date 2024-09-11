import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles'; // Vuetify styles


import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create Vuetify instance with components and directives
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// Use Vuetify with Vue
app.use(vuetify);

app.mount('#app');
