// app/signin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedBackground } from '@/components/animated-background';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleGoogleSignIn = async () => {
    try {
      console.log('Google sign in clicked');
      // Add Google OAuth logic here
      // Example: window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      console.log('Microsoft sign in clicked');
      // Add Microsoft OAuth logic here
      // Example: window.location.href = '/api/auth/microsoft';
    } catch (error) {
      console.error('Microsoft sign in error:', error);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Here you would typically send the data to your backend
      console.log('Signing in with:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, check if email exists in localStorage from signup
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const userData = JSON.parse(userInfo);
        if (userData.email === formData.email) {
          // Successful login - navigate to welcome page
          router.push('/welcome');
          return;
        }
      }
      
      // If no matching user found, show error
      setErrors({ 
        submit: 'Invalid email or password. Please check your credentials and try again.' 
      });
      
    } catch (error) {
      console.error('Error signing in:', error);
      setErrors({ 
        submit: 'An error occurred during sign in. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark-theme min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-700 ease-out ${
          isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Welcome Back
              </h1>
              <p className="text-gray-300">
                Sign in to continue your strategic journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
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
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Social Sign In Options */}
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
                    onClick={handleGoogleSignIn}
                    className="bg-black/20 border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2"
                    disabled={isLoading}
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
                    onClick={handleMicrosoftSignIn}
                    className="bg-black/20 border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2"
                    disabled={isLoading}
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
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}