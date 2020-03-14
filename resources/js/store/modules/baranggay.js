import axios from "axios";

const state = {

};

const getters = {
  /*   getUser: state => state.user,
    getAllUsers: state => state.allUsers, */
};

const actions = {
  /*   async addUser({ commit }, user) {
        const response = await axios.post("api/user", user);
        commit("newUser", response.data);
    },

    async fetchUser({ commit }, id) {
        const response = await axios.get("api/user/" + id);
        commit("setUser", response.data);
    },

    async fetchAllUsers({ commit }) {
        const response = await axios.get("api/user");
        commit("setAllUsers", response.data);
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
    /* setUser: (state, user) => (state.user = user),
    setAllUsers: (state, users) => (state.allUsers = users.data),
    newUser: (state, user) => state.allUsers.unshift(user),
    removeUser: (state, id) => state.allUsers.filter(user => (user.id = id)),
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
