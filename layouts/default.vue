<template>
  <div>
    <LayoutDefaultHeader :menu="Item"/>
    <nuxt />
  </div>
</template>

<script>
import LayoutDefaultHeader from '@/components/LayoutDefaultHeader';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    LayoutDefaultHeader
  },

  computed: {
    ...mapState('master', {
      Item: (state) => state.menu
    }),
  },

  mounted() {
    this.$store.dispatch('master/getData');
  },

};
</script>
<style src="~/assets/sass/layouts/default.scss" lang="scss"></style>
