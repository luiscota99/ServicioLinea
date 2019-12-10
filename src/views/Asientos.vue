<template>
  <div>
    <Navbar />
    <v-content> </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ObtenerAsientos from "@/services/Taquilla/Asientos";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "asientos",
  components: {
    Navbar
  },
  data: () => ({
    asientos: []
  }),
  methods: {
    async getAsientos() {
      let currentDate = new Date();
      let currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
      let horario = `${currentDateWithFormat} ${this.$route.params.horario}`;
      let response = await ObtenerAsientos.getAsientos({
        idSala: this.$route.params.sala,
        Horario: horario
      });
      this.asientos = response.data;
      console.log(this.asientos);
    }
  },
  beforeMount() {
    this.getAsientos();
  }
};
</script>
