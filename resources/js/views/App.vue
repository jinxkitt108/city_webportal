<template>
  <v-app id="inspire">
    <v-app-bar
      color="indigo darken-4"
      hide-on-scroll
      prominent
      src="storage/app_img/C-wall2.png"
      dark
      dense
      app
    >
      <v-toolbar-title>
          <v-avatar size="87">
              <v-img src="storage/app_img/C-seal.png"></v-img>
          </v-avatar>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs show-arrows centered center-active hide-slider>
          <v-tab
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="text-decoration-none"
          >
            <span class="subtitle-1 font-weight-bold">{{ link.title }}</span>
          </v-tab>
          <v-tab v-show="$gate.loggedIn()" to="/forum" class="text-decoration-none">
            <span class="subtitle-1 font-weight-bold">Forum</span>
          </v-tab>

          <!-- Admin Managment -->
          <v-menu
            v-if="$gate.isAdmin()"
            open-on-hover
            transition="slide-x-transition"
            offset-y
            bottom
            right
          >
            <template v-slot:activator="{ on }">
              <v-tab v-on="on" class="v-tab--active subtitle-1 font-weight-bold">Admin</v-tab>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in admin_links"
                :key="index"
                :to="item.path"
                class="text-decoration-none"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-tab
            v-if="$gate.loggedIn()"
            @click="logout"
            class="ml-auto subtitle-1 font-weight-bold"
          >Log Out</v-tab>
          <v-tab
            v-else
            @click="dialog_login = true"
            class="ml-auto subtitle-1 text-decoration-none font-weight-bold"
          >Sign In</v-tab>
          <v-tab
            v-if="!$gate.loggedIn()"
            @click="dialog_register = true"
            class="subtitle-1 font-weight-bold"
          >Register</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Register Dialog -->
    <v-dialog v-model="dialog_register" width="400">
      <v-card v-if="valid_registration" flat class="mx-auto">
        <div class="text-center">
          <v-card-title>
            <h1 class="title font-weight-bold">Sign Up</h1>
          </v-card-title>
        </div>
        <v-form @submit.prevent="saveNewUser" lazy-validation>
          <v-card-text>
            <v-text-field v-model="user_form.name" label="Name" outlined dense></v-text-field>
            <v-text-field v-model="user_form.email" label="E-mail" name="email" outlined dense></v-text-field>
            <div class="text-center">
              <v-text-field
                prepend-inner-icon="mdi-account"
                v-model="user_form.username"
                label="Username"
                name="username"
                rounded
                outlined
                dense
                class="d-inline-flex"
              ></v-text-field>
              <v-text-field
                v-model="user_form.password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                counter
                outlined
                rounded
                dense
                class="d-inline-flex"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" text color="primary" class="font-weight-bold">
              <v-icon left>mdi-send</v-icon>Register
            </v-btn>
            <v-btn @click="close" text color="black" class="font-weight-bold">Cancel</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-card v-else>
        <v-card-title>Type Code</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="code_validation"
            outlined
            @keyup.enter="validateCode"
            rounded
            hint="Get code from the office"
            persistent-hint
            required
          ></v-text-field>
          <v-btn @click="validateCode" block color="primary">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Log in Dialog -->
    <v-dialog v-model="dialog_login" width="300">
      <v-card flat>
        <div class="text-center">
          <v-card-title>
            <h1 class="title font-weight-bold">Sign In</h1>
          </v-card-title>
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field v-model="login_form.username" label="Username" outlined rounded dense></v-text-field>
              <v-text-field
                v-model="login_form.password"
                type="password"
                label="Password"
                outlined
                rounded
                dense
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" text>Log In</v-btn>
              <v-btn @click="close" text color="black" class="font-weight-bold">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-footer dark padless app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>CWebPortal</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  watch: {
    dialog_login(val) {
      !val && this.close();
    },

    dialog_register(val) {
      !val && this.close();
    }
  },

  data() {
    return {
      dialog_login: false,
      dialog_register: false,
      showPassword: false,
      valid_registration: false,
      code_validation: "",

      links: [
        {
          title: "Home",
          path: "/"
        },
        {
          title: "Government",
          path: "/government"
        },
        {
          title: "Events",
          path: "/events"
        },
        {
          title: "News",
          path: "/news"
        },
        {
          title: "Baranggay",
          path: "/baranggay"
        }
      ],

      admin_links: [
        {
          title: "Management",
          path: "/management"
        },
        {
          title: "Government",
          path: "/admin_government"
        },
        {
          title: "Announcement",
          path: "/admin_announcement"
        }
      ],

      login_form: new Form({
        username: "",
        password: ""
      }),

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

  methods: {
    ...mapActions(["register"]),

    validateCode() {
      axios
        .post("api/code_validation", {
          code: this.code_validation
        })
        .then(response => {
          if (response.data.valid) {
            this.valid_registration = true;
          } else {
          }
        });
    },

    saveNewUser() {
      this.user_form.code = this.code_validation;
      this.register(this.user_form).then(() => {
        this.valid_registration = false;
        this.code_validation = "";
        this.close();
        window.location.href = "/";
      });
    },

    login() {
      axios.post("/vuelogin", this.login_form).then(response => {
        if (response.data.status === "success") {
          window.location.href = "/";
        } else {
          this.login_form.password = "";
        }
      });
    },

    logout() {
      axios.post("/logout").then(() => {
        window.location.href = "/";
      });
    },

    close() {
      this.dialog_register = false;
      this.dialog_login = false;
      this.user_form.reset();
    }
  }
};
</script>
