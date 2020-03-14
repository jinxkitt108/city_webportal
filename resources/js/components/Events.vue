<template>
  <v-container>
    <v-card flat>
      <v-card-text>
        <v-data-iterator :items="getAllEvents" :search="search">
          <template v-slot:header>
            <v-toolbar class="mb-2" flat>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                rounded
                prepend-inner-icon="mdi-magnify"
                label="Search"
                dense
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-divider></v-divider>
            <v-row v-for="event in props.items" :key="event.id" dense>
              <v-col cols="12" sm="12" md="5">
                <v-card flat dark color="red darken-3">
                  <v-card-text>
                    <v-img :src="'storage/activity_photos/' + event.photo"></v-img>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="12" md="5">
                <v-card flat>
                  <v-card-title>
                    <h1 class="headline font-weight-bold">{{event.title}}</h1>
                  </v-card-title>
                  <v-card-text>
                    <h1 v-if="event.date" class="subtitle-1 font-weight-bold">Schedule: {{event.date | longDate}}</h1>
                    <p>{{event.content}}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.fetchAllEvents();
  },

  computed: {
    ...mapGetters(["getAllEvents"])
  },

  data() {
    return {
      search: null
    };
  },

  methods: {
    ...mapActions(["fetchAllEvents"])
  }
};
</script>
