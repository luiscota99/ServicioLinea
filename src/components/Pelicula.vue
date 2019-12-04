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
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          @click="getEntradas(pelicula, horario)"
          v-for="(horario, index) in pelicula.horarios"
          :key="index"
          >{{ horario }}</v-chip
        >
      </v-chip-group>
    </v-card-text>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Boletos
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Escoger Asientos
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Seats from "../components/Seats";
export default {
  name: "Pelicula",
  components: {
    Seats
  },
  data: () => ({ dialog: false }),
  methods: {
    getEntradas(pelicula, horario) {
      this.dialog = true;
    }
  },
  props: {
    pelicula: Object
  }
};
</script>

<style></style>
