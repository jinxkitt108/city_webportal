<template>
  <v-container>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card flat>
              <v-card-title>Government Set-Up</v-card-title>
              <v-avatar @click="browseImage" size="150" tile color="grey lighten-3">
                <v-img
                  v-if="officer_form.photo"
                  :src="officer_form.photo.length > 200 ? officer_form.photo : 'storage/city_officials/' + officer_form.photo"
                ></v-img>
                <v-icon v-else size="40">mdi-plus</v-icon>
              </v-avatar>
              <v-file-input
                id="photo"
                ref="avatar_input"
                @change="fileChange"
                accept="image/*"
                style="display: none"
              ></v-file-input>

              <v-card-text>
                <v-text-field v-model="officer_form.name" label="Name" dense></v-text-field>
                <v-select :items="positions" model="officer_form.position" label="Position" dense></v-select>
                <v-textarea
                  v-model="officer_form.description"
                  label="Description"
                  rows="3"
                  outlined
                  dense
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="saveOfficer" color="primary">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card flat>
              <v-card-title>List Of Officials</v-card-title>
              <v-card-text>
                <v-data-table :items="getAllOfficers" :headers="headers_officers">
                  <template v-slot:item.photo="{item}">
                    <v-avatar size="80" tile>
                      <v-img :src="'storage/city_officials/' + item.photo"></v-img>
                    </v-avatar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn icon @click="editingOfficer(item)">
                      <v-icon>mdi-pen</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon @click="deletingOfficer(item.id)">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Dialog Editing Officer -->
    <v-dialog width="450" v-model="dialog_officer">
      <v-card>
        <v-card-title>Edit Info</v-card-title>
        <v-card-text>
          <v-avatar size="150" tile color="grey lighten-3">
            <v-img
              v-if="officer_form.photo"
              :src="officer_form.photo.length > 200 ? officer_form.photo : 'storage/city_officials/' + officer_form.photo"
            ></v-img>
          </v-avatar>
          <div class="mb-5">
            <v-chip @click="browseImage" small>
              <v-icon left>mdi-camera</v-icon>Photo
            </v-chip>
          </div>
          <v-file-input
            id="photo2"
            ref="avatar_input"
            @change="fileChange"
            accept="image/*"
            style="display: none"
          ></v-file-input>
          <v-text-field v-model="officer_form.name" label="Name" dense></v-text-field>
          <v-select :items="positions" model="officer_form.position" label="Position" dense></v-select>
          <v-textarea
            v-model="officer_form.description"
            label="Description"
            rows="3"
            outlined
            dense
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="updatingOfficer" text>Save</v-btn>
          <v-btn @click="close" text>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog_officer: false,

      //Political Positions
      positions: [
          'Municipal Mayor', 'Municipal Vice-Mayor', 'Sangguniang Bayan Member'
      ],

      headers_officers: [
        { text: "Photo", align: "center", sortable: false, value: "photo" },
        { text: "Name", align: "center", value: "name" },
        { text: "Position", align: "center", value: "position" },
        { text: "Actions", sortable: false, value: "actions" }
      ],

      officer_form: new Form({
        id: "",
        name: "",
        position: "",
        description: "",
        photo: ""
      })
    };
  },

  methods: {
    ...mapActions(["addOfficer", "fetchAllOfficers", "deleteOfficer", "updateOfficer"]),

    close() {
      this.dialog_officer = false;
      this.officer_form.reset();
    },

    updatingOfficer() {
      this.updateOfficer(this.officer_form).then(() => {
        this.close();
      });
    },

    editingOfficer(officer) {
      let init = this.officer_form.fill(officer);
      this.dialog_officer = true;
    },

    deletingOfficer(id) {
      this.deleteOfficer(id);
    },

    saveOfficer() {
      this.addOfficer(this.officer_form).then(() => {
        this.officer_form.reset();
      });
    },

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
        this.officer_form.photo = reader.result;
      };
    },

    browseImage() {
      if (this.dialog_officer) {
        document.getElementById("photo2").click();
      } else {
        document.getElementById("photo").click();
      }
    }
  }
};
</script>
