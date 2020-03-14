<template>
  <v-container>
    <v-card flat>
      <v-card flat width="450" class="mx-auto">
        <v-card-title>Create Topic</v-card-title>
        <v-card-text>
          <v-text-field v-model="topic_form.title" label="Title" dense outlined></v-text-field>
          <v-textarea v-model="topic_form.content" label="Content" dense outlined rows="3"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveNewTopic" color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <v-data-iterator :items="getAllTopics" :items-per-page="10">
        <template v-slot:header>
          <v-toolbar flat dense>
            <v-toolbar-title>Latest Discussions</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <div
            @click="viewDiscussion(item.id)"
            v-for="item in props.items"
            :key="item.id"
            class="mb-2"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 5 : 0" flat v-ripple>
                <v-card-text>
                  <v-list-item>
                    <v-list-item-avatar size="50" color="primary">
                      <span
                        class="white--text headline font-weight-bold"
                      >{{item.author.username | initials}}</span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold">#{{item.title}}</v-list-item-title>
                      <v-list-item-title
                        class="subtitle-2 font-weight-medium primary--text"
                      >by {{item.author.username}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.content}}</v-list-item-subtitle>
                      <v-list-item-subtitle class="caption">{{item.created_at | sinceDate}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-hover>
          </div>
        </template>
        <template v-slot:footer></template>
      </v-data-iterator>

      <!-- Dialog for Viewing Topic -->
      <v-dialog v-model="dialog_view_topic" fullscreen transition="dialog-bottom-transition">
        <v-card flat>
          <v-toolbar flat color="primary darken-4" dark dense>
            <v-btn @click="close" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Discussions</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="close" text>Close</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-list-item>
              <v-list-item-avatar size="50" color="primary">
                <span
                  v-if="getTopic.author"
                  class="white--text headline font-weigth-bold"
                >{{getTopic.author.username | initials}}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline font-weight-bold">#{{getTopic.title}}</v-list-item-title>
                <v-list-item-subtitle>{{getTopic.created_at | sinceDate}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-container>
              <p class="subtitle-1 font-weight-medium">{{getTopic.content}}</p>
              <v-text-field
                v-model="comment_form.content"
                append-outer-icon="mdi-send"
                @keyup.enter="saveComment(getTopic.id)"
                @click:append-outer="saveComment(getTopic.id)"
                solo
                rounded
                placeholder="Type comment..."
              ></v-text-field>
              <v-divider></v-divider>
              <v-subheader>Comment Section</v-subheader>
              <!-- Comment Section  -->
              <div v-for="comment in getTopic.commentable" :key="comment.id" class="mb-2">
                <v-list-item>
                  <v-list-item-avatar size="40" color="primary">
                    <span
                      class="white--text headline font-weigth-bold"
                    >{{comment.author.username | initials}}</span>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="subtitle-1 font-weight-medium primary--text"
                    >@{{comment.author.username}}</v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      {{comment.created_at | sinceDate}}
                      <a
                        v-if="$gate.canDelete(comment.author.id)"
                        @click="deletingComment(comment.id)"
                        class="ml-3 red--text"
                      >Delete</a>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <!-- CONTENT -->
                <span class="ml-10">{{comment.content}}</span>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.fetchAllTopics();
  },

  computed: {
    ...mapGetters(["getAllTopics", "getTopic"])
  },

  data() {
    return {
      dialog_view_topic: false,
      topic_form: new Form({
        title: "",
        content: "",
        photo: ""
      }),

      comment_form: new Form({
        forum_topic_id: "",
        content: ""
      })
    };
  },

  methods: {
    ...mapActions([
      "fetchAllTopics",
      "addTopic",
      "fetchTopic",
      "addComment",
      "deleteComment"
    ]),

    deletingComment(id) {
      this.deleteComment(id).then(() => {});
    },

    saveComment(id) {
      this.comment_form.forum_topic_id = id;
      this.addComment(this.comment_form).then(() => {
        this.comment_form.reset();
      });
    },

    viewDiscussion(id) {
      this.fetchTopic(id).then(() => {
        this.dialog_view_topic = true;
      });
    },

    saveNewTopic() {
      this.addTopic(this.topic_form).then(() => {
        this.topic_form.reset();
      });
    },

    close() {
      this.dialog_view_topic = false;
    }
  }
};
</script>
