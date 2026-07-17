import React, { useEffect, useState } from 'react';
import { Table, InputNumber, Button, message } from 'antd';
import { update } from '../../../../../service/GoodsDeliveryService';
import { useDispatch } from 'react-redux';
import {
    increaseStock,
    updateProduct,
    updateProductStatus,
    updateProductStock,
} from '../../../../../redux/slides/ProductSlide';
import * as OrderService from '../../../../../service/OrderService.js';
// 🔹 Cập nhật state `quantities` khi `selectedDelivery` thay đổi
const GoodsDeliveryTableV1 = ({ selectedDelivery, setSelectedDelivery, setIsModalVisible, goodDelivery }) => {
    const [quantities, setQuantities] = useState({});

    console.log('selectedDelivery:', selectedDelivery);
    useEffect(() => {
        if (selectedDelivery?.items) {
            const initialQuantities = {};
            selectedDelivery.items.forEach((item) => {
                initialQuantities[item._id] = item.quantity;
            });
            setQuantities(initialQuantities);
        }
    }, [selectedDelivery]);

    const onUpdateQuantity = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const dataSource = selectedDelivery?.items?.map((item) => ({
        _id: item._id,
        name: item.ingredientName,
        price: item.price,
        quantity: quantities[item._id] || item.quantity, // Sử dụng giá trị từ `quantities`
    }));

    const totalPrice = dataSource.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const dataUpdate = {
        items: selectedDelivery.items.map((item) => ({
            _id: item._id,
            quantity: quantities[item._id] || item.quantity,
            priceAtPurchase: item.price,
            ingredientNameAtPurchase: item.ingredientNameAtPurchase,
            ingredientsId: item.ingredientsId,
        })),
    };
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        try {
            const a = await update(selectedDelivery._id, dataUpdate);
            a.data.items.forEach((product) => {
                dispatch(updateProductStock(product));
                dispatch(updateProductStatus(product));
            });

            setIsModalVisible(false);
            message.success('Cập nhật thành công!');
        } catch (error) {
            console.error('❌ Lỗi cập nhật:', error);
            alert('Có lỗi xảy ra khi cập nhật đơn hàng');
        }
    };

    console.log('    selectedDelivery.status', selectedDelivery.status);
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) =>
                price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) : 'N/A',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={quantities[record._id] || record.quantity}
                    onChange={(value) => onUpdateQuantity(record._id, value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            render: (_, record) => {
                const total = record.price * record.quantity;
                return (
                    <strong>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                    </strong>
                );
            },
        },
    ];

    const handleCreated = async () => {
        try {
            const orderData = {
                _id: goodDelivery._id,
                items: goodDelivery.items.map(({ ingredientsId, quantity }) => ({
                    ingredientsId,
                    quantity,
                })),
            };

            await OrderService.createOrder(orderData);
            message.success('Nhập hàng thành công!');

            goodDelivery.items.forEach((product) => {
                if (product?._id) {
                    dispatch(increaseStock({ ...product }));
                    dispatch(updateProductStatus({ ...product }));
                } else {
                    console.error('❌ Sản phẩm không hợp lệ khi dispatch:', product);
                }
            });

            setIsModalVisible(false);
        } catch (error) {
            message.error('Tạo đơn hàng thất bại!');
        }
    };

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey="_id" pagination={false} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" style={{ marginTop: '10px' }} onClick={handleUpdate}>
                    Cập nhật đơn hàng
                </Button>

                <Button
                    type="primary"
                    style={{ marginTop: '10px' }}
                    onClick={handleCreated}
                    disabled={selectedDelivery.status === 'Created'}
                >
                    Nhập hàng
                </Button>
            </div>
        </div>
    );
};

export default GoodsDeliveryTableV1;
