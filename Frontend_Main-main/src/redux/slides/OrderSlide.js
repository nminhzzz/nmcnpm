import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    totalPrice: 0,
    orderId: null,
};

export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const { orderItems, totalPrice } = action.payload;
        
            if (!Array.isArray(orderItems)) {
                console.error("Lỗi: orderItems không phải là mảng!", orderItems);
                return;
            }
        
            state.orderItems = [...state.orderItems, ...orderItems]; // Giữ lại đơn hàng cũ
            state.totalPrice += totalPrice; // Cộng dồn tổng tiền
        },
        
        removeOrder: (state, action) => {
            state.orderItems = state.orderItems.filter((item) => item.productId !== action.payload);
        },

        removeAllOrder: (state, action) => {
            state.orderItems = state.orderItems.filter((item) => !action.payload.includes(item.productId));
        },

        increaseOrder: (state, action) => {
            const itemOrder = state.orderItems.find((item) => item.productId === action.payload);
            if (itemOrder) {
                itemOrder.amount += 1;
            }
        },

        decreaseOrder: (state, action) => {
            const itemOrder = state.orderItems.find((item) => item.productId === action.payload);
            if (itemOrder) {
                itemOrder.amount -= 1;
                if (itemOrder.amount <= 0) {
                    state.orderItems = state.orderItems.filter((item) => item.productId !== action.payload);
                }
            }
        },

        removeAllOrderLogOut: () => initialState,
    },
});

export const { addOrder, increaseOrder, decreaseOrder, removeOrder, removeAllOrder, removeAllOrderLogOut } =
    OrderSlice.actions;

export default OrderSlice.reducer;
