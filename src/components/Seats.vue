<template>
  <v-card>
    <div class="plane">
      <div class="cockpit">
        <h1>Pantalla</h1>
        <div align-center>
          <ol class="seats">
            <li class="seat">
              <input onclick="return false" type="checkbox" id="1" />
              <label for="1">*</label>
            </li>
            <h6>Disponible</h6>
            <li class="seat">
              <input onclick="return false" checked type="checkbox" id="2" />
              <label for="2">*</label>
            </li>
            <h6>Seleccionado</h6>
            <li class="seat">
              <input disabled type="checkbox" id="3" />
              <label for="3">*</label>
            </li>
            <h6>No Disponible</h6>
          </ol>
        </div>
      </div>
      <ol class="cabin fuselage">
        <li class="row" v-for="(filas, index) in asientos" :key="index">
          <ol class="seats">
            <li class="seat" v-for="(seat, index) in filas" :key="index">
              <input
                :disabled="
                  seat.occupied ||
                    (asientosSeleccionados.length >= cantidadBoletos &&
                      asientosSeleccionados.indexOf(seat) == -1)
                "
                v-model="asientosSeleccionados"
                :value="seat"
                type="checkbox"
                :id="seat.name"
              />
              <label :for="seat.name">{{ seat.name }}</label>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <v-card-actions>
      <v-btn @click="continuar()" class="mx-auto" rounded color="primary"
        >Agregar al Carrito</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import ObtenerAsientos from "@/services/Taquilla/Asientos";

export default {
  name: "Product",

  data: () => ({
    asientos: [],
    asientosSeleccionados: [],
    cantidadBoletos: 0,
    pelicula: "",
    sala: "",
    hora: "",
    precio: 0,
    tipo: ""
  }),

  methods: {
    async getAsientos() {
      this.pelicula = this.$route.params.pelicula;
      this.sala = this.$route.params.sala;
      this.hora = this.$route.params.horario;
      this.precio = this.$route.params.precio;
      this.tipo = this.$route.params.tipo;
      this.cantidadBoletos = localStorage.getItem("cantidadBoletos");
      let currentDate = new Date();
      let currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
      let horario = `2019/11/11 ${this.$route.params.horario}`;
      let response = await ObtenerAsientos.getAsientos({
        idSala: this.$route.params.sala,
        Horario: horario
      });
      this.asientos = response.data;
    },
    continuar() {
      let arreglo = [];
      this.asientosSeleccionados.forEach(element => {
        let item = {
          pelicula: this.pelicula,
          id: element.id,
          sala: this.sala,
          hora: this.hora,
          name: element.name,
          tipo: this.tipo,
          precio: this.precio
        };
        arreglo.push(item);
      });
      this.$store.dispatch("addBoleto", arreglo);
      this.$router.push("/productos").catch(err => {});
    }
  },
  beforeMount() {
    this.getAsientos();
  }
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  font-size: 16px;
}

.plane {
  margin: 20px auto;
  max-width: 800px;
}

.cockpit {
  height: 250px;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-bottom: 5px solid #d8d8d8;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 100%;
    border-radius: 50%;
    border-right: 5px solid #d8d8d8;
    border-left: 5px solid #d8d8d8;
  }
  h1 {
    width: 60%;
    margin: 100px auto 35px auto;
  }
}

.exit {
  position: relative;
  height: 50px;
  &:before,
  &:after {
    content: "EXIT";
    font-size: 14px;
    line-height: 18px;
    padding: 0px 2px;
    font-family: "Arial Narrow", Arial, sans-serif;
    display: block;
    position: absolute;
    background: green;
    color: white;
    top: 50%;
    transform: translate(0, -50%);
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}

.fuselage {
  border-right: 5px solid #d8d8d8;
  border-left: 5px solid #d8d8d8;
}

ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.row {
}

.seats {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.seat {
  width: 50px;
  height: 50px;
  padding: 5px;
  position: relative;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
  input[type="checkbox"]:checked {
    + label {
      background: #bada55;
      -webkit-animation-name: rubberBand;
      animation-name: rubberBand;
      animation-duration: 300ms;
      animation-fill-mode: both;
    }
  }
  input[type="checkbox"]:disabled {
    + label {
      background: #d8d8d8;
      text-indent: -9999px;
      overflow: hidden;
      &:after {
        content: "X";
        color: #717171;
        text-indent: 0;
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translate(-50%, 0%);
      }
      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
  label {
    display: block;
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5rem;
    padding: 4px 0;
    background: #dddddd;
    border-radius: 5px;
    animation-duration: 300ms;
    animation-fill-mode: both;

    &:before {
      content: "";
      position: absolute;
      width: 75%;
      height: 75%;
      top: 1px;
      left: 50%;
      transform: translate(-50%, 0%);
      background: rgba(255, 255, 255, 0.4);
      border-radius: 3px;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0px 2px #5c6aff;
    }
  }
}

@-webkit-keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.rubberBand {
  -webkit-animation-name: rubberBand;
  animation-name: rubberBand;
}
</style>
