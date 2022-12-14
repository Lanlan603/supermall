import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-type'

export default {
    addCart(context, payload) {
        return new Promise((reslove, reject) => {
            // state.cartList.push(payload)
            // 1. 查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2. 判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                reslove('当前商品数量追加到购物车')
            } else {
                payload.count = 1
                    // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                reslove('当前商品已添加到购物车')
            }
        })
    }
}