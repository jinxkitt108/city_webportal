import axios from "axios";

const state = {
    user: [],
    allUsers: [],
    allCodes: [],
    code: []
};

const getters = {
    getUser: state => state.user,
    getAllUsers: state => state.allUsers,
    getAllCodes: state => state.allCodes,
    getCode: state => state.code
};

const actions = {
    async addUser({ commit }, user) {
        const response = await axios.post("api/user", user);
        commit("newUser", response.data);
    },

    register({ commit }, user) {
        axios.post("api/register", user);
    },

    async addCode({ commit }) {
        const response = await axios.get("api/code");
        commit("newCode", response.data);
    },

    async fetchAllCodes({ commit }) {
        const response = await axios.get("api/all_code");
        commit("setAllCodes", response.data);
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
    }
};

const mutations = {
    newCode: (state, code) => {
        state.allCodes.unshift(code);
        state.code = code;
    },
    setAllCodes: (state, codes) => (state.allCodes = codes),
    setUser: (state, user) => (state.user = user),
    setAllUsers: (state, users) => (state.allUsers = users),
    newUser: (state, user) => state.allUsers.unshift(user),
    removeUser: (state, id) => state.allUsers.filter(user => (user.id = id)),
    updatedUser: (state, user) => {
        const index = state.allUsers.findIndex(item => item.id === user.id);
        if (index !== -1) {
            state.allUsers.splice(index, 1, user);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
