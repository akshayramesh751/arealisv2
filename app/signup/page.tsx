'use client';

import { useState } from 'react';
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

      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10">
            <Image 
              src="/logos/foresight flow logo.jpeg" 
              alt="ForesightFlow Logo" 
              width={40} 
              height={40} 
              className="rounded-lg"
            />
          </div>
          <span className="text-2xl font-bold text-white">ForesightFlow</span>
        </Link>
      </header>

      <main className="relative z-10 px-4">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-xl">
            <div className="frosted-glass rounded-3xl p-8 md:p-12 space-y-8 animate-slide-in-up">
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
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
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
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
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
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                        {formData.email && (
                          <div className="absolute right-3 top-3">
                            {validation.email ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : (
                              <span className="w-5 h-5 text-red-400">✕</span>
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
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                        {formData.password && (
                          <div className="absolute right-3 top-3">
                            {validation.password ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : (
                              <span className="w-5 h-5 text-red-400">✕</span>
                            )}
                          </div>
                        )}
                      </div>
                      {!validation.password && formData.password.length < 8 && (
                        <p className="text-xs text-white/50 mt-1">
                          Minimum 8 characters
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
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-white">
                        Your Role
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                        <Input
                          id="role"
                          type="text"
                          placeholder="CEO, Manager, Analyst..."
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                        />
                      </div>
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
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step < 3 ? 'Continue' : 'Complete Sign Up'}
                </Button>

                {step === 2 && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-white/60">Or sign up with</span>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10">
                      Google
                    </Button>
                    <Button variant="outline" className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10">
                      Microsoft
                    </Button>
                  </div>
                )}
              </div>

              {step > 1 && (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="w-full text-white/70 hover:text-white hover:bg-white/5"
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Add space to show background */}
        <div className="h-24"></div>
      </main>
    </div>
  );
}
