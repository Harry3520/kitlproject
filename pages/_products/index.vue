<template>
  <div id="category">
    <div class="main section">
      <div class="products">
        <div class="products__pagination">
          <SfPagination class="products__pagination desktop-only" :total="pages" pageParamName="p" :current="currentPage"/>
        </div>
        <transition-group
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
        <SfProductCard
          v-for="prod in products"
          :key="prod.id"
          :title="prod.name"
          :link="`/prod/${prod.id}`"
          :maxRating="5"
          wishlistIcon="heart"
          isOnWishlistIcon="heart_fill"
          class="products__product-card"
        />
        </transition-group>
      </div>
      <div class="sidebar desktop-only">
        <div class="filters">
            <SfHeading :level="4" title="Filter" key="filterType" class="filters__title sf-heading--left" />
            <SfHeading :level="5" title="Color" class="filters__title sf-heading--left" />
              <div class="filters__colors">
                <SfColor color="black" class="filters__color"/>
                <SfColor color="blue" class="filters__color"/>
                <SfColor color="red" class="filters__color"/>
              </div>
            <SfHeading :level="5" title="Types" class="filters__title sf-heading--left" />
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
import { SfProductCard, SfPagination, SfColor, SfHeading, SfFilter } from '@storefront-ui/vue';
import { mapState } from 'vuex';;
export default {
  name: 'Products',
  components: {
    SfProductCard,
    SfPagination,
    SfColor,
    SfHeading,
    SfFilter,
  },
  mounted(params) {
    //this.$store.dispatch('carts/getData')
  },

  async asyncData({ params, query, $axios }) {
    const prod = await $axios.$get(`http://192.168.12.13:8000/api/products/?category=${query.id}`)
    const totalpages = Math.ceil(prod.count/10)
    //console.log('yes',prod.results)
    return { products: prod.results, pages: totalpages, id: query.id};
  },
  methods: {
    setCurrentPage (newPage) {
      this.currentPage = newPage
      this.getproducts()
    },
    getproducts() {
        const startIndex = (this.currentPage - 1) * 10
        const endIndex = startIndex + 10
        this.$axios.get(`http://192.168.12.13:8000/api/products/?category=${this.id}&limit=10&offset=${startIndex}`).then(res => {
          console.log(res.data.results)
          this.products = res.data.results
        })
        //console.log("sgf",respo)
        //this.$store.dispatch('carts/getData', offset, this.currentPage)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        if (to.query.p) {
          this.setCurrentPage(parseInt(to.query.p) || 1);
        }
      }
    }
  },
  data() {
    return {
      products: {},
      currentPage: 1,
      pages: 0,
      page: 'page',
      id: 0
    };
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
.main {
  display: flex;
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
  &__pagination {
    display: flex;
    justify-content: center;
    margin: var(--spacer-xl) 0 0 0;
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
