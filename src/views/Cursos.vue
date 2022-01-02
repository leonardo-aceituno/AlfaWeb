<template>
  <v-container class="my-5">
    <v-toolbar-title class="my-5">LISTA DE CURSOS</v-toolbar-title>
    <!-- <h1 class="text-center my-5">LISTA DE CURSOS</h1> -->
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in cursosActualizados"
          :key="index"
          cols="12"
          sm="4"
        >
          <Card :curso="item" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Card from "@/components/Card";
export default {
  name: "cursos",
  components: { Card },
  created() {
    this.getCursos();
  },
  computed: {
    ...mapState("cursos", ["cursos"]),
    ...mapGetters("cursos", ["cursosActualizados"]),
  },

  methods: {
    ...mapActions("cursos", ["getCursos"]),
  },
};
</script>

<style></style>
