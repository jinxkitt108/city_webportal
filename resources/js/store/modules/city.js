import axios from "axios";

const state = {
    allOfficers: []
};

const getters = {
    getAllOfficers: state => state.allOfficers
    /* getUser: state => state.user,
     */
};

const actions = {
    async addOfficer({ commit }, officer) {
        const response = await axios.post("api/city_officer", officer);
        commit("newOfficer", response.data);
    },

    async updateOfficer({ commit }, officer) {
        const response = await axios.put(
            "api/city_officer/" + officer.id,
            officer
        );
        commit("updatedOfficer", response.data);
    },

    async fetchAllOfficers({ commit }) {
        const response = await axios.get("api/city_officer");
        commit("setAllOfficers", response.data);
    },

    async deleteOfficer({ commit }, id) {
        const response = await axios.delete("api/city_officer/" + id);
        commit("removeOfficer", id);
    }

    /*

    async fetchUser({ commit }, id) {
        const response = await axios.get("api/user/" + id);
        commit("setUser", response.data);
    },

    async updateUser({ commit }, user) {
        const response = await axios.put("api/user/" + user.id, user);
        commit("updatedUser", response.data);
    } */
};

const mutations = {
    newOfficer: (state, officer) => state.allOfficers.unshift(officer),
    setAllOfficers: (state, officers) => {
        let bayan_members = [];
        officers.forEach(officer => {
            if (officer.position === "Municipal Mayor") {
                state.allOfficers.push({
                    mayor: officer
                });
            } else if (officer.position === "Municipal Vice-Mayor") {
                state.allOfficers.push({
                    vice_mayor: officer
                });
            } else {
                bayan_members.push(officer);
            }
        });
        state.allOfficers.push({
            bayan_members: bayan_members
        });
    },
    removeOfficer: (state, id) =>
        (state.allOfficers = state.allOfficers.filter(
            officer => officer.id !== id
        )),
    updatedOfficer: (state, officer) => {
        const index = state.allOfficers.findIndex(
            item => item.id === officer.id
        );
        if (index !== -1) {
            state.allOfficers.splice(index, 1, officer);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
