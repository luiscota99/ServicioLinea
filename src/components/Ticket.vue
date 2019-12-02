<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-row>
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Ticket</v-toolbar-title>
            </v-toolbar>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" dark @click="login">Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    show: false,
    user: "",
    fecha: "",
    cvv: "",
    err: "",
    fechaErr: false,
    cvvErr: false,
    userErr: false
  }),

  methods: {
    async login() {
      this.$swal("Hello Vue world!!!");
    },
    registrar() {}
  }
};
</script>

<style></style>
