import axios from "axios";

const state = {
    allTopics: [],
    topic: []
};

const getters = {
    getAllTopics: state => state.allTopics,
    getTopic: state => state.topic
    /*
    getAllUsers: state => state.allUsers, */
};

const actions = {
    async fetchAllTopics({ commit }) {
        const response = await axios.get("api/forum");
        commit("setAllTopics", response.data);
    },

    async fetchTopic({ commit }, id) {
        const response = await axios.get("api/forum/" + id);
        commit("setTopic", response.data);
    },

    async addTopic({ commit }, topic) {
        const response = await axios.post("api/forum", topic);
        commit("newTopic", response.data);
    },

    async addComment({ commit }, comment) {
        const response = await axios.post("api/comment", comment);
        commit("newComment", response.data);
    },

    async deleteComment({ commit }, id) {
        const response = await axios.delete("api/comment/" + id);
        commit("removeComment", id);
    }

    /*
    async fetchUser({ commit }, id) {
        const response = await axios.get("api/user/" + id);
        commit("setUser", response.data);
    },

    async deleteUser({ commit }, id) {
        const response = await axios.delete("api/user/" + id);
        commit("removeUser", id);
    },

    async updateUser({ commit }, user) {
        const response = await axios.put("api/user/" + user.id, user);
        commit("updatedUser", response.data);
    } */
};

const mutations = {
    setAllTopics: (state, topics) => (state.allTopics = topics),
    newTopic: (state, topic) => state.allTopics.unshift(topic),
    setTopic: (state, topic) => (state.topic = topic),
    newComment: (state, comment) => state.topic.commentable.unshift(comment),
    removeComment: (state, id) =>
        (state.topic.commentable = state.topic.commentable.filter(
            comment => comment.id !== id
        ))

    /*
    removeComment: (state, id) => state.allUsers.filter(user => (user.id = id)),
    updatedUser: (state, user) => {
        const index = state.allUsers.findIndex(
            item => item.id === user.id
        );
        if (index !== -1) {
            state.allUsers.splice(index, 1, user);
        }
    } */
};

export default {
    state,
    getters,
    actions,
    mutations
};
