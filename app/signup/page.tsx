'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedBackground } from '@/components/animated-background';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    phone: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(true);
    }, 100);

    const loadTimer = setTimeout(() => {
      setIsFullyLoaded(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Add Google OAuth logic here
      console.log('Google sign up clicked');
      // Example: Redirect to Google OAuth or use a library like next-auth
      // window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Google sign up error:', error);
    }
  };

  const handleMicrosoftSignUp = async () => {
    try {
      // Add Microsoft OAuth logic here
      console.log('Microsoft sign up clicked');
      // Example: Redirect to Microsoft OAuth
      // window.location.href = '/api/auth/microsoft';
    } catch (error) {
      console.error('Microsoft sign up error:', error);
    }
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Please select a business type';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    if (step === 2 && validateStep2()) {
      try {
        // Here you would typically send the data to your backend
        console.log('Submitting form data:', formData);
        
        // Store user info in localStorage for welcome page
        localStorage.setItem('userInfo', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          businessName: formData.businessName,
          businessType: formData.businessType
        }));
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to welcome page
        router.push('/welcome');
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'An error occurred. Please try again.' });
      }
    }
  };

  const businessTypes = [
    { value: '', label: 'Select business type' },
    { value: 'retail', label: 'Retail' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Create Your Account
        </h1>
        <p className="text-gray-300">
          Start your journey to strategic foresight
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary ${
              errors.firstName ? 'border-red-500' : ''
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary ${
              errors.lastName ? 'border-red-500' : ''
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary ${
            errors.email ? 'border-red-500' : ''
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Password</Label>
        <div className="relative">
         <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary pr-10 ${
          errors.password ? 'border-red-500' : ''
          }`}
          placeholder="Create a password"
         />
        <button
           type="button"
           onClick={() => setShowPassword(!showPassword)}
           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
         </button>
        </div>
  
       {/* Password requirement indicator */}
        <div className="flex items-center gap-2 mt-2">
            {formData.password.length >= 8 ? (
            <Check size={14} className="text-green-500" />
          ) : (
           <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          )}
           <span className={`text-xs ${
          formData.password.length >= 8 ? 'text-green-500' : 'text-red-400'
       }`}>
           Minimum 8 characters required
           </span>
        </div>
  
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary pr-10 ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Social Sign Up Options */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black/20 px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleMicrosoftSignUp}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
              />
            </svg>
            Microsoft
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Business Information
        </h1>
        <p className="text-gray-300">
          Tell us about your business
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-white">Business Name</Label>
        <Input
          id="businessName"
          name="businessName"
          type="text"
          value={formData.businessName}
          onChange={handleInputChange}
          className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary ${
            errors.businessName ? 'border-red-500' : ''
          }`}
          placeholder="Enter your business name"
        />
        {errors.businessName && (
          <p className="text-red-400 text-sm">{errors.businessName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessType" className="text-white">Business Type</Label>
        <select
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.businessType ? 'border-red-500' : ''
          }`}
        >
          {businessTypes.map((type) => (
            <option key={type.value} value={type.value} className="bg-gray-800 text-white">
              {type.label}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <p className="text-red-400 text-sm">{errors.businessType}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className={`bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-primary ${
            errors.phone ? 'border-red-500' : ''
          }`}
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="dark-theme min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-700 ease-out ${
          isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            
            {/* Progress Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-white/20 text-gray-400'
                }`}>
                  {step > 1 ? <Check size={16} /> : '1'}
                </div>
                <div className={`w-8 h-1 rounded transition-all ${
                  step >= 2 ? 'bg-primary' : 'bg-white/20'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-white/20 text-gray-400'
                }`}>
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 ? renderStep1() : renderStep2()}
              
              {errors.submit && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{errors.submit}</p>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    variant="outline"
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                
                <Button
                  type="submit"
                  className={`bg-primary hover:bg-primary/90 text-white ${
                    step === 1 ? 'w-full' : 'flex-1'
                  }`}
                >
                  {step === 1 ? 'Next' : 'Create Account'}
                  {step === 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link href="/signin" className="text-primary hover:text-primary/80 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
