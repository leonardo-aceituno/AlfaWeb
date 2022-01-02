<template>
  <div>
    <div>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        absolute
        top
        color="success"
        text
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-dialog v-model="dialog" max-width="550px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          small
          rounded
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ titulo }}</span>
        </v-card-title>

        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            d-flex
            justify-center
            class="px-5"
            @submit.prevent="save(curso)"
          >
            <v-text-field
              v-model="curso.nombre"
              label="Curso"
              type="text"
              :rules="rules.curso"
              required
              class="mb-5"
            ></v-text-field>

            <v-text-field
              v-model="curso.imagen"
              label="URL Imagen"
              type="text"
              hint="https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"
              persistent-hint
              required
              class="mb-5"
              :rules="rules.imagen"
            ></v-text-field>

            <v-text-field
              v-model="curso.cupos"
              label="Cupos"
              type="number"
              min="0"
              max="50"
              required
              class="mb-5"
              :rules="rules.cupos"
            ></v-text-field>

            <v-text-field
              v-model="curso.inscritos"
              label="Inscritos"
              type="number"
              min="0"
              max="50"
              required
              class="mb-5"
              :rules="rules.inscritos"
            ></v-text-field>

            <v-text-field
              v-model="curso.duracion"
              label="Duracion"
              type="text"
              required
              class="mb-5"
              :rules="rules.duracion"
            ></v-text-field>

            <v-text-field
              prefix="$"
              v-model.number="curso.costo"
              label="Costo"
              type="number"
              required
              class="mb-5"
              :rules="rules.costo"
            ></v-text-field>

            <v-text-field
              v-model="curso.codigo"
              label="Codigo"
              type="text"
              required
              class="mb-5"
              :rules="rules.codigo"
            ></v-text-field>

            <v-textarea
              v-model="curso.descripcion"
              label="Descripción"
              type="text"
              required
              outlined
              class="mb-5"
              counter="200"
              :rules="rules.descripcion"
            ></v-textarea>

            <div class="d-flex justify-end">
              <v-btn color="error" class="mr-4" @click="close"> Cancel </v-btn>
              <v-btn
                type="submit"
                color="success"
                class="mr-0"
                :disabled="!valid"
              >
                Save
              </v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "addcurso",
  data() {
    return {
      snackbar: false,
      text: "Curso creado",
      timeout: 3000,
      valid: true,
      titulo: "Agregar Curso",
      dialog: false,
      curso: {
        codigo: "",
        costo: "",
        cupos: "",
        descripcion: "",
        duracion: "",
        estado: "false",
        fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
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
        fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        imagen: "",
        inscritos: "",
        nombre: "",
      },
      rules: {
        curso: [
          (v) => !!v || "campo requerido",
          (v) => (v && v.length <= 100) || "Debe tener menos de 100 caracteres",
        ],
        imagen: [(v) => !!v || "campo requerido"],
        cupos: [
          (v) => !!v || "campo requerido",
          (v) => (v && v <= 50) || "valor maximo 50",
          (v) => (v && v >= 0) || "valor minimo 0",
        ],
        inscritos: [
          (v) => !!v || "campo requerido",
          (v) => (v && v <= 50) || "valor maximo 50",
          (v) => (v && v >= 0) || "valor minimo 0",
          (v) =>
            this.validarCupo() ||
            "Numero de inscritos no puede ser mayor que los cupos",
        ],

        duracion: [(v) => !!v || "campo requerido"],
        costo: [
          (v) => !!v || "campo requerido",
          (v) => (v && v >= 0) || "valor minimo 0",
        ],
        codigo: [(v) => !!v || "campo requerido"],
        descripcion: [
          (v) => !!v || "campo requerido",
          (v) => (v && v.length <= 200) || "Debe tener menos de 100 caracteres",
        ],
        // codigo: [],
        // descripcion: [
        //   (v) => !!v || "campo requerido",
        //   (v && v.length <= 200) || "Debe tener menos de 100 caracteres",
        // ],
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

    validarCupo() {
      const inscritos = +this.curso.inscritos;
      const cupos = +this.curso.cupos;

      if (inscritos <= cupos) return true;
      else false;
    },
    close() {
      this.dialog = false;

      this.$nextTick(() => {
        this.curso = Object.assign({}, this.defaultCurso);
      });
    },
    async addCurso(curso) {
      try {
        await this.$store.dispatch("cursos/addCurso", { curso });
      } catch (error) {
        console.log(error);
      }
    },

    save(curso) {
      this.addCurso(curso);
      this.getCursos();
      this.dialog = false;
      this.snackbar = true;
    },
  },
};
</script>

<style></style>
