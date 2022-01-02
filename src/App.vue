<template>
  <v-app>
    <Navbar />

    <v-main class="my-5 pt-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: { Navbar },
  // created() {
  //   this.getCursos();
  // },
  // methods: {
  //   ...mapActions("cursos", ["getCursos"]),
  // },
};
</script>
