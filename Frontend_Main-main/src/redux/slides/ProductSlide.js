import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const exists = state.products.some((p) => p._id === action.payload._id);
            if (!exists) {
                state.products.push({
                    ...action.payload,
                    inventory: action.payload.inventory || { stock: 0, status: 'Chưa có hàng' },
                });
            }
        },
        addProductAll: (state, action) => {
            state.products = action.payload; // Giữ nguyên dữ liệu từ payload
        },
        updateProduct: (state, action) => {
            state.products = state.products.map((p) =>
                p._id === action.payload._id ? { ...p, ...action.payload } : p,
            );
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload);
        },
        deleteAllProducts: (state) => {
            state.products = [];
        },
        increaseStock: (state, action) => {
            const product = state.products.find((p) => p._id === action.payload.ingredientsId);

            console.log('✅ Sản phẩm sau khi cập nhật:', product);
            product.totalStock = (product.totalStock || 0) + action.payload.quantity;
        },
        decreaseStock: (state, action) => {
            const product = state.products.find((p) => p._id === action.payload._id);
            if (product && product.totalStock >= action.payload.quantity) {
                product.totalStock -= action.payload.quantity;
            }
        },
        updateProductStock: (state, action) => {
            console.log('🔄 Cập nhật số lượng sản phẩm:', action.payload);

            console.log(state.products);
        },
        updateProductStatus: (state, action) => {
            console.log('🔄 Cập nhật trạng thái sản phẩm:', action.payload);

            if (!action.payload || !action.payload._id) {
                console.error('❌ Lỗi: action.payload không hợp lệ', action.payload);
                return;
            }

            const product = state.products.find((p) => p._id === action.payload.ingredientsId);

            if (!product) {
                console.warn('⚠️ Không tìm thấy sản phẩm trong state:', action.payload.ingredientsId);
                return;
            }

            product.statusList = [product.totalStock <= 0 ? 'out-of-stock' : 'in-stock'];
        },
    },
});

export const {
    addProduct,
    deleteProduct,
    deleteAllProducts,
    updateProduct,
    addProductAll,
    increaseStock,
    decreaseStock,
    updateProductStatus,
    updateProductStock,
} = productSlice.actions;

export default productSlice.reducer;
