<template>
  <nav>
    <v-app-bar color="deep-purple" dark fixed>
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="user"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="user" class="d-flex align-end">
        <h4 class="pe-5">{{ user.email }}</h4>
        <v-btn class="ma-2" outlined fab color="white" small @click="doLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Menu Lateral -->
    <v-navigation-drawer v-if="user" v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/lego/1.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> {{ user.email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.nombre }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        { nombre: "Administración", icon: "mdi-storefront", route: "/home" },
        { nombre: "Cursos", icon: "mdi-book-open-outline", route: "/cursos" },
      ],
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Home" });
    },
    async doLogout() {
      try {
        await this.$store.dispatch("user/doLogout");
        this.$router.push({ name: "auth" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
