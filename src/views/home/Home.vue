<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                       @tabClick="tabClick"
                       ref="tabControl1"
                       class="tab-control"
                       v-show="isTabFixed" />
        <scroll class="content"
         ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
          <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
          <recommend-view :recommends="recommends"/>
          <feature-view/>
          <tab-control :titles="['流行','新款','精选']" 
                       @tabClick="tabClick"
                       ref="tabControl2" />
          <goods-list :goods="showGoods" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/TabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from '@/network/home'
  import { itemListenerMixin } from '@/common/mixin'  
export default {
  data () {
    name: "Home"
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata()
    
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 2. 取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    contentScroll(position) {
      // console.log(position);
      // 判断 BackTop 是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 判断TabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
      // TabControl 吸顶效果
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style  scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }

  .content {
    /* height: calc(100vh - 93px);
    overflow: hidden;
    margin-top: 44px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
