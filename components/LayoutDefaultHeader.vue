<template>
  <div>
    <SfSidebar
      class="sf-sidebar--right"
      title="My Cart"
      :headingLevel="3"
      button
      :visible="sidebar"
      @close="handleClickOnCloseBtnCart()"
    >
      <SfCollectedProduct v-for="item in detail" :key="item.product.id"
      :image="item.product.image"
      :imageWidth="140"
      :imageHeight="200"
      :title="item.product.name"
      :regularPrice="item.product.id"
      @click:remove="removeFromCart(current, item)"
      v-model="addToCartQty"
      />
      Total items: {{ count }}
      <template #content-bottom>
        <transition name="fade">
          <div>
            <SfProperty class="sf-property--full-width my-carttotal-price">
              <template #name>
                <span class="sf-propertyname">Subtotal</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.sub_amount" />
              </template>
            </SfProperty>
            <SfProperty class="sf-property--full-width my-carttotal-price">
              <template #name>
                <span class="sf-propertyname">Shipping & Handling</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.discount" />
              </template>
            </SfProperty>
            <SfProperty class="sf-property--full-width my-carttotal-price">
              <template #name>
                <span class="sf-propertyname">Tax</span>
              </template>
              <template #value>
                <SfPrice :regular="cartdetails.tax_amount" />
              </template>
            </SfProperty>
            <SfProperty class="sf-property--full-width my-carttotal-price">
              <template #name>
                <span class="sf-propertyname">Grand Total</span>
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
        :cartItemsQty="count.toString()"
        @click:cart="handleClickOnCart()"
    >
      <template #navigation>
        <SfHeaderNavigationItem v-for="item in menu" :key="item.link">
          <template slot="desktop-navigation-item">
            <nuxt-link :to="`/${item.name}/${item.id}`">
              {{ item.name }}
            <!-- <SfLink
              :link="item.name"
              :style="{
                outline: 'none',
                display: 'inline-block',
                'white-space': 'nowrap'
              }"
            >
              {{ item.name }}
            </SfLink> -->
            </nuxt-link>
          </template>
        </SfHeaderNavigationItem>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfProperty, SfHeader, SfLink, SfCollectedProduct, SfSidebar, SfButton, SfPrice } from '@storefront-ui/vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    SfHeader,
    SfLink,
    SfProperty,
    SfButton,
    SfPrice,
    SfCollectedProduct,
    SfSidebar
  },

  data() {
    return {
      addToCartQty: 1,
    };
  },
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  computed: {
    ...mapState('carts', {
      detail: (state) => state.cart
    }),
    ...mapState('carts', ['current','sidebar','count','cartdetails']),
  },

  mounted() {
    console.log("pal")
    this.$store.dispatch('carts/updateCart');
  },

  methods: {
    removeFromCart(current, item) {
      console.log('hghv',current)
      this.$store.dispatch('carts/removeProductFromCart', {item, current});
      //this.$store.dispatch('carts/checkCart', current);
    },
    /*handleClickCart() {
      this.$router.push({ name: 'cart' });
    },
    handleClickAccount() {
      this.$router.push({ name: 'login' });
    },*/
    handleClickOnCart() {
      this.$store.dispatch('carts/openSidebar');
    },
    handleClickOnCloseBtnCart() {
      this.$store.dispatch('carts/closeSidebar');
    },
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
