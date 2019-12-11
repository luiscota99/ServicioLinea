<template>
  <v-flex xs3 pa-1>
    <v-hover>
      <v-card class="mx-auto" color="gray lighten-4">
        <v-img
          v-if="view === 'boletoComprado'"
          contain
          src="https://es.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
          :aspect-ratio="16 / 9"
        >
        </v-img>
        <v-img
          v-else
          contain
          src="https://static8.depositphotos.com/1012407/1010/v/950/depositphotos_10101087-stock-illustration-one-single-cinema-ticket-vector.jpg"
          :aspect-ratio="16 / 9"
        >
        </v-img>
        <v-card-text class="pt-4" style="position: relative;">
          <v-btn
            @click="removeBoleto"
            v-if="view === 'carrito'"
            class="red white--text"
            title="Quitar del Carrito"
            absolute
            fab
            medium
            right
            top
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="subtitle-2 mb-2">{{ boleto.pelicula }}</div>
          <v-row no-gutters>
            <v-col sm="8" class="caption">
              Sala:
              <span class="ml-2"> {{ boleto.sala }}</span>
            </v-col>
            <v-col sm="4" class="text-right">
              <div class="caption">{{ boleto.hora }}</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col sm="8" class="caption">
              Cantidad:
              <span class="ml-2"> {{ getBoletosCount() }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
export default {
  name: "Boleto",

  data: () => ({}),

  methods: {
    getBoletosCount() {
      return this.$store.getters.getBoletosCount;
    },
    removeBoleto() {
      let item = {
        name: this.boleto.name,
        sala: this.boleto.sala,
        hora: this.boleto.hora
      };
      this.$store.dispatch("removeBoleto", item);
    }
  },
  beforeMount() {},
  props: {
    boleto: Object,
    view: String
  }
};
</script>
