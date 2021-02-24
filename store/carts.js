export const state = () => ({
  cart: [],
  totalitems: 0,
  noti: false,
  cartdetails: {},
  current: 0,
  totalpages: 0,
  isLoading: false
});

export const getters = {
    checkcart: (state) => (id) => {
      const p = state.cart.find(item => item.product.id === id)
      if(p) {
        return true
      }
      else {
        return false
      }
    }
}


export const actions = {
  addProductToCart({ commit, dispatch }, {product}) {
    // commit('master/OPEN_SIDEBAR')
    //commit('CART', {product})

    this.$axios.post(`http://192.168.12.13:8000/api/carts/add/`, {product_id : product.id, qty: product.qty}).then(function(response){
      commit('DISPLAY_CART', response.data)

    }).catch( error=> console.log(error))

    //dispatch('carts/updateCart', null, { root: true })
    //dispatch('master/openSidebar', null, { root: true })
  },

  set_loader({commit},data){
    commit("SET_DATA", data);
  },


  updateCart({commit}) {

    this.$axios.get(`http://192.168.12.13:8000/api/carts/`)
        .then(res => {
        commit('DISPLAY_CART', res.data);
       })
  },
  Removefromcart({commit, dispatch}, {item, current}) {

    this.$axios.delete(`http://192.168.12.13:8000/api/cartitems/${item.id}/`).then(resp => {
      order();
      async function order() {
        await commit('REMOVE_FROM_CART', item)
        await dispatch('carts/updateCart', null, {root:true})
      }

      //commit('SET_CARTDETAILS', resp.data )
      /*this.$axios.get(`http://192.168.12.13:8000/api/carts/`).then(resp => {
        commit('DISPLAY_CART', resp.data.cart_items )
        commit('SET_CARTDETAILS', resp.data )
        dispatch('carts/checkCart', id, {root:true})
      });*/
      //console.log("last",current);
    });
  },
  /*getData({commit}, offset, currentPage) {
      this.$axios.get(`http://192.168.12.13:8000/api/products/`).then(res => {
        commit('GET_DATA', res.data)
      });
  }*/
};

export const mutations = {
  REMOVE_FROM_CART(state, item) {
    state.cart = state.cart.filter(items => {
      return items.id !== item.id;
    })
    state.totalitems -= item.quantity
    console.log('1');
  },

  DISPLAY_CART(state, cart) {
    //console.log(cart.sub_amount);
    state.cart = cart.cart_items
    let sumofQuantity = 0
    for(let prod in cart.cart_items){
      sumofQuantity += cart.cart_items[prod].quantity
    }
    state.totalitems = sumofQuantity

    state.cartdetails.sub_amount = cart.sub_amount
    state.cartdetails.discount = cart.discount_amount
    state.cartdetails.tax_amount = cart.tax_amount
    state.cartdetails.total = cart.total

    //state.totalpages = Math.ceil(cart.count/10)
  },

  SET_DATA(state, data) {
      state.isLoading = data
    }

};
