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
        <li class="row" v-for="(arr, index) in seats" :key="index">
          <ol class="seats">
            <li class="seat" v-for="(seat, index) in arr" :key="index">
              <input
                :disabled="seat.ocupado"
                type="checkbox"
                :id="seat.nombre"
                @change="check($event)"
              />
              <label :for="seat.nombre">{{ seat.nombre }}</label>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <v-card-actions>
      <v-btn @click="continuar()" class="mx-auto" rounded color="primary"
        >continuar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Product",

  data: () => ({
    seats: [
      [
        { ocupado: true, nombre: "1A" },
        { ocupado: false, nombre: "2A" },
        { ocupado: false, nombre: "3A" },
        { ocupado: false, nombre: "4A" },
        { ocupado: false, nombre: "5A" },
        { ocupado: false, nombre: "6A" },
        { ocupado: false, nombre: "7A" },
        { ocupado: false, nombre: "8A" },
        { ocupado: false, nombre: "9A" },
        { ocupado: false, nombre: "10A" },
        { ocupado: false, nombre: "11A" },
        { ocupado: false, nombre: "12A" },
        { ocupado: false, nombre: "13A" },
        { ocupado: false, nombre: "14A" }
      ],
      [
        { ocupado: false, nombre: "1B" },
        { ocupado: false, nombre: "2B" },
        { ocupado: false, nombre: "3B" },
        { ocupado: false, nombre: "4B" },
        { ocupado: false, nombre: "5B" },
        { ocupado: false, nombre: "6B" },
        { ocupado: false, nombre: "7B" },
        { ocupado: false, nombre: "8B" },
        { ocupado: false, nombre: "9B" },
        { ocupado: false, nombre: "10B" },
        { ocupado: false, nombre: "11B" },
        { ocupado: false, nombre: "12B" },
        { ocupado: false, nombre: "13B" },
        { ocupado: false, nombre: "14B" }
      ],
      [
        { ocupado: false, nombre: "1C" },
        { ocupado: false, nombre: "2C" },
        { ocupado: false, nombre: "3C" },
        { ocupado: false, nombre: "4C" },
        { ocupado: false, nombre: "5C" },
        { ocupado: false, nombre: "6C" },
        { ocupado: false, nombre: "7C" },
        { ocupado: false, nombre: "8C" },
        { ocupado: false, nombre: "9C" },
        { ocupado: false, nombre: "10C" },
        { ocupado: false, nombre: "11C" },
        { ocupado: false, nombre: "12C" },
        { ocupado: false, nombre: "13C" },
        { ocupado: false, nombre: "14C" }
      ],
      [
        { ocupado: false, nombre: "1D" },
        { ocupado: false, nombre: "2D" },
        { ocupado: false, nombre: "3D" },
        { ocupado: false, nombre: "4D" },
        { ocupado: false, nombre: "5D" },
        { ocupado: false, nombre: "6D" },
        { ocupado: false, nombre: "7D" },
        { ocupado: false, nombre: "8D" },
        { ocupado: false, nombre: "9D" },
        { ocupado: false, nombre: "10D" },
        { ocupado: false, nombre: "11D" },
        { ocupado: false, nombre: "12D" },
        { ocupado: false, nombre: "13D" },
        { ocupado: false, nombre: "14D" }
      ],
      [
        { ocupado: false, nombre: "1E" },
        { ocupado: false, nombre: "2E" },
        { ocupado: false, nombre: "3E" },
        { ocupado: false, nombre: "4E" },
        { ocupado: false, nombre: "5E" },
        { ocupado: false, nombre: "6E" },
        { ocupado: false, nombre: "7E" },
        { ocupado: false, nombre: "8E" },
        { ocupado: false, nombre: "9E" },
        { ocupado: false, nombre: "10E" },
        { ocupado: false, nombre: "11E" },
        { ocupado: false, nombre: "12E" },
        { ocupado: false, nombre: "13E" },
        { ocupado: false, nombre: "14E" }
      ],
      [
        { ocupado: false, nombre: "1F" },
        { ocupado: false, nombre: "2F" },
        { ocupado: false, nombre: "3F" },
        { ocupado: false, nombre: "4F" },
        { ocupado: false, nombre: "5F" },
        { ocupado: false, nombre: "6F" },
        { ocupado: false, nombre: "7F" },
        { ocupado: false, nombre: "8F" },
        { ocupado: false, nombre: "9F" },
        { ocupado: false, nombre: "10F" },
        { ocupado: false, nombre: "11F" },
        { ocupado: false, nombre: "12F" },
        { ocupado: false, nombre: "13F" },
        { ocupado: false, nombre: "14F" }
      ],
      [
        { ocupado: false, nombre: "1G" },
        { ocupado: false, nombre: "2G" },
        { ocupado: false, nombre: "3G" },
        { ocupado: false, nombre: "4G" },
        { ocupado: false, nombre: "5G" },
        { ocupado: false, nombre: "6G" },
        { ocupado: false, nombre: "7G" },
        { ocupado: false, nombre: "8G" },
        { ocupado: false, nombre: "9G" },
        { ocupado: false, nombre: "10G" },
        { ocupado: false, nombre: "11G" },
        { ocupado: false, nombre: "12G" },
        { ocupado: false, nombre: "13G" },
        { ocupado: false, nombre: "14G" }
      ],
      [
        { ocupado: false, nombre: "1H" },
        { ocupado: false, nombre: "2H" },
        { ocupado: false, nombre: "3H" },
        { ocupado: false, nombre: "4H" },
        { ocupado: false, nombre: "5H" },
        { ocupado: false, nombre: "6H" },
        { ocupado: false, nombre: "7H" },
        { ocupado: false, nombre: "8H" },
        { ocupado: false, nombre: "9H" },
        { ocupado: false, nombre: "10H" },
        { ocupado: false, nombre: "11H" },
        { ocupado: false, nombre: "12H" },
        { ocupado: false, nombre: "13H" },
        { ocupado: false, nombre: "14H" }
      ]
    ],
    selectedSeats: []
  }),

  methods: {
    check(event) {
      const checkbox = event.currentTarget;

      if (checkbox.checked) {
        this.selectedSeats.push(checkbox.id);
      } else {
        const index = this.selectedSeats.indexOf(checkbox.id);
        this.selectedSeats.splice(index, 1);
      }
    },

    continuar() {
      console.log(this.selectedSeats);
    }
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
      background: #f42536;
      text-indent: -9999px;
      overflow: hidden;
      &:after {
        content: "X";
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
