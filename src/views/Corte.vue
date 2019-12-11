<template>
  <div>
    <Navbar />
    <v-content>
      <Cut />
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Cut from "@/components/Cut.vue";

export default {
  name: "iniciarSesion",
  components: {
    Navbar,
    Cut
  },
  data: () => ({
    drawer: null
  })
};
</script>
