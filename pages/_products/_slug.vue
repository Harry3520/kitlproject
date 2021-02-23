<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <div class="o-product-details product" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
      <div class="m-product-gallery">
        <SfGallery
          :images='[
          {"desktop":{"url":details.image},"mobile":{"url":details.image},"zoom":{"url":details.image},"alt":"Product A"},
          {"desktop":{"url":details.image},"mobile":{"url":details.image},"zoom":{"url":details.image},"alt":"Product B"},
          {"desktop":{"url":details.image},"mobile":{"url":details.image},"zoom":{"url":details.image},"alt":"Product A"},
          {"desktop":{"url":details.image},"mobile":{"url":details.image},"zoom":{"url":details.image},"alt":"Product B"}
          ]'
          :imageWidth="422"
          :imageHeight="664"
          :current="1"
        />
      </div>
      <div class="product__info">
        <div class="m-product-short-info">
          <div class="product__header">
            <SfHeading :level="3" :title="details.name"/>
          </div>
          <div class="product__price-and-rating">
            <SfPrice
              :regular="details.price"
            />
            <div class="a-product-rating">
              <div class="product__rating">
                <SfRating :score="3" :max="5" />
              </div>
            </div>
          </div>
          <div
            class="product__description desktop-only"
            v-html="details.description"
          />
        </div>
        <div>
          <div class="product__colors">
            <p class="product__color-label">Color: </p>
            <SfColor class="product__color" color="black" aria-label="black" />
            <SfColor class="product__color" color="blue" aria-label="blue" />
            <SfColor class="product__color" color="red" aria-label="red" />
          </div>
        </div>
        <div><hr class="sf-divider" /></div>
        <div class="m-product-add-to-cart">
          <SfAddToCart @click="addToCart()"
          v-model="addToCartQty"
          />

        </div>
        <SfNotification
          :visible="check()"
          message="This Item is Already in your Cart"
          type="info"
        />
      </div>
    </div>
    <div class="product__bottom">
        <SfTabs class="m-product-additional-info product__tabs" id="m-product-additional-info"
          :openTab="1"
          tabMaxContentHeight="6.25rem"
          tabShowText="show"
          tabHideText="hide"
        >
        <SfTab title="Description">
          The Karissa V-Neck Tee features a semi-fitted shape that's flattering for
          every figure. You can hit the gym with confidence while it hugs curves and
          hides common 'problem' areas. Find stunning women's cocktail dresses and
          party dresses. The Karissa V-Neck Tee features a semi-fitted shape that's
          flattering for every figure. You can hit the gym with confidence while it
          hugs curves and hides common 'problem' areas. Find stunning women's
          cocktail dresses and party dresses. The Karissa V-Neck Tee features a
          semi-fitted shape that's flattering for every figure. You can hit the gym
          with confidence while it hugs curves and hides common 'problem' areas.
          Find stunning women's cocktail dresses and party dresses. The Karissa
          V-Neck Tee features a semi-fitted shape that's flattering for every
          figure. You can hit the gym with confidence while it hugs curves and hides
          common 'problem' areas. Find stunning women's cocktail dresses and party
          dresses. The Karissa V-Neck Tee features a semi-fitted shape that's
          flattering for every figure. You can hit the gym with confidence while it
          hugs curves and hides common 'problem' areas. Find stunning women's
          cocktail dresses and party dresses.
        </SfTab>
        <SfTab title="Read reviews">
          The Larissa V-Neck Tee features a semi-fitted shape that's flattering for
          every figure. You can hit the gym with confidence while it hugs curves and
          hides common 'problem' areas. Find stunning women's cocktail dresses and
          party dresses.
        </SfTab>
        <SfTab title="Additional Information">
          The Marissa V-Neck Tee features a semi-fitted shape that's flattering for
          every figure. You can hit the gym with confidence while it hugs curves and
          hides common 'problem' areas. Find stunning women's cocktail dresses and
          party dresses.
        </SfTab>
      </SfTabs>
    </div>
  </div>
