//import { getCartCheckoutRedirectUrl } from '~/utils/auth';
//import axios from 'axios';

export const state = () => ({
  cart: [],
  magic: false,
  count: 0,
  noti: false,
  cartdetails: {},
  current: 0,
  sidebar: false,
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

  addProductToCart({commit}, { product }) {
    this.$axios.post(`http://127.0.0.1:2000/api/carts/add/`, {product_id : product.id, qty: product.qty}).then(resp => {
      commit('UPDATE_CART', resp.data.cart_items );
      commit('CHECK_FROM_CART', product.id);
    });
  },

  updateCart({commit}) {
    this.$axios.get('http://127.0.0.1:2000/api/carts/').then(resp => {
      commit('UPDATE_CART', resp.data.cart_items )
      console.log("2")
      commit('SET_CARTDETAILS', resp.data )
    });
  },

  removeProductFromCart({commit, dispatch}, {item, current}) {
    //console.log("asasddas",id)
    this.$axios.delete(`http://127.0.0.1:2000/api/cartitems/${item.id}/`).then(resp => {
    commit('REMOVE_FROM_CART', item);
    dispatch('carts/updateCart', null, {root:true});

      /*commit('REMOVE_FROM_CART', item);
      this.$axios.get('http://192.168.0.103:8000/carts/').then(resp => {
        commit('UPDATE_CART', resp.data.cart_items )
        commit('SET_CARTDETAILS', resp.data )
        dispatch('carts/checkCart', current, {root:true})
      });*/
      //console.log("last",current);
    });

/*    dispatch('carts/checkCart', current, {root:true});*/
    //commit('CHECK_FROM_CART', current);
  },

  openSidebar({commit}) {
    commit('OPEN_SIDEBAR');
  },

  closeSidebar({commit}) {
    commit('CLOSE_SIDEBAR');
  },
};

export const mutations = {
  SET_CARTDETAILS(state, data) {
    state.cartdetails.sub_amount = data.sub_amount
    state.cartdetails.discount = data.discount_amount
    state.cartdetails.tax_amount = data.tax_amount
    state.cartdetails.total = data.total
  },

  UPDATE_CART(state, resp ) {
    state.cart=resp;
    //console.log("2.1");
    let sumofQuantity = 0
    for(let prod in resp){
      sumofQuantity += resp[prod].quantity
    }
    state.count = sumofQuantity
    console.log("na hoy");
    //console.log("wtf",state.cart);
    //console.log("4th",state.cart);
  },

  REMOVE_FROM_CART(state, item) {
    state.cart = state.cart.filter(items => {
      return items.id !== item.id;
    })
    state.totalitems -= item.quantity
    state.magic=true;
    console.log(state.magic);
    //state.count=state.cart.length;
    //console.log("1");
  },

  CHECK_FROM_CART(state,id){
    state.current=id
    //console.log("3.1");
    //console.log("current",state.current);
    //console.log("adafafaf",state.cart);
    state.noti=state.cart.find(item => {
      return item.product.id === id;
    })
    //console.log("5th",state.cart);
  },

  OPEN_SIDEBAR(state) {
    state.sidebar = true;
  },

  CLOSE_SIDEBAR(state) {
    state.sidebar = false;
  }
};
/*const productFilter = (cart) => {
  return cart
    ? cart.data.line_items.physical_items.map((item) => ({
        itemId: item.id,
        id: item.product_id,
        variant_id: item.variant_id,
        title: item.name,
        image: item.image_url,
        price: { regular: item.sale_price },
        configuration: [
           { name: 'Size', value: 'XS' },
    { name: 'Color', value: 'White' }
          // Example configuration
        ],
        qty: item.quantity
      }))
    : [];
};



export const getters = {
  products(state) {
    return state.products;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export const mutations = {
  SET_CART(state, products) {
    state.products = products;
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  addToCart({ dispatch }, data) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId) dispatch('addCartItem', data);
    else dispatch('createCart', data);
  },
  createCart({ commit }, createData) {
    commit('SET_LOADING', true);
    this.$axios
      .$post(`/api/stores/${process.env.storeHash}/v3/carts`, {
        line_items: [
          { quantity: createData.quantity, product_id: createData.product_id }
        ]
      })
      .then((response) => {
        const cartId = response.data.id;
        window.localStorage.setItem('cartId', cartId);
        commit('SET_CART', productFilter(response));
        this.$toast.info('Successfully created cart!');
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },
  addCartItem({ commit }, addData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = {
      line_items: [
        { quantity: addData.quantity, product_id: addData.product_id }
      ]
    };
    commit('SET_LOADING', true);
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items`,
        data
      )
      .then((response) => {
        commit('SET_LOADING', false);
        commit('SET_CART', productFilter(response));
        this.$toast.info('Successfully added a item to cart!');
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },
  updateCartItem({ commit }, updateData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = {
      line_item: {
        quantity: updateData.quantity,
        product_id: updateData.product_id,
        variant_id: updateData.variant_id
      }
    };
    commit('SET_LOADING', true);
    this.$axios
      .$put(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${updateData.item_id}`,
        data
      )
      .then((response) => {
        commit('SET_CART', productFilter(response));
        this.$toast.info('Successfully updated cart item!');
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },
  deleteCartItem({ dispatch, commit }, itemId) {
    const cartId = window.localStorage.getItem('cartId');
    commit('SET_LOADING', true);
    this.$axios
      .$delete(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${itemId}`
      )
      .then((response) => {
        const cart = productFilter(response);
        this.$toast.info('Successfully deleted a item from cart');
        commit('SET_LOADING', false);
        commit('SET_CART', cart);
        if (cart.length === 0) window.localStorage.removeItem('cartId');
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
    dispatch('getCart');
  },
  getCart({ commit }) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId)
      this.$axios
        .$get(`/api/stores/${process.env.storeHash}/v3/carts/${cartId}`)
        .then((cart) => {
          commit('SET_CART', productFilter(cart));
        })
        .catch(() => {
          window.localStorage.removeItem('cartId');
          commit('SET_CART', productFilter(null));
        });
  },
  cartCheckout() {
    const cartId = window.localStorage.getItem('cartId');
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/redirect_urls`
      )
      .then((response) => {
        const redirectUrl = getCartCheckoutRedirectUrl(response);
        window.location.href = redirectUrl;
      });
  }
};*/
