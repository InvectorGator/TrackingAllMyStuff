import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE || "/"),
    routes,
});

export default router;