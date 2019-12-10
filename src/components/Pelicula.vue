<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      height="250"
      src="https://sm.ign.com/t/ign_es/screenshot/default/1-mifvgh3dznbhjqfsbdr9ca_bjpa.1280.jpg"
    ></v-img>
    <v-row
      style="    margin-right: 0;
    margin-left: 0;"
    >
      <v-card-title class=" col-sm-7">{{ pelicula.pelicula }} </v-card-title>
      <div
        class="grey--text caption text-right col-sm-5"
        style="
    align-self: center;"
      >
        {{ pelicula.duracion }} min
      </div>
    </v-row>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text ml-0">{{ pelicula.genero }}</div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Horarios</v-card-title>

    <v-card-text>
      <v-chip-group active-class="primary accent-4 white--text" column>
        <v-chip
          :ref="'hora' + index"
          @click="getBoletos(index, horario)"
          v-for="(horario, index) in pelicula.horarios"
          :key="index"
          >{{ horario }}</v-chip
        >
      </v-chip-group>
      <div v-if="dialog" transition="slide-y-transition">
        <v-row align="center" class="mx-0 mt-5">
          <v-select
            :items="this.tipoBoletos"
            label="Tipo de Boleto"
            v-model="precio"
            item-value="precioBoleto"
            item-text="tipoBoleto"
            dense
          ></v-select>
        </v-row>
        <v-row no-gutters>
          <v-col sm="8" class="">
            Cantidad:
            <span class="ml-2">{{ cantidadBoletos }}</span>
          </v-col>

          <v-col sm="4" class="text-right">
            <span class="mouseOver" @click="restartCantidad">
              <v-icon>mdi-minus</v-icon>
            </span>
            <span class="mouseOver" @click="agregarCantidad">
              <v-icon>mdi-plus</v-icon>
            </span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="8" class="caption">
            Total:
          </v-col>

          <v-col sm="4" class="text-right caption">
            {{ cantidadBoletos * precio }}</v-col
          >
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue accent-4" @click="getAsientos()" text>
        Escoger Asientos
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Seats from "../components/Seats";
export default {
  name: "Pelicula",
  components: {
    Seats
  },
  data: () => ({
    dialog: false,
    precio: null,
    tipoBoletos: [],
    cantidadBoletos: 0,
    hora: ""
  }),
  methods: {
    getAsientos() {
      if (this.cantidadBoletos > 0) {
        this.$router.push({
          name: "asientos",
          params: { sala: this.pelicula.sala, horario: this.hora }
        });
      }
    },
    getBoletos(index, horario) {
      this.hora = horario;
      this.tipoBoletos = [
        {
          precioBoleto: this.pelicula.precioBoletos.boletoNormal,
          tipoBoleto: "Normal"
        },
        {
          precioBoleto: this.pelicula.precioBoletos.boleto3D,
          tipoBoleto: "3D"
        },
        {
          precioBoleto: this.pelicula.precioBoletos.boletoVIP,
          tipoBoleto: "VIP"
        }
      ];
      let elementId = this.$refs[`hora${index}`][0].$el.className;
      if (elementId.indexOf("active") > -1) {
        this.dialog = false;
      } else {
        this.dialog = true;
      }
    },
    async agregarCantidad() {
      this.cantidadBoletos++;
    },
    async restartCantidad() {
      if (this.cantidadBoletos > 0) {
        this.cantidadBoletos--;
      }
    }
  },
  beforeMount() {},
  props: {
    pelicula: Object
  }
};
</script>

<style></style>
