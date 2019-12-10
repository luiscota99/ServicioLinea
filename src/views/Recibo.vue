<template>
  <div>
    <Navbar />
    <v-content>
      <Ticket />
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Ticket from "@/components/Ticket.vue";

export default {
  name: "recibo",
  components: {
    Navbar,
    Ticket
  },
  data: () => ({
    drawer: null
  })
};
</script>
