'use client';
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from '@/components/icons';

export default function ResetPassword() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    password: '', 
    confirmPassword: '' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if both fields are filled and match
  const isFormValid =
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    formData.password === formData.confirmPassword;

  const handlePasswordReset = () => {
    if (!isFormValid) {
      alert("Passwords do not match!");
      return;
    }
    // call API then redirect
    alert('Password Reset successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
      {/* Logo top-left */}
      <div className="absolute top-10 left-10">
        <Image src="/logo.png" alt="Bancro Logo" width={150} height={40} />
      </div>

      <div className="w-full max-w-md px-8">
        {/* Verification Icon */}
        <div className="flex justify-center mb-6">
          <Image src="/password.png" alt="Verification Icon" width={64} height={64} className="rounded-2xl" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset your Password</h1>
          <p className="text-gray-600 text-sm">
            Set a new password for your account
          </p>
        </div>

        {/* New Password */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400"
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

        {/* Button */}
        <button
          onClick={handlePasswordReset}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-medium mt-4 transition-colors flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-green-400 text-white hover:bg-green-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Reset Password
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
    </div>
  );
}
