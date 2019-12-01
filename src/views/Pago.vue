<template>
  <div>
    <Navbar />
    <v-content>
      <CardData />
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import CardData from "@/components/CardData.vue";

export default {
  name: "pago",
  components: {
    Navbar,
    CardData
  },
  data: () => ({
    drawer: null
  })
};
</script>
