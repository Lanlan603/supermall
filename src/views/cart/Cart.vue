<!--  -->
<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
      <cart-list/>
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar';
  import CartList from './childComps/CartList';
  import CartBottomBar from './childComps/CartBottomBar';

  import { mapGetters } from 'vuex';
export default {
  data () {
    return {
    }
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // getters两种用法
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength',
    })
  }
}
</script>

<style  scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-high-text);
    color: #fff;
    font-weight: 500;
  }
</style>
