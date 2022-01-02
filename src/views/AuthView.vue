<template>
  <div>
    <v-container>
      <v-row class="d-flex justify-center mt-6">
        <v-col cols="6">
          <!-- Formulario Login -->
          <template v-if="isLogin">
            <div class="d-flex justify-center py-5">
              <h1>Login</h1>
            </div>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              d-flex
              justify-center
              @submit.prevent="doLogin"
            >
              <!-- Inputs -->
              <v-text-field
                v-model="userData.email"
                :rules="rules.emailRules"
                label="E-mail"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="userData.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                :type="show ? 'text' : 'password'"
                label="Password"
                outlined
                @click:append="show = !show"
              ></v-text-field>
              <!-- End Inputs -->

              <!-- Botones -->
              <div class="d-flex justify-end">
                <v-btn color="error" class="mr-4" @click="resetData">
                  Reset Form
                </v-btn>

                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="success"
                  class="mr-0"
                >
                  Enter
                </v-btn>
              </div>
              <!-- End Botones -->
              <div class="mt-3">
                <a href="#" @click="isLogin = false">¿No tienes una cuenta?</a>
              </div>
            </v-form>
          </template>
          <!-- End Formulario Login -->

          <!-- Formulario Register -->
          <template v-else>
            <div class="d-flex justify-center py-5">
              <h1>Registrar</h1>
            </div>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              d-flex
              justify-center
              @submit.prevent="doRegister"
            >
              <!-- Inputs -->
              <v-text-field
                v-model="userData.name"
                :counter="10"
                :rules="rules.nameRules"
                label="Name"
                required
                outlined
                py="3"
              ></v-text-field>

              <v-text-field
                v-model="userData.email"
                :rules="rules.emailRules"
                label="E-mail"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="userData.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                outlined
                @click:append="show = !show"
              ></v-text-field>
              <!-- End Inputs -->

              <!-- Botones -->
              <div class="d-flex justify-end">
                <v-btn color="error" class="mr-4" @click="resetData">
                  Reset Form
                </v-btn>

                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="success"
                  class="mr-0"
                >
                  Sign Up
                </v-btn>
              </div>
              <!-- End Botones -->

              <div class="mt-3">
                <a href="#" @click="isLogin = true">¿Quieres iniciar sesión?</a>
              </div>
            </v-form>
          </template>
          <!-- End Formulario Register -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLogin: true,
    valid: true,
    userData: {
      name: "",
      email: "",
      password: "",
    },
    rules: {
      nameRules: [
        (v) => !!v || "Campo Oblgatorio",
        (v) =>
          (v && v.length <= 10) || "Nombre debe tener menos de 10 caracteres",
      ],

      emailRules: [
        (v) => !!v || "Campo Oblgatorio",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser válido",
      ],

      password: [
        (v) => !!v || "Campo Oblgatorio.",
        (v) => (v && v.length >= 6) || "Min 6 caracteres",
        // emailMatch: () => `The email and password you entered don't match`,
      ],
    },

    show: false,
  }),

  methods: {
    redirect() {
      this.$router.push({ name: "Cursos" });
    },
    resetData() {
      this.userData.name = this.userData.email = this.userData.password = "";
    },
    async doRegister() {
      console.log("Leo -> registro");

      try {
        await this.$store.dispatch("user/doRegister", {
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
        });
        console.log("Leo -> Cuenta creada");
        this.resetData();
        this.redirect();
      } catch (error) {
        console.error(error.message);
      }
    },

    async doLogin() {
      console.log("Leo -> login");
      try {
        await this.$store.dispatch("user/doLogin", {
          email: this.userData.email,
          password: this.userData.password,
        });
        console.log("Leo -> Logged in");
        this.resetData();
        this.redirect();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
