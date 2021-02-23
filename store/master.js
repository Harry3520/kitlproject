import axios from "axios";

export const state=()=>({
      menu: []
    });

export const mutations= {
      SET_MENU(state, payload){
        state.menu = payload;
      }
    };

export const actions= {
      getData({ commit }){
        this.$axios.get('http://127.0.0.1:2000/api/categorys/').then(response => {
            console.log("asdfbk",response);
            commit('SET_MENU', response.data)})
        }
    };
