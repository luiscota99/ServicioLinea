<template>
  <div>
    <Navbar />
    <v-content>
      <v-card class="mx-5 my-5">
        <v-form>
          <div class="row">
            <v-text-field class="mx-5" v-model="str" label="Nombre del producto"></v-text-field>
            <v-btn class="mr-5 my-5" color="primary" @click="buscar(str)">buscar</v-btn>
            <v-btn class="mr-5 my-5" outlined color="primary" @click="todo()">mostrar todo</v-btn>
          </div>
          <div class="row">
            <v-btn class="mx-5 mb-5" color="success" @click="comprar()">comprar</v-btn>
            <h3 class="mt-1 mb-5">Total a pagar: ${{ getTotal() }}</h3>
          </div>
          <div class="row">
            <v-text-field
              v-model="venta.nombre_cliente"
              class="mx-5"
              :label="
                nombreErr ? 'Nombre no valido' : 'Nombre Completo del cliente'
              "
              :error="nombreErr"
            ></v-text-field>
            <v-text-field
              v-model="venta.sala"
              class="mr-5"
              :label="salaErr ? 'Sala no valida' : 'Sala'"
              :error="salaErr"
            ></v-text-field>
            <v-text-field
              v-model="venta.asiento"
              class="mr-5"
              :label="asientoErr ? 'Asiento no valido' : 'Asiento'"
              :error="asientoErr"
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="mr-5"
                  v-model="venta.hora"
                  :label="
                    horaErr ? 'Hora no valida' : 'Hora a partir para entregar'
                  "
                  :error="horaErr"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="venta.hora"
                full-width
                @click:minute="$refs.menu.save(venta.hora)"
              ></v-time-picker>
            </v-menu>
          </div>
          <v-textarea
            class="mx-3"
            v-model="venta.observaciones"
            name="observaciones"
            label="Observaciones"
          ></v-textarea>
        </v-form>
      </v-card>
      <v-layout row wrap class="mx-5">
        <template>
          <Product
            v-for="(producto, index) in busqueda"
            :producto="producto"
            :key="index"
            :view="'carrito'"
          />
          <Boleto
            v-for="boleto in getBoletos().slice(0, 1)"
            :boleto="boleto"
            :key="boleto.id"
            :view="'carrito'"
          />
        </template>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";
import Navbar from "@/components/Navbar.vue";
import Product from "@/components/Product.vue";
import Boleto from "@/components/Boleto.vue";

export default {
  name: "carrito",
  components: {
    Navbar,
    Product,
    Boleto
  },
  data: () => ({
    drawer: null,
    productos: [],
    busqueda: [],
    str: "",
    comentarios: "",
    total: 0,
    time: null,
    menu2: false,
    venta: {},
    nombreErr: false,
    salaErr: false,
    asientoErr: false,
    horaErr: false
  }),
  methods: {
    getBoletos() {
      return this.$store.getters.getBoletos;
    },
    getTotal() {
      return this.$store.getters.getTotal;
    },
    getProductos() {
      if (localStorage.getItem("venta")) {
        this.venta = JSON.parse(localStorage.getItem("venta"));
      }
      this.total = this.venta.total;
      this.productos = this.venta.productos;
      if (this.venta.boletos.length > 0) {
        this.venta.sala = this.venta.boletos[0].sala;
        this.venta.asiento = this.venta.boletos[0].name;
        this.venta.hora = this.venta.boletos[0].hora;
      }
      this.busqueda = Object.assign([], this.productos);
    },
    buscar(str) {
      str = str.toLowerCase();
      this.busqueda = [];
      this.productos.forEach(producto => {
        if (producto.nombre.toLowerCase().includes(str))
          this.busqueda.push(producto);
      });
    },
    todo() {
      this.busqueda = Object.assign([], this.productos);
    },
    comprar() {
      if (
        this.checkNom() &&
        this.checkSala() &&
        this.checkAsiento() &&
        this.checkHora()
      ) {
        let fecha = new Date();
        console.log(fecha);
        let day = "";
        let month = "";

        if (fecha.getDate() < 10) {
          day = "0" + fecha.getDate();
        } else {
          day = "" + fecha.getDate();
        }

        if (fecha.getMonth() < 9) {
          month = "0" + (fecha.getMonth() + 1);
        } else {
          month = "" + (fecha.getMonth() + 1);
        }

        fecha = fecha.getFullYear() + "-" + month + "-" + day;
        this.venta.fecha = fecha;
        console.log(this.venta);
        localStorage.setItem("venta", JSON.stringify(this.venta));
        this.$router.push("iniciarSesion");
      }
    },

    checkNom() {
      this.nombreErr = false;
      let nombre = /^[a-zA-Z ]+$/;
      if (
        this.venta.nombre_cliente.length > 30 ||
        this.venta.nombre_cliente.length < 12 ||
        !nombre.test(this.venta.nombre_cliente.trim())
      ) {
        this.nombreErr = true;
        console.log("Hola");
        return false;
      } else {
        return true;
      }
    },

    checkSala() {
      this.salaErr = false;
      let numero = /^\d*$/;
      if (
        this.venta.sala.length > 1 ||
        this.venta.sala.length < 1 ||
        !numero.test(this.venta.sala)
      ) {
        this.salaErr = true;
        return false;
      } else {
        return true;
      }
    },

    checkAsiento() {
      this.asientoErr = false;
      this.venta.asiento = this.venta.asiento.toUpperCase();
      let nombre = /^[a-zA-Z0-9 ]+$/;
      if (
        this.venta.asiento.length > 3 ||
        this.venta.asiento.length < 2 ||
        !nombre.test(this.venta.asiento.trim())
      ) {
        this.asientoErr = true;
        return false;
      } else {
        return true;
      }
    },

    checkHora() {
      this.horaErr = false;
      if (this.venta.hora === "") {
        this.horaErr = true;
        return false;
      } else {
        return true;
      }
    }
  },
  beforeMount() {
    this.getProductos();
  }
};
</script>
