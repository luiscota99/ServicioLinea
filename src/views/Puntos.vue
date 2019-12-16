<template>
  <div>
    <Navbar />
    <v-content>
      <Points />
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Points from "../components/Points.vue";

export default {
  name: "puntos",
  components: {
    Navbar,
    Points
  },
  data: () => ({
    drawer: null
  })
};
</script>
