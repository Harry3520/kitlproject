<template>
  <div>
    <Loader :loading="isLoading" />
    <SfSidebar
      class="sf-sidebar--right"
      title="My Cart"
      :headingLevel="3"
      button
      :visible="sidebar"
      @close="handleClickOnCloseBtnCart()"
    >
      <SfCollectedProduct v-for="item in detail" :key="item.id"
      :imageWidth="140"
      :imageHeight="200"
      :title="item.product.name"
      :regularPrice="item.product.id"
      @click:remove="removeFromCart(current, item)"
      @input="increaseQuantity(item, $event)"
      :qty="item.quantity"
      />
      Total items: {{ totalitems }}
      <template #content-bottom>
        <transition name="fade">
          <div>
            <SfProperty class="sf-property--full-width my-cart__total-price">{{cartdetails}}
              <template #name>
                <span class="sf-property__name">Subtotal</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.sub_amount" />
              </template>
            </SfProperty>
            <SfProperty class="sf-property--full-width my-cart__total-price">{{cartdetails}}
              <template #name>
                <span class="sf-property__name">Shipping & Handling</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.discount" />
              </template>
            </SfProperty>
            <SfProperty class="sf-property--full-width my-cart__total-price">{{cartdetails}}
              <template #name>
                <span class="sf-property__name">Tax</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.tax_amount" />
              </template>
            </SfProperty>
            <SfProperty class="sf-property--full-width my-cart__total-price">{{cartdetails}}
              <template #name>
                <span class="sf-property__name">Grand Total</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.total" />
              </template>
            </SfProperty>
            <SfButton class="sf-button--full-width color-secondary">
              Checkout
            </SfButton>
          </div>
        </transition>
    </template>
    </SfSidebar>
      <SfHeader
        title="BCVueNuxt"
        :cartItemsQty="totalitems.toString()"
        @click:cart="handleClickOnCart()"
      >
      <div class="sf-badge--number sf-badge">90</div>
      <template #navigation>
        <SfHeaderNavigationItem v-for="item in menu" :key="item.id">
          <template slot="desktop-navigation-item">
            <nuxt-link :to="`/${item.name}/?id=${item.id}`">
              {{ item.name }}
            </nuxt-link>
          </template>
        </SfHeaderNavigationItem>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import {SfBadge, SfHeader, SfLink, SfCollectedProduct, SfSidebar, SfProperty, SfButton, SfPrice } from '@storefront-ui/vue';
import Loader from '@/components/Loader'
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    SfHeader,
    SfLink,
    SfBadge,
    SfCollectedProduct,
    SfSidebar,
    SfProperty,
    Loader,
    SfButton,
    SfPrice,
  },
  data() {
    return {
      details: [],
      addToCartQty: 1,
    };
  },
  mounted() {
    this.$store.dispatch('carts/updateCart');
  },
  computed: {
    ...mapState('carts', {
      detail: (state) => state.cart
    }),
    ...mapState('master', ['sidebar','menu']),
    ...mapState('carts', ['totalitems', 'cartdetails','current', 'isLoading']),
  },
  methods: {
    removeFromCart(current, item) {
      console.log('hghv',current)
      this.$store.dispatch('carts/Removefromcart', {item, current});
      //this.$store.dispatch('carts/checkCart', current)
    },
    /*handleClickCart() {
      this.$router.push({ name: 'cart' });
    },
    handleClickAccount() {
      this.$router.push({ name: 'login' });
    },*/
    handleClickOnCart() {
      this.$store.dispatch('master/openSidebar');
    },
    handleClickOnCloseBtnCart() {
      this.$store.dispatch('master/closeSidebar');
    },
    increaseQuantity(item, quantity) {
      console.log("s",item.id)
      console.log("h",quantity)
      if(quantity >= 1) {
        this.$store.dispatch('carts/addProductToCart', { product: { id: item.product.id, qty: (quantity - item.quantity) } })
      }
    }
  }
};
</script>

<style scoped lang="scss">
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-price {
    --price-font-size: var(--font-sm);
    --price-font-weight: var(--font-semibold);
    margin: 0 0 var(--spacer-xs) 0;
  }
}
</style>
