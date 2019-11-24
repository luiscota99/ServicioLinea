<template>
  <div>
    <Navbar />
    <v-content> </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Product from "@/components/Product.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Product
  },
  data: () => ({
    drawer: null
  })
};
</script>
