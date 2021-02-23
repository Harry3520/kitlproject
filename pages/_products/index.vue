<template>
  <div id="category">
    {{curr}}
    <div class="main section">
      <div class="products">
        <div class="products__pagination">
          <SfPagination
           :total="10"
           :visible="5"
           hasArrows
           :current="parseInt(curr)"
           />
        </div>
            <transition-group
              appear
              name="products__slide"
              tag="div"
              class="products__grid"
            >
            <SfProductCard
              v-for="prod in products.results"
              :key="prod.id"
              :image="prod.image"
              :title="prod.name"
              :link="`/prod/${prod.id}`"
              :maxRating="5"
              wishlistIcon="heart"
              isOnWishlistIcon="heart_fill"
              class="products__product-card"
            />
            </transition-group>
            <SfDropdown title="Choose size">
              <SfList>
                <SfListItem>
                  <SfButton
                    class="sf-button--full-width sf-button--underlined color-primary"
                  >
                    Add to cart
                  </SfButton>
                </SfListItem>
                <SfListItem>
                  <SfButton
                    class="sf-button--full-width sf-button--underlined color-primary"
                  >
                    Add to compare
                  </SfButton>
                </SfListItem>
                <SfListItem>
                  <SfButton
                    class="sf-button--full-width sf-button--underlined color-primary"
                  >
                    Add to wishlist
                  </SfButton>
                </SfListItem>
                <SfListItem>
                  <SfButton
                    class="sf-button--full-width sf-button--underlined color-primary"
                  >
                    Share
                  </SfButton>
                </SfListItem>
              </SfList>
            </SfDropdown>
      </div>
      <div class="sidebar desktop-only">
        <SfHeading :level="2" title="Filter"  class="filters__title sf-heading--left" />
        <SfHeading :level="4" title="Colors"  class="filters__title sf-heading--left" />
        <div class="filters__colors">
                <SfColor color="black" class="filters__color"/>
                <SfColor color="blue" class="filters__color"/>
                <SfColor color="red" class="filters__color"/>
        </div>
        <SfHeading :level="4" title="Type"  class="filters__title sf-heading--left" />
        <div class="filters">
          <SfFilter label="T-shirt: " :count="30" /><br>
          <SfFilter label="Hoodies: " :count="45" /><br>
          <SfFilter label="Shirts: " :count="32" /><br>
          <SfFilter label="Jacket: " :count="18" /><br>
          <SfFilter label="Sweater: " :count="29" /><br>
          <SfFilter label="Backpack: " :count="34" /><br>
          <SfFilter label="TV: " :count="13" /><br>
          <SfFilter label="Toys: " :count="67" /><br>
          <SfFilter label="Sweatshirt: " :count="19" /><br>
          <SfFilter label="Mobiles: " :count="42" /><br>
          <SfFilter label="Mug: " :count="33" /><br>
          <SfFilter label="Ring: " :count="4" /><br>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { SfProductCard, SfPagination, SfColor, SfHeading, SfFilter, SfList, SfButton, SfDropdown } from '@storefront-ui/vue';

export default {
  name: 'Products',
  components: {
    SfProductCard,
    SfPagination,
    SfColor,
    SfFilter,
    SfHeading,
    SfDropdown,
    SfList,
    SfButton,
  },

  data() {
    return {
      products: {
        id: '',
        name:'',
        category:'',
      },
      curr: 1,
    };
  },

  async asyncData({ params, $axios, curr}) {
    let ofset = (params.products-1)*10
    let cur=params.products
    console.log("curr", curr)
    const prod = await $axios.$get(`http://127.0.0.1:2000/api/products/?offset=${ofset}`)
    return { products: prod, curr: cur};

  },

};
</script>

<style scoped lang="scss">
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}

.main {
  display: flex;
}

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
}

.filters {
  &__title {
    --heading-title-font-size: var(--font-xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
    border: 1px solid var(--c-light);
  }
  @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: space-between;
  }
  &__pagination {
    display: flex;
    justify-content: center;
    margin: var(--spacer-xl) 0 0 0;
  }
  &__product-card {
    --product-card-max-width: 50%;
    flex: 1 1 50%;
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
}


</style>
