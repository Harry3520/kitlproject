<template>
  <div>
    <LayoutDefaultHeader :menu="menu"/>
    <nuxt />
  </div>
</template>

<script>
import LayoutDefaultHeader from '@/components/LayoutDefaultHeader';
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  components: {
    LayoutDefaultHeader,
  },
  computed: {
    ...mapState('master', ['menu','isLoading']),
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions({
      getData: 'master/getData'
    })
  }
};
</script>
<style src="~/assets/sass/layouts/default.scss" lang="scss"></style>
