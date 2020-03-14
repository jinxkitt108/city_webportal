<template>
  <v-container>
    <v-card flat>
      <v-card-title>Create Announcement, Events, News, etc.</v-card-title>
      <v-card-text>
        <v-flex>
          <v-select
            v-model="activity_form.category"
            :items="['Events', 'News', 'Announcement']"
            label="Category"
            class="d-inline-flex mr-3"
          ></v-select>
          <v-menu
            v-if="activity_form.category === 'Events'"
            :close-on-content-click="true"
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDate"
                clearable
                label="Scheduled Date"
                readonly
                prepend-icon="mdi-calendar"
                class="d-inline-flex mr-3"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="activity_form.date" scrollable></v-date-picker>
          </v-menu>
          <v-text-field v-model="activity_form.title" label="Title" class="d-inline-flex"></v-text-field>
        </v-flex>
        <v-textarea v-model="activity_form.content" label="Content" outlined rounded></v-textarea>
        <v-chip @click="browseImage">
          <v-icon left>mdi-camera</v-icon>Photo
        </v-chip>
        <v-file-input
          @change="fileChange"
          id="photo"
          ref="photo"
          label="Cover Photo"
          style="display: none"
        ></v-file-input>
        <v-card v-if="activity_form.photo" width="600" class="pa-2" flat>
          <v-img aspect-ratio="2.1" :src="activity_form.photo" contain></v-img>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="saveActivity" color="primary">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    computedDate() {
      return this.activity_form.date
        ? moment(this.activity_form.date).format("dddd, MMMM D YYYY")
        : "";
    }
  },

  data() {
    return {
      activity_form: new Form({
        category: "",
        title: "",
        date: "",
        content: "",
        photo: ""
      })
    };
  },

  methods: {
    ...mapActions(["addActivity"]),

    fileChange(file) {
      if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "That is not an image!"
        });
        file = null;
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = file => {
        this.activity_form.photo = reader.result;
      };
    },

    browseImage() {
      document.getElementById("photo").click();
    },

    saveActivity() {
      this.addActivity(this.activity_form).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "primary",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.activity_form.reset();
      });
    }
  }
};
</script>
