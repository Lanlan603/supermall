<!--  -->
<template>
  <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button"
                          :is-checked=isSelectAll
                          @click.native="checkClick"/>
            <span>全选</span>
        </div>

        <div class="price">
            总价格: {{totalPrice}}
        </div>

        <div class="calculate" @click="calcClick">
            去计算({{calculate}})
        </div>
  </div>
</template>

<script>
    import CheckButton from '@/components/content/checkButton/CheckButton';
    import { mapGetters } from 'vuex';
export default {
  data () {
    return {
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
        return '¥' + this.cartList.filter(item => {
            return item.checked
        }).reduce((preValue, item) => {
            return preValue + parseInt(item.price.slice(1)) * item.count
        },0).toFixed(2)
    },
    calculate() {
        return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
        if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        // find 性能更高
        return !this.cartList.find(item => !item.checked)
    },
  },
  methods: {
    checkClick() {
        if(this.isSelectAll) {
            this.cartList.forEach(item => item.checked = false)
        } else {
            this.cartList.forEach(item => item.checked = true)
        }
    },
    calcClick() {
        this.$toast.show('请选择购买商品', 2000)
    }
  }
}
</script>

<style  scoped>
    .bottom-bar {
        display: flex;
        position: relative;
        height: 40px;
        background-color: #eee;
        line-height: 40px;
    }
    .check-content {
        display: flex;
        width: 60px;
        align-items: center;
        margin-left: 10px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 22px;
        margin-right: 5px;
    }
    .price {
        margin-left: 20px;
        flex: 1;
    }
    .calculate {
        width: 90px;
        background-color: red;
        color: #fff;
        text-align: center;
    }
</style>
