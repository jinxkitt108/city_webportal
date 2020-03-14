<template>
  <v-container>
    <v-card flat>
      <v-card-title>Municipality Officials</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="12" md="6">
            <v-card>
              <v-card-text></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="6"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.fetchAllOfficers();
  },

  computed: {
    ...mapGetters(["getAllOfficers"])
  },

  data() {
    return {
      mayor: "",
      search: null
    };
  },

  methods: {
    ...mapActions(["fetchAllOfficers"])
  }
};
</script>
