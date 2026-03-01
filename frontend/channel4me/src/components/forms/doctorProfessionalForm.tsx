import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface DoctorProfessionalFormProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
    initialData?: any;
    onBack?: () => void;
    doctorName?: string;
}

const DoctorProfessionalForm: React.FC<DoctorProfessionalFormProps> = ({
    onSubmit,
    isLoading,
    initialData,
    onBack,
    doctorName
}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        dob: '',
        gender: '' as 'male' | 'female' | 'other' | '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Load initial data
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    // Set date limits
    useEffect(() => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate());
        const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
        
        const dobInput = document.getElementById('dob') as HTMLInputElement;
        if (dobInput) {
            dobInput.max = maxDate.toISOString().split('T')[0];
            dobInput.min = minDate.toISOString().split('T')[0];
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const formatMobileNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.slice(0, 10);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Professional email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Mobile validation
        const mobileRegex = /^[0-9]{10}$/;
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }

        // Date of Birth validation
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with letters, numbers, and special characters';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit(formData);
        } else {
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                const element = document.getElementById(firstError);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element?.focus();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="doctor-personal-form">
            {/* Full Name */}
            <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                    Full Name <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-control ${errors.fullName ? 'error' : ''}`}
                    placeholder="Dr. First Last Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    aria-describedby={errors.fullName ? "fullName-error" : "fullName-help"}
                />
                <span id="fullName-help" className="form-helper">
                    As per your medical license
                </span>
                {errors.fullName && (
                    <span id="fullName-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.fullName}
                    </span>
                )}
            </div>

            {/* Email */}
            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    Professional Email <span className="required">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    aria-describedby={errors.email ? "email-error" : "email-help"}
                />
                <span id="email-help" className="form-helper">
                    Use your hospital/institution email
                </span>
                {errors.email && (
                    <span id="email-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.email}
                    </span>
                )}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
                <label htmlFor="mobile" className="form-label">
                    Mobile Number <span className="required">*</span>
                </label>
                <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className={`form-control ${errors.mobile ? 'error' : ''}`}
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => {
                        const formatted = formatMobileNumber(e.target.value);
                        setFormData(prev => ({ ...prev, mobile: formatted }));
                        if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
                    }}
                    disabled={isLoading}
                    aria-describedby={errors.mobile ? "mobile-error" : "mobile-help"}
                />
                <span id="mobile-help" className="form-helper">
                    Used for verification and notifications
                </span>
                {errors.mobile && (
                    <span id="mobile-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.mobile}
                    </span>
                )}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
                <label htmlFor="dob" className="form-label">
                    Date of Birth <span className="required">*</span>
                </label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    className={`form-control ${errors.dob ? 'error' : ''}`}
                    value={formData.dob}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    aria-describedby={errors.dob ? "dob-error" : "dob-help"}
                />
                <span id="dob-help" className="form-helper">
                    Must be at least 21 years old
                </span>
                {errors.dob && (
                    <span id="dob-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.dob}
                    </span>
                )}
            </div>

            {/* Gender */}
            <div className="form-group">
                <label htmlFor="gender" className="form-label">
                    Gender <span className="required">*</span>
                </label>
                <select
                    id="gender"
                    name="gender"
                    className={`form-control ${errors.gender ? 'error' : ''}`}
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    aria-describedby={errors.gender ? "gender-error" : undefined}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && (
                    <span id="gender-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.gender}
                    </span>
                )}
            </div>

            {/* Password */}
            <div className="form-group">
                <label htmlFor="password" className="form-label">
                    Password <span className="required">*</span>
                </label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className={`form-control ${errors.password ? 'error' : ''}`}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        aria-describedby={errors.password ? "password-error" : "password-help"}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
                <span id="password-help" className="form-helper">
                    Minimum 8 characters with letters, numbers, and special characters
                </span>
                {errors.password && (
                    <span id="password-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.password}
                    </span>
                )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <span className="required">*</span>
                </label>
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
                {errors.confirmPassword && (
                    <span id="confirmPassword-error" className="error-text">
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.confirmPassword}
                    </span>
                )}
            </div>

            {/* Terms and Conditions */}
            <div className="terms">
                <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    aria-describedby={errors.agreeTerms ? "terms-error" : undefined}
                />
                <label htmlFor="agreeTerms">
                    I agree to the{' '}
                    <a href="/doctor-terms" target="_blank" rel="noopener noreferrer">
                        Doctor Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                    </a>
                </label>
            </div>
            {errors.agreeTerms && (
                <span id="terms-error" className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.agreeTerms}
                </span>
            )}

            {/* Form Actions */}
            <div className="form-actions">
                {onBack && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onBack}
                        disabled={isLoading}
                    >
                        <i className="fas fa-arrow-left"></i> Back
                    </button>
                )}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i> Processing...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-arrow-right"></i> Continue to Professional Information
                        </>
                    )}
                </button>
            </div>

            {/* Login Link */}
            <div className="login-link">
                Already have a doctor account?{' '}
                <Link to="/doctor/login">Sign In</Link>
            </div>
        </form>
    );
};

export default DoctorProfessionalForm;