</template>

<script>

import { SfGallery, SfNotification, SfButton, SfAddToCart, SfRating, SfCharacteristic, SfReview, SfTabs, SfSidebar, SfCollectedProduct, SfHeading, SfPrice, SfSelect, SfColor, SfProductOption } from '@storefront-ui/vue';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'detail',
  components: {
    SfGallery,
    SfButton,
    SfAddToCart,
    SfRating,
    SfCharacteristic,
    SfReview,
    SfNotification,
    SfTabs,
    SfSidebar,
    SfCollectedProduct,
    SfHeading,
    SfPrice,
    SfSelect,
    SfColor,
    SfProductOption,
  },

  data() {
    return {
      details: {
        id:'',
        name:'',
        image:'',
        price:'',
        description:'',
        category:'',
        image:''
      },
      para: false,
      sidebar: false,
      addToCartQty: 1,
    };
  },

  /*created() {
    this.details.id = this.$route.params.slug;
  },*/

  async asyncData({ params, $axios }) {
    const product = await $axios.$get(`http://127.0.0.1:2000/api/products/${params.slug}/`)
    return { details: product };
  },

  computed: {
    ...mapState('carts', {
      detail: (state) => state.cart
    }),
    ...mapState('carts', ['noti']),
    /*getcartid() {
      console.log("adbfjwdvjdwafbhaedakjvdkjdbjk", this.details.id)
     return this.$store.getters['carts/checkart'](this.details.id)
   },*/
  },

  methods: {

    addToCart() {
      this.details.qty = this.addToCartQty;
      const addData = {
        product: this.details,
      };
      this.$store.dispatch('carts/addProductToCart', addData);
      this.$store.dispatch('carts/openSidebar');
      //this.$store.dispatch('carts/closeSidebar');
      //this.sidebar = true;
    },
    check() {
      const x=this.$store.getters['carts/checkcart'](this.details.id)
      console.log(x)
      return x;
    }
  },
  /*watch: {
    isOnline: {
      handler (isOnline) {
        if (isOnline) {
          this.getQuantity();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      addToCart: 'carts/addToCart'
    }),
    addCart(product) {
      const variants = product.node.variants.edges;
      const addData = {
        quantity: 1,
        product_id: product.node.entityId
      };
      if (variants.length > 0) addData.variant_id = variants[0].node.entityId;
      this.addToCart(addData);
    }
  }*/

  /*methods: {
    async getQuantity () {
      if (this.stock.isLoading) return; // stock info is already loading
      this.stock.isLoading = true;
      try {
        const res = await this.$store.dispatch('stock/check', {
          product: this.getCurrentProduct,
          qty: this.getCurrentProduct.qty
        });
        this.manageQuantity = res.isManageStock;
        this.stock.max = res.isManageStock ? res.qty : null;
      } finally {
        this.stock.isLoading = false;
      }
    },
}*/
};

</script>

<style scoped lang="scss">
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto var(--spacer-xs);
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
      padding: 0;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      margin: 0 auto;
    }
  }
  &__price-and-rating {
    margin: var(--spacer-xs) 0 var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__description {
    color: var(--c-link);
  }
  &__select-size {
    flex: 100%;
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    display: flex;
    flex: 100%;
    order: 1;
    align-items: center;
    margin: var(--spacer-xl) 0 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0;
    }
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__color-label {
    margin: 0 var(--spacer-base) 0 0;
  }
  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
      --tabs-content-tab-padding: var(--spacer-xl) 0 0 0;
    }
  }
}

.m-product-options-configurable {
  border-bottom: 1px solid #f1f2f3;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  @include for-desktop {
    border: 0;
    padding-bottom: 0;
  }
}

.m-product-gallery {
  flex: 1;
}

.product__bottom {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0;
    max-width: 1272px;
  }
}
</style>
