<template>
  <div>
    <Navbar />
    <v-content> <Asientos /> </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Asientos from "@/components/Seats.vue";

export default {
  name: "asientos",
  components: {
    Navbar,
    Asientos
  },
  data: () => ({}),
  methods: {}
};
</script>
