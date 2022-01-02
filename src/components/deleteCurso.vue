<template>
  <div>
    <div>
      <div>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          absolute
          top
          color="red "
          class="my-5"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
    <template>
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <v-dialog v-model="dialogDelete" max-width="550px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Quieres eliminar este elemento?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "deletecurso",
  props: { item: { type: Object } },
  data() {
    return {
      snackbar: false,
      text: "Curso Eliminado",
      timeout: 4000,

      dialogDelete: false,
      curso: {
        codigo: "",
        costo: "",
        cupos: "",
        descripcion: "",
        duracion: "",
        estado: "false",
        fecha: new Date(),
        imagen: "",
        inscritos: "",
        nombre: "",
      },
      defaultCurso: {
        codigo: "",
        costo: "",
        cupos: "",
        descripcion: "",
        duracion: "",
        estado: "",
        fecha: "",
        imagen: "",
        inscritos: "",
        nombre: "",
      },
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions("cursos", ["getCursos"]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.curso = Object.assign({}, this.defaultCurso);
      });
    },

    // INICIO

    // -> abre mensaje
    deleteItem(item) {
      this.dialogDelete = true;
    },

    // -> Salir sin confirmar
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    // -> Salir y Eliminar
    deleteItemConfirm(item) {
      this.deleteCurso(item);
      console.log("el item", item);
      this.closeDelete();
      this.snackbar = true;
    },

    async deleteCurso(item) {
      const id = item.id;
      try {
        await this.$store.dispatch("cursos/deleteCurso", id);
        this.getCursos();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
