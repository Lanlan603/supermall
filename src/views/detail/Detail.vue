<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar" />
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo" ref="params" />
        <detail-comment-info :comment-info="commentInfo" ref="comment" />
        <goods-list :goods="Recommends" ref="recommend" />
      </scroll>
        <toast message="哈哈哈"/>
      <detail-bottom-bar @addCart="addToCart"/>

  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from '@/components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import Toast from '@/components/common/toast/Toast'

  import Scroll from '@/components/common/scroll/Scroll'

  import { getDtail, getRecommend, Goods, Shop, GoodsParam} from '@/network/detail'
  import {itemListenerMixin} from '@/common/mixin'
  import { mapActions } from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      Recommends: [],
      themeTopYs:[],
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Toast,
    Scroll
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 800)
    },
    contentScroll(position) {
      // 1. 获取Y值
      const positionY = -position.y
      // 2. positionY和主题中的Y值进行比较
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if(this.currmentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.navBar.currentIndex = this.currentIndex
        }
        // if(this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])||(i === length - 1 && positionY > this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   this.$refs.navBar.currentIndex = this.currentIndex
        // }
      }
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid
      // 2. 将商品添加到购物车里面
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res, 2000)
      })
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    getDtail(this.iid).then(res => {
      // 1. 获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3. 获取商家信息
      this.shop = new Shop(data.shopInfo)

      // 4. 获取图片展示列表
      this.detailInfo = data.detailInfo

      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 6. 获取用户评论信息
      if(data.rate.Crate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(() => {
        // 根据最新的数据, 对应的DOM是已经被渲染出来了
        // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        // offsetTop值不对的时候, 都是因为图片的问题
        // this.themeTopYs = []

        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        // console.log(this.themeTopYs);

      })
    })
    // 3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.Recommends = res.data.list
    })
  },
  mounted() {
    // console.log('mounted');
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style  scoped>
  #detail {
    position: relative;
    z-index: 10;
    height: 100vh;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
  
</style>
