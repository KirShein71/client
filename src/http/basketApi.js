import { guestInstance } from './index.js'

export const fetchBasket = async () => {
    const { data } = await guestInstance.get('basket/getone')
    
    return data
}

export const append = async (productId) => {
    const { data } = await guestInstance.put(`basket/product/${productId}/append/1`)
    return data
    
}

export const increment = async (productId) => {
    const { data } = await guestInstance.put(`basket/product/${productId}/increment/1`)
    return data
}

export const decrement = async (id) => {
    const { data } = await guestInstance.put(`basket/product/${id}/decrement/1`)
    return data
}

export const remove = async (id) => {
    const { data } = await guestInstance.put(`basket/product/${id}/remove`)
    return data
}

export const clear = async () => {
    const { data } = await guestInstance.put(`basket/clear`)
    return data
}