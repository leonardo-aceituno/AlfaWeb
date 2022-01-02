<template>
  <div class="my-5">
    <v-alert dense outlined color="#F44336" icon="mdi-account-group">
      Cantidad total de alumnos permitidos: <strong> {{ totalCupos }}</strong>
    </v-alert>

    <v-alert dense outlined color="#E91E63" icon="mdi-account-check">
      Cantidad total de alumnos inscritros:
      <strong> {{ totalInscritos }}</strong>
    </v-alert>

    <v-alert dense outlined color="#9C27B0" icon="mdi-account-clock">
      Cantidad total de cupos restantes: <strong> {{ totalRestantes }}</strong>
    </v-alert>

    <v-alert dense outlined color="#673AB7" icon="mdi-block-helper">
      Cantidad total de cursos terminados:
      <strong> {{ totalTerminados }}</strong>
    </v-alert>

    <v-alert dense outlined color="#3F51B5" icon="mdi-bell-ring">
      Cantidad total de cursos activos: <strong> {{ totalActivos }}</strong>
    </v-alert>

    <v-alert dense outlined color="#2196F3" icon="mdi-bell-check">
      Cantidad total de cursos: <strong> {{ totalCursos }}</strong>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("cursos", [
      "totalCupos",
      "totalInscritos",
      "totalRestantes",
      "totalTerminados",
      "totalActivos",
      "totalCursos",
    ]),
  },
};
</script>

<style></style>
