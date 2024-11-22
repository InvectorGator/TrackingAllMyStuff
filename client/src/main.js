// Import framework libraries
import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarIconSet from 'quasar/icon-set/svg-bootstrap-icons.js';

// Import app-wide Quasar styles
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css';
import 'quasar/src/css/index.sass';

// Import root component and router
import VueApp from './App.vue';
import router from './router.js';


// Create the base application and configure any routing or frameworks.
const trackingAllMyStuffApp = createApp(VueApp);
trackingAllMyStuffApp.use(router).use(Quasar, {
    plugins: {},
    iconSet: quasarIconSet
});

// Mount to the #app div in index.html to start the application!
trackingAllMyStuffApp.mount('#app');