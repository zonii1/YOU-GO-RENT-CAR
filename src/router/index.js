// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from "../Views/Register.vue";
import HomePage from "../Views/HomePage.vue";
import addNewCar from "../Views/addNewCar.vue";
import rentCar from "@/Views/rentCar.vue";
import login from "@/Views/Login.vue";
import CarDetail from "@/Views/CarDetail.vue";
import PaymentForm from "@/Views/PaymentForm.vue";
import successRent from "@/Views/succesRent.vue";
import Contact from "@/Views/Contact.vue";
import QandA from "@/Views/QandA.vue";
import more from "@/Views/more.vue";
import AdminCars from "@/Views/AdminCars.vue";
import ContactAdmin from "@/Views/ContactAdmin.vue";
import CarAdmin from "@/Views/CarAdmin.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },

    {
        path: '/addNewCar',
        name: 'addNewCar',
        component: addNewCar,
    },


    {
        path: '/Login',
        name: 'login',
        component: login,
    },
    {
        path: '/successRent',
        name: 'successRent',
        component: successRent,
    },
   {
        path: '/Contact',
        name: 'Contact',
        component: Contact,
    },
   {
        path: '/QandA',
        name: 'QandA',
        component: QandA,
    },
    {
        path: '/AdminCars',
        name: 'AdminCars',
        component: AdminCars,
    },




    {
        path: '/rentCar',
        name: 'rentCar',
        component: rentCar,
    },
    {
        path: '/ContactAdmin',
        name: 'ContactAdmin',
        component: ContactAdmin,
    },
    {
        path: '/CarsAdmin',
        name: 'CarsAdmin',
        component: CarAdmin,
    },
    {
        path: '/car/:id', // Dynamic route to load the selected car's details
        name: 'CarDetail',
        component: CarDetail,
        props: true,
    },

    {
        path: '/payment/:id', // New route for payment
        name: 'PaymentForm',
        component: PaymentForm,
        props: true, // This allows passing the car ID as a prop
    }


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
