<template>
  <v-container>
    <v-row dense class="mt-4">
      <v-col cols="12" sm="12" md="3">
        <v-card flat width="400">
          <v-toolbar flat>
            <v-text-field
              v-model="getCode.code"
              readonly
              rounded
              outlined
              dense
              label="Code"
              hint="Get Code!"
              persistent-hint
              class="d-inline-flex"
              append-outer-icon="mdi-refresh"
              @click:append-outer="generateCode"
            ></v-text-field>
          </v-toolbar>

          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Code</th>
                    <th class="text-left">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loader_code">
                    <td colspan="2">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </td>
                  </tr>
                  <tr v-for="item in getAllCodes" :key="item.id">
                    <td>{{ item.code }}</td>
                    <td v-if="item.availability === 'Expired'" class="red--text">Expired</td>
                    <td v-else>{{item.availability | sinceDate}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="9">
        <v-data-table :headers="headers_users" :items="getAllUsers" :search="search" class="mb-4">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="font-weight-bold">Users List</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search message.."
                single-line
                hide-details
              ></v-text-field>
              <v-btn @click="dialog_add_user = true" color="primary" class="ml-2" outlined dark>
                <v-icon left>mdi-plus</v-icon>Add
              </v-btn>
            </v-toolbar>
          </template>

          <!-- Custom Column Content -->
          <template v-slot:item.created_at="{ item }">{{item.created_at | shortDate}}</template>
          <template v-slot:item.actions="{ item }">
            <v-btn @click="deletingUser(item.id)" icon small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>|
            <v-btn @click="editingUser(item)" icon small>
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- New/Edit User Dialog -->
    <v-dialog v-model="dialog_add_user" width="450">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-btn @click="close" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{edit_mode ? 'Edit User' : 'New User'}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="close" text dark>Close</v-btn>
        </v-toolbar>

        <v-form @submit.prevent="edit_mode? updatingUser() : saveNewUser()" lazy-validation>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-text-field v-model="user_form.name" label="Name" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  v-model="user_form.permissions"
                  :items="['Admin', 'User']"
                  label="Role"
                  aria-required
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user_form.username"
                  label="Username"
                  name="username"
                  counter
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="user_form.email" label="E-mail" name="email" outlined dense></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="user_form.password"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              counter
              outlined
              dense
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close" text>Cancel</v-btn>
            <v-btn type="submit" text>Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.fetchAllUsers();
    this.fetchAllCodes();
  },

  watch: {
    dialog_add_user(val) {
      !val && this.close();
    }
  },

  data() {
    return {
      search: null,
      dialog_add_user: false,
      edit_mode: false,
      showPassword: false,
      loader_code: false,

      headers_users: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Permission", value: "permissions" },
        { text: "Code", value: "code" },
        { text: "Registred", value: "created_at" },
        { text: "Actions", value: "actions" }
      ],

      user_form: new Form({
        id: "",
        name: "",
        username: "",
        email: "",
        password: "",
        permissions: "",
        code: ""
      })
    };
  },

  computed: {
    ...mapGetters(["getAllUsers", "getAllCodes", "getCode"])
  },

  methods: {
    ...mapActions(["fetchAllUsers", "addCode", "fetchAllCodes"]),

    generateCode() {
      this.loader_code = true;
      this.addCode().then(() => {
        this.loader_code = false;
      });
    },

    // Update User
    editingUser(user) {
      this.edit_mode = true;
      this.user_form.fill(user);
      this.dialog_add_user = true;
    },

    updatingUser() {
      this.updateUser(this.user_form).then(() => {
        this.close();
        Toast.fire({
          type: "success",
          title: "New user added!"
        });
      });
    },

    //Delete User
    deletingUser(id) {
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            this.deleteUser(id).then(() => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "User has been deleted.",
                "success"
              );
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "User is safe :)",
              "error"
            );
          }
        });
    },

    // Add User
    saveNewUser() {
      this.addUser(this.user_form).then(() => {
        this.close();
        Toast.fire({
          type: "success",
          title: "New user added!"
        });
      });
    },

    close() {
      this.dialog_add_user = false;
      this.user_form.reset();
      this.edit_mode = false;
    }
  }
};
</script>
