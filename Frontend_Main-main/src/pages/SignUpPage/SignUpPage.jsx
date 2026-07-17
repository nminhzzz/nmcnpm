import { Alert, Col, Row, message } from 'antd';
import styles from '../../pages/SignUpPage/SignUpPage.module.scss';
import slider1 from '../../assets/slider/slider1.png';
import slider2 from '../../assets/slider/slider2.png';
import slider3 from '../../assets/slider/slider3.png';
import slider4 from '../../assets/slider/slider4.png';
import slider5 from '../../assets/slider/slider5.png';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import { useState } from 'react';
import { validateForm } from '../../Validate/validate';
import * as UserService from '../../service/Userservice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateField = () => {
        const validationErrors = validateForm(email, password, confirmPassword);
        setErrors(validationErrors);
    };

    const handleSubmit = async () => {
        validateField();
        if (Object.keys(errors).length > 0) return;

        try {
            await UserService.signUpUser({ email, password, confirmPassword });
            message.success('Đăng ký thành công');
            navigate('/sign-in');
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperList}>
                <Row>
                    <Col xs={24} sm={24} md={11}>
                        <div className={styles.wrapperItem1}>
                            <h1 className={styles.registerName}>Đăng ký</h1>
                            <span className={styles.notiRegis}>Điền thông tin tài khoản để tạo tài khoản Pancake</span>

                            {/* Email */}
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Email</div>
                                <input
                                    type="text"
                                    className={styles.wrapperInfoInput}
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={validateField}
                                />
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>

                            {/* Mật khẩu */}
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Mật khẩu</div>
                                <div className={styles.wrapperInputContainer}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={styles.wrapperInfoInput}
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={validateField}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePasswordBtn}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className={styles.error}>{errors.password}</p>}
                            </div>

                            {/* Xác nhận mật khẩu */}
                            <div className={styles.wrapperInfo}>
                                <div className={styles.wrapperInfoName}>Xác nhận mật khẩu</div>
                                <div className={styles.wrapperInputContainer}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className={styles.wrapperInfoInput}
                                        placeholder="Xác nhận mật khẩu"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={validateField}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePasswordBtn}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                            </div>

                            <div className={styles.wrapperInfo}>
                                <button className={styles.wrapperButton} onClick={handleSubmit}>
                                    Đăng ký
                                </button>
                            </div>
                            <div className={styles.wrapperInfo}>
                                <h3 style={{ marginTop: '24px', fontSize: '24px' }}>
                                    Bạn đã có tài khoản?
                                    <a style={{ color: '#2D65C3' }} href="/sign-in">
                                        Đăng nhập ngay
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={13}>
                        <div className={styles.wrapperItem}>
                            <SliderComponent arrImg={[slider1, slider2, slider3, slider4, slider5]} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SignUpPage;
