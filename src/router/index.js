// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from "../Views/Register.vue";
import HomePage from "../Views/HomePage.vue";
import addNewCar from "../Views/addNewCar.vue";


const routes = [
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/register',
        name: 'Home',
        component: Register,
    },

    {
        path: '/addNewCar',
        name: 'Home',
        component: addNewCar,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
