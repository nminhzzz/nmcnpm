import React, { useState, useEffect } from 'react';
import { Badge, Button, ConfigProvider, Flex, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import styles from '../NotificationComponent/Notificatiion.module.scss';
import { useSelector } from 'react-redux';

const API_URL = 'http://localhost:2001/notification';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                setNotifications(data.notifications); // Cập nhật state với dữ liệu từ API
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            }
        };

        fetchNotifications(); // Gọi hàm fetch
    }, []);

    const user = useSelector((state) => state.userv1);
    const content = (
        <div>
            <ul className={styles.wrapperList}>
                {notifications.map((notification, index) => (
                    <li key={index} className={styles.warpperLi}>
                        <div className={styles.wrapperItem}>
                            <img src={user.avatar} className={styles.wrapperItemImg}></img>
                            <div>
                                <p className={styles.wrapperinfo}>Sản phẩm {notification.name} sắp hết</p>{' '}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
    return (
        <ConfigProvider
            button={{
                style: {
                    width: 80,
                    margin: 4,
                },
            }}
        >
            <Flex vertical justify="center" align="center" className="demo">
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Popover
                        placement="bottomRight"
                        title="Thông báo"
                        content={content}
                        overlayStyle={{ backgroundColor: '#f0f0f0' }}
                    >
                        <Badge count={notifications.length}>
                            <BellOutlined style={{ fontSize: 24 }} />
                        </Badge>
                    </Popover>
                </Flex>
            </Flex>
        </ConfigProvider>
    );
};

export default Notification;
