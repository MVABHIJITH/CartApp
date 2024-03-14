import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const exsistingProduct = state.find(item => item.id == action.payload.id)
            if (exsistingProduct) {
                const remainingProducts = state.filter(item => item.id != exsistingProduct.id)
                exsistingProduct.quantity++
                exsistingProduct.totalPrice = exsistingProduct.quantity * exsistingProduct.price
                state = [...remainingProducts, exsistingProduct]
            } else {
                state.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price })
            }
        },
        removeCartItem: (state, action) => {
            return state.filter(item => item.id != action.payload)
        },
        incQuantity: (state, action) => {
            const exsistingProduct = state.find(item => item.id == action.payload)
            exsistingProduct.quantity++
            exsistingProduct.totalPrice = exsistingProduct.quantity * exsistingProduct.price
            const remainingProducts = state.filter(item => item.id != exsistingProduct.id)
            state = [...remainingProducts, exsistingProduct]
        },
        decQuantity: (state, action) => {
            const exsistingProduct = state.find(item => item.id == action.payload)
            exsistingProduct.quantity--
            exsistingProduct.totalPrice = exsistingProduct.quantity * exsistingProduct.price
            const remainingProducts = state.filter(item => item.id != exsistingProduct.id)
            state = [...remainingProducts, exsistingProduct]
        },
        emptyCart: (state, action) => {
            return state = []
        }
    }
})

export const { addToCart, removeCartItem, incQuantity, decQuantity,emptyCart } = cartSlice.actions
export default cartSlice.reducer