<!--  -->
<template>
  <div>
<div class="wrapper">
  <ul class="content">
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
    <li>商品信息</li>
  </ul>
</div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 3,
      click: true,
      pullUpLoad: true
    })
    this.scroll.on('scroll', position => {
      // console.log(position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('请求更多数据');
      this.scroll.finishPullUp()
    })
  }
}
</script>

<style  scoped>
.wrapper {
  height: 150px;
  background-color: pink;
  overflow: hidden;
}
</style>
