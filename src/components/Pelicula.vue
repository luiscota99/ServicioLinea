<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      contain
      height="250"
      :src="pelicula.photoUrl"
      min-width="370"
    ></v-img>
    <v-row
      style="    margin-right: 0;
    margin-left: 0;"
    >
      <v-card-title
        class=" col-sm-7"
        style="text-overflow: ellipsis;
        white-space: nowrap; overflow: hidden;"
        >{{ pelicula.pelicula }}
      </v-card-title>
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
      <input type="checkbox" class="viewmore" :id="this.pelicula.pelicula" />
      <p class="caption">{{ pelicula.sinopsis }}</p>
      <!-- Note: I have sadly not found a nice way to put the more button/label inline inside the paragraph, after or before the ellipsis. -->
      <label :for="this.pelicula.pelicula" class="caption" role="button"
        >Ver mas</label
      >
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
    precio: 0,
    tipoBoletos: [],
    cantidadBoletos: 0,
    hora: ""
  }),
  methods: {
    getAsientos() {
      console.log(this.date);
      let tipo;
      switch (this.precio) {
        case 50:
          tipo = "Normal";
          break;
        case 60:
          tipo = "boleto3D";
          break;
        case 70:
          tipo = "boletoVIP";
          break;
      }
      if (this.cantidadBoletos > 0 && this.precio !== 0) {
        localStorage.setItem("cantidadBoletos", this.cantidadBoletos);
        this.$router.push({
          name: "asientos",
          params: {
            sala: this.pelicula.sala,
            horario: this.hora,
            pelicula: this.pelicula.pelicula,
            precio: this.precio,
            tipo: tipo,
            dia: this.date
          }
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
    pelicula: Object,
    date: String
  }
};
</script>

<style>
input:checked + p {
  -webkit-line-clamp: unset;
}
input.viewmore {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
input:focus ~ label {
  outline: -webkit-focus-ring-color auto 5px;
}
.read-more {
  display: none;
}
p:truncated + .read-more {
  display: block;
}
</style>
