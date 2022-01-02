import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7AyjFVwSp_0dOZTkgLDz38VoonXsGg5w",
  authDomain: "myproyects-2e0e9.firebaseapp.com",
  projectId: "myproyects-2e0e9",
  storageBucket: "myproyects-2e0e9.appspot.com",
  messagingSenderId: "536151388246",
  appId: "1:536151388246:web:5f1d8c45023c954e60cbf7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
