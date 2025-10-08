'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedBackground } from '@/components/animated-background';
import { Network, Check, Mail, Lock, User, Building } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignUpPage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    role: '',
    shopName: '',
    shopifyApiKey: '',
    shopifyPassword: '',
  });

  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    // Trigger enter animation when component mounts
    const timer = setTimeout(() => {
      setIsEntering(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'email') {
      setValidation(prev => ({
        ...prev,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      }));
    }

    if (field === 'password') {
      setValidation(prev => ({
        ...prev,
        password: value.length >= 8,
      }));
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Store user info in localStorage before redirecting
      const userInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        shopName: formData.shopName,
        shopifyApiKey: formData.shopifyApiKey,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      router.push('/connect-data');
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.firstName.length > 0 && formData.lastName.length > 0;
    if (step === 2) return validation.email && validation.password;
    if (step === 3) return formData.company.length > 0;
    return false;
  };

  return (
    <div className="dark-theme min-h-screen relative">
      <AnimatedBackground />

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className={`w-full max-w-md transition-all duration-650 ease-out ${
          isEntering ? 'form-enter' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      step >= s
                        ? 'bg-primary border-primary text-white'
                        : 'border-white/30 text-white/50'
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        step > s ? 'bg-primary' : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Header */}
            <div>
              <p className="text-sm text-white/60 mb-2">
                Step {step} of 3: {step === 1 ? 'Identity' : step === 2 ? 'Security' : 'Organization'}
              </p>
              <h2 className="text-3xl font-bold text-white mb-2">
                {step === 1 && 'Welcome to ForesightFlow'}
                {step === 2 && 'Secure Your Account'}
                {step === 3 && 'Tell Us About Your Business'}
              </h2>
              <p className="text-white/70">
                {step === 1 && "Let's start with your basic information"}
                {step === 2 && 'Create a strong password to protect your insights'}
                {step === 3 && 'Help us personalize your experience'}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Work Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
                      />
                      {formData.email && (
                        <div className="absolute right-3 top-3">
                          {validation.email ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <span className="w-5 h-5 text-red-400 flex items-center justify-center">✕</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
                      />
                      {formData.password && (
                        <div className="absolute right-3 top-3">
                          {validation.password ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <span className="w-5 h-5 text-red-400 flex items-center justify-center">✕</span>
                          )}
                        </div>
                      )}
                    </div>
                    {!validation.password && formData.password.length > 0 && formData.password.length < 8 && (
                      <p className="text-xs text-red-400 mt-1">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company Name
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Acme Corporation"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shopName" className="text-white">
                        Shop Name
                      </Label>
                      <div className="relative">
                        <Network className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                        <Input
                          id="shopName"
                          type="text"
                          placeholder="My Shopify Store"
                          value={formData.shopName}
                          onChange={(e) => handleInputChange('shopName', e.target.value)}
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shopifyApiKey" className="text-white">
                        Shopify API Key
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                        <Input
                          id="shopifyApiKey"
                          type="text"
                          placeholder="sk_live_..."
                          value={formData.shopifyApiKey}
                          onChange={(e) => handleInputChange('shopifyApiKey', e.target.value)}
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shopifyPassword" className="text-white">
                        Shopify Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                        <Input
                          id="shopifyPassword"
                          type="password"
                          placeholder="Shopify Password"
                          value={formData.shopifyPassword}
                          onChange={(e) => handleInputChange('shopifyPassword', e.target.value)}
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white">
                      Your Role (Optional)
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <Input
                        id="role"
                        type="text"
                        placeholder="CEO, Manager, Analyst..."
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {step < 3 ? 'Continue' : 'Complete Sign Up'}
              </Button>

              {step === 2 && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-black/20 px-3 text-white/60">Or sign up with</span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                  >
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                  >
                    Microsoft
                  </Button>
                </div>
              )}
            </div>

            {/* Back Button */}
            {step > 1 && (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="w-full text-white/70 hover:text-white hover:bg-white/10"
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
