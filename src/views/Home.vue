<template>
  <div>
    <HelloWorld />
    <v-content>
      <Product />
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Product from "@/components/Product.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Product
  },
  data: () => ({
    drawer: null
  })
};
</script>
