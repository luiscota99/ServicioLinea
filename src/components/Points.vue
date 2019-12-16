<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-row>
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Cantidad de Puntos: {{this.sesion.puntos}}</v-toolbar-title>
            </v-toolbar>
            <v-list-item>
              <v-list-item-title>Puntos a Generar: {{(Number(this.sesion.porcentaje)/100) * this.venta.total}}</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-form autocomplete="off">
                <v-text-field
                  color="indigo"
                  name="points"
                  :label="pointsErr ? err : 'Cantidad de puntos a utilizar'"
                  v-model="points"
                  :error="pointsErr"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" dark @click="saltar()">Saltar</v-btn>
              <v-btn color="primary" dark @click="usarPuntos()">Utilizar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import ObtenerTicket from "@/services/BackEnd/VentaService";
export default {
  data: () => ({
    sesion: {},
    points: "",
    err: "",
    pointsErr: false,
    venta: {}
  }),

  methods: {
    async login() {
      this.$swal("Hello Vue world!!!");
    },
    cargarDatos() {
      if (JSON.parse(localStorage.getItem("sesion"))) {
        this.sesion = JSON.parse(localStorage.getItem("sesion"));
      }
      if (JSON.parse(localStorage.getItem("venta"))) {
        this.venta = JSON.parse(localStorage.getItem("venta"));
      }
      console.log(this.sesion);
    },
    saltar() {
      this.$router.push("pago");
    },

    usarPuntos() {
      if (this.validarPuntos()) {
        localStorage.setItem("puntos", this.points);
        this.$router.push("pago");
      }
    },

    validarPuntos() {
      this.pointsErr = false;
      if (
        this.points === "" ||
        !Number(this.points) ||
        Number(this.points) > this.sesion.puntos ||
        Number(this.points) <= 0
      ) {
        this.pointsErr = true;
        this.err = "Cantidad no valida";
        return false;
      }
      if (Number(this.points) >= this.venta.total) {
        this.pointsErr = true;
        this.err =
          "La cantidad de puntos no puede ser igual o exceder el total a pagar";
        return false;
      }
      return true;
    }
  },
  beforeMount() {
    this.cargarDatos();
  }
};
</script>

<style></style>
