<template>
  <v-container class="my-5">
    <template id="tabla">
      <v-data-table :headers="headers" :items="cursosActualizados">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>ADMINISTRACION</v-toolbar-title>
            <v-spacer></v-spacer>
            <AddCurso />
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }" class="d-flex">
          <!-- <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon> -->
          <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
          <div class="d-flex">
            <EditCurso :item="item" />
            <DeleteCurso :item="item" />
          </div>
        </template>
      </v-data-table>
    </template>

    <template id="informacion">
      <Informacion />
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Informacion from "@/components/Informacion.vue";
import AddCurso from "@/components/addCurso";
import DeleteCurso from "@/components/deleteCurso";
import EditCurso from "@/components/editCurso";
export default {
  name: "administracion-test",
  components: { Informacion, AddCurso, DeleteCurso, EditCurso },
  data() {
    return {
      headers: [
        {
          text: "Curso",
          align: "start",
          sortable: false,
          value: "data.nombre",
        },
        { text: "Cupos", value: "data.cupos" },
        { text: "Inscritos", value: "data.inscritos" },
        { text: "Duración", value: "data.duracion" },
        { text: "Costo", value: "data.costo" },
        // { text: "Terminado", value: "data.estado" },
        { text: "Terminado", value: "data.terminado" },
        { text: "fecha", value: "data.fecha" },
        // { text: "Fecha", value: "data.formatoFecha" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
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
