import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const state = { user: null };

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  async doLogin({ commit }, { email, password }) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    commit("SET_USER", user);
  },

  async doRegister({ commit }, { name, email, password }) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await updateProfile(user, { displayName: name });
    console.log("Leo -> el usuario:", user);
    commit("SET_USER", user);
  },

  async doLogout({ commit }) {
    const auth = getAuth();
    await signOut(auth);
    commit("SET_USER", null);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
