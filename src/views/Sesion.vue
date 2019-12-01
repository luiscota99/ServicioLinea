<template>
  <div>
    <Navbar />
    <v-content>
      <Login />
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";

export default {
  name: "iniciarSesion",
  components: {
    Navbar,
    Login
  },
  data: () => ({
    drawer: null
  })
};
</script>
