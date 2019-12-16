<template>
  <div>
    <Navbar />
    <v-content>
      <v-card class="mx-5 my-5">
        <v-form>
          <div class="row">
            <v-text-field
              class="mx-5"
              v-model="str"
              label="Buscar Pelicula"
            ></v-text-field>
            <v-btn class="mr-5 my-5" color="primary" @click="buscar(str)"
              >buscar</v-btn
            >
            <v-btn class="mr-5 my-5" outlined color="primary" @click="todo()"
              >mostrar todo</v-btn
            >
          </div>
          <div class="row mx-1">
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Seleccionar dia"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </div>
        </v-form>
      </v-card>
      <v-layout row wrap class="mx-5" v-if="loadedProductos == 1">
        <template>
          <Pelicula
            v-for="(pelicula, index) in busqueda"
            :key="index"
            :pelicula="pelicula"
            :date="date"
          />
        </template>
      </v-layout>
      <v-layout row wrap class="mx-5" v-else>
        <FakeItem v-bind:key="i" v-for="(n, i) in repeat" />
      </v-layout>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ObtenerPeliculas from "@/services/Taquilla/Peliculas";
import Navbar from "@/components/Navbar.vue";
import Pelicula from "@/components/Pelicula.vue";
import FakeItem from "@/components/FakeItem.vue";

export default {
  name: "peliculas",
  components: {
    Navbar,
    Pelicula,
    FakeItem
  },
  data: () => ({
    drawer: null,
    peliculas: [],
    busqueda: [],
    str: "",
    repeat: 4,
    loadedProductos: 0,
    date: new Date().toISOString().substr(0, 10),
    menu: false
  }),
  methods: {
    async getPeliculas() {
      let response = await ObtenerPeliculas.getPeliculas();
      this.peliculas = response.data;
      this.busqueda = Object.assign([], this.peliculas);
      this.loadedProductos = 1;
      console.log(this.peliculas);
    },
    buscar(str) {
      str = str.toLowerCase();
      this.busqueda = [];
      this.peliculas.forEach(pelicula => {
        if (pelicula.pelicula.toLowerCase().includes(str))
          this.busqueda.push(pelicula);
      });
    },
    todo() {
      this.busqueda = Object.assign([], this.peliculas);
    }
  },
  beforeMount() {
    this.getPeliculas();
  }
};
</script>
