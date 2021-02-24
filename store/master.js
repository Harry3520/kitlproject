
export const state=()=>({
      menu: [],
      sidebar: false
});


export const mutations= {
      SET_MENU(state, payload){
        state.menu = payload;
      },
      OPEN_SIDEBAR(state){
        state.sidebar = true;
      },
      CLOSE_SIDEBAR(state){
        state.sidebar = false;
      },
    };

export const actions= {
      getData({commit}){

        this.$axios.get("http://192.168.12.13:8000/api/categorys/")
          .then(response => {commit('SET_MENU', response.data)}).catch( error=> console.log(error))
      },
      openSidebar({commit}) {
        commit('OPEN_SIDEBAR')
      },
      closeSidebar({commit}) {
        commit('CLOSE_SIDEBAR')
      },
    };
