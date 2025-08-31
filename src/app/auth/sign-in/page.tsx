'use client';
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff} from '@/components/icons';

export default function SignInPage() {
  const router = useRouter();
 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({  email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
      
  // Check if all required fields are filled
  const isFormValid = formData.email.trim() !== '' && 
                      formData.password.trim() !== '';


  const handleSignIn = () => {
    // call API then redirect
    alert('Sign in successful!');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
          {/* Logo at the top */}
          <div className="px-4 md:px-10">
            <div className="px-4 md:px-8 py-4 md:py-6">
      <Image src="/logo.png" alt="Bancro Logo" width={150} height={40} />
    </div>
    
          </div>
    
          {/* Main content area */}
          <div className="flex-1 flex flex-col md:flex-row items-center min-h-0">
            {/* Left side with image - hidden on mobile */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="w-100 h-120 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/image.png" 
                  alt="Professional woman holding phone"
                  width={320}
                  height={394}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

      {/* Right side with form */}
        <div className="flex-1 flex items-center justify-center md:justify-start px-4 md:px-2 py-8 md:py-0">
          <div className="w-full max-w-sm">
            <div className="flex flex-col justify-center space-y-2">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Sign In 👋</h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">Welcome Back! Sign in with your registered email<br className="hidden md:block" />
              <span className="md:inline">address and your password</span>
</p>
          </div>

          {/* Form */}
          <div>
            <div className="space-y-4 md:space-y-4">
              {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="johndoe@email.com" 
                  className="w-full pl-10 pr-3 py-1.5 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400" 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-10 py-1.5 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-strong-password-auto-fill-button]:hidden" 
                 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none z-10"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              </div>
            </div>

            <div className="text-left mt-4">
              <button
                type="button"
                onClick={() => router.push('/auth/reset')}
                className="text-sm text-gray-800 underline hover:no-underline"
              >
                Forgot Password?
              </button>
            </div>

            <button 
            onClick={handleSignIn} 
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-medium mt-4 transition-colors flex items-center justify-center gap-2 ${
              isFormValid 
                ? 'bg-green-400 text-white hover:bg-green-500' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Login
            <svg 
              className={`w-4 h-4 ${isFormValid ? 'text-white' : 'text-gray-400'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/auth/sign-up')}
              className="text-gray-800 font-medium underline hover:no-underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
