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
        </v-form>
      </v-card>
      <v-layout row wrap class="mx-5">
        <template>
          <Pelicula
            v-for="(pelicula, index) in busqueda"
            :key="index"
            :pelicula="pelicula"
          />
        </template>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ObtenerPeliculas from "@/services/Taquilla/Peliculas";
import Navbar from "@/components/Navbar.vue";
import Pelicula from "@/components/Pelicula.vue";

export default {
  name: "peliculas",
  components: {
    Navbar,
    Pelicula
  },
  data: () => ({
    drawer: null,
    peliculas: [],
    busqueda: [],
    str: ""
  }),
  methods: {
    async getPeliculas() {
      let response = await ObtenerPeliculas.getPeliculas();
      this.peliculas = response.data;
      this.busqueda = Object.assign([], this.peliculas);
      console.log(this.peliculas);
    },
    buscar(str) {
      str = str.toLowerCase();
      this.busqueda = [];
      this.peliculas.forEach(pelicula => {
        if (producto.nombre.toLowerCase().includes(str))
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
