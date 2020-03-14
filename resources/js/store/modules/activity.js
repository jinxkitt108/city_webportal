import axios from "axios";

const state = {
    allEvents: []
};

const getters = {
    getAllEvents: state => state.allEvents
    /*   getUser: state => state.user,
     */
};

const actions = {
    async addActivity({ commit }, activity) {
        const response = await axios.post("api/activity", activity);
        commit("newActivity", response.data);
    },

    async fetchAllEvents({ commit }) {
        const response = await axios.get("api/event");
        commit("setAllEvents", response.data);
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
    newActivity: (state, activity) => state.allActivities.unshift(activity),
    setAllEvents: (state, events) => (state.allEvents = events)
    /* setUser: (state, user) => (state.user = user),
    setAllEvents: (state, users) => (state.allUsers = users.data),
    newActivity: (state, user) => state.allUsers.unshift(user),
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
