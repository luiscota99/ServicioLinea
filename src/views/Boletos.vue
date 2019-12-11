<template>
  <div>
    <Navbar />
    <v-content>
      <v-layout row wrap class="my-5 mx-5">
        <template>
          <Boleto
            v-for="(boleto, index) in getBoletos()"
            :boleto="boleto"
            :key="index"
            :view="'boletoComprado'"
          />
        </template> </v-layout
    ></v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Boleto from "@/components/Boleto.vue";

export default {
  name: "boletos",
  components: {
    Navbar,
    Boleto
  },
  data: () => ({}),
  methods: {
    getBoletos() {
      var response = localStorage.getItem("ventaPagada");
      if (response && reponse.boletos) {
        return response.boletos;
      }
    }
  },
  beforeMount() {}
};
</script>
