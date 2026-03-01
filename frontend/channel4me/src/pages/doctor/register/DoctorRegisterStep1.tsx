import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layouts/publiclayout';
import '../../../styles/doctor/register/DoctorRegisterStep1.css';

const DoctorRegisterStep1: React.FC = () => {
    const navigate = useNavigate();
    const { updatePersonalData, registrationData } = useDoctorRegistration();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<any>({
        fullName: '',
        email: '',
        mobile: '',
        dob: '',
        gender: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('doctorPersonalData');
        if (saved) {
            try { setFormData(JSON.parse(saved)); } catch { /* ignore */ }
        }
    }, []);

    useEffect(() => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate());
        const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
        const dobInput = document.getElementById('dob') as HTMLInputElement | null;
        if (dobInput) {
            dobInput.max = maxDate.toISOString().split('T')[0];
            dobInput.min = minDate.toISOString().split('T')[0];
        }
    }, []);

    const formatMobileNumber = (value: string) => value.replace(/\D/g, '').slice(0, 10);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
            setErrors(prev => ({ ...prev, [name]: '' }));
            return;
        }

        if (name === 'mobile') {
            const formatted = formatMobileNumber(value);
            setFormData(prev => ({ ...prev, mobile: formatted }));
            setErrors(prev => ({ ...prev, mobile: '' }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName || formData.fullName.trim().length < 3) newErrors.fullName = 'Full name is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Valid professional email required';
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!formData.password || !passwordRegex.test(formData.password)) newErrors.password = 'Password must be 8+ chars with letters, numbers and a special char';
        if (!formData.confirmPassword || formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            const personal = { ...formData, password: btoa(formData.password), userType: 'doctor' };
            localStorage.setItem('doctorPersonalData', JSON.stringify(personal));
            updatePersonalData(personal);
            await new Promise(res => setTimeout(res, 800));
            navigate('/doctor/register/step2');
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PublicLayout>
            <main className="main-content">
                <div className="container">
                    <div className="registration-wrapper">
                        <div className="steps">
                            <div className="step active">
                                <div className="step-number">1</div>
                                <div className="step-label">Personal Info</div>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-label">Professional Info</div>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-label">Verification</div>
                            </div>
                        </div>

                        <div className="form-container">
                            <div className="form-header">
                                <h1>Doctor Registration</h1>
                                <p>Step 1: Fill in your personal information</p>
                            </div>

                            <form id="doctorRegistrationForm" onSubmit={handleSubmit} className="doctor-personal-form">
                                <div className="form-group">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={`form-control ${errors.fullName ? 'error' : ''}`} placeholder="Dr. First Last Name" required />
                                    <span className="form-helper">As per your medical license</span>
                                    {errors.fullName && <div className="error-text">{errors.fullName}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Professional Email</label>
                                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? 'error' : ''}`} placeholder="doctor@hospital.com" required />
                                    <span className="form-helper">Use your hospital/institution email</span>
                                    {errors.email && <div className="error-text">{errors.email}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                    <input id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className={`form-control ${errors.mobile ? 'error' : ''}`} placeholder="Enter your mobile number" required />
                                    <span className="form-helper">Used for verification and notifications</span>
                                    {errors.mobile && <div className="error-text">{errors.mobile}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                                    <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} className={`form-control ${errors.dob ? 'error' : ''}`} required />
                                    <span className="form-helper">Must be at least 21 years old</span>
                                    {errors.dob && <div className="error-text">{errors.dob}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={`form-control ${errors.gender ? 'error' : ''}`} required>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <div className="error-text">{errors.gender}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="password-wrapper">
                                        <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className={`form-control ${errors.password ? 'error' : ''}`} placeholder="Create a secure password" required />
                                        <button type="button" className="password-toggle" onClick={() => setShowPassword(s => !s)} aria-label="Toggle password">
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                    <span className="form-helper">Minimum 8 characters with letters, numbers, and special characters</span>
                                    {errors.password && <div className="error-text">{errors.password}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <div className="password-wrapper">
                                        <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className={`form-control ${errors.confirmPassword ? 'error' : ''}`} placeholder="Confirm your password" required />
                                        <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(s => !s)} aria-label="Toggle confirm password">
                                            <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                                </div>

                                <div className="terms">
                                    <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} />
                                    <label htmlFor="agreeTerms"> I agree to the <a href="#">Doctor Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                                </div>
                                {errors.agreeTerms && <div className="error-text">{errors.agreeTerms}</div>}

                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? <><i className="fas fa-spinner fa-spin"/> Processing...</> : <><i className="fas fa-arrow-right"/> Continue to Professional Information</>}
                                </button>
                            </form>

                            <div className="login-link">Already have a doctor account? <Link to="/doctor/login">Sign In</Link></div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default DoctorRegisterStep1;