'use client';
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from '@/components/icons';

export default function SignUpPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Form data changes depending on account type
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form validation based on account type
  const isFormValid =
    (accountType === 'personal'
      ? formData.firstName.trim() !== '' && formData.lastName.trim() !== ''
      : formData.companyName.trim() !== '') &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '';

  const handleSignUp = () => {
    if (!isFormValid) return;
    router.push("/auth/verification?mode=signup"); 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="px-4 md:px-10">
        <div className="px-4 md:px-8 py-4 md:py-6">
          <Image src="/logo.png" alt="Bancro Logo" width={150} height={40} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row items-center min-h-0">
        {/* Left image - hidden on mobile */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="w-100 h-120 rounded-2xl overflow-hidden shadow-lg">
            <Image
         src={accountType === 'personal' ? "/image.png" : "/business.png"}
         alt={accountType === 'personal' ? "Personal account signup" : "Business account signup"}
         width={320}
         height={394}
         className="object-cover w-full h-full"
/>
          </div>
        </div>

        {/* Right form */}
        <div className="flex-1 flex items-center justify-center md:justify-start px-4 md:px-2 py-8 md:py-0">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Sign Up 👋</h1>
            <p className="text-gray-600 mb-2 text-sm md:text-base">Let&apos;s get started</p>

            {/* Account type toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setAccountType('personal')}
                className={`flex-1 py-1.5 px-4 rounded-md transition ${
                  accountType === 'personal'
                    ? 'bg-white shadow text-black'
                    : 'bg-green-400 text-black'
                }`}
              >
                Personal Account
              </button>
              <button
                onClick={() => setAccountType('business')}
                className={`flex-1 py-1.5 px-4 rounded-md transition ${
                  accountType === 'business'
                    ? 'bg-white shadow text-black'
                    : 'bg-green-400 text-black'
                }`}
              >
                Business Account
              </button>
            </div>

            {/* Form */}
            <div className="space-y-3 md:space-y-3">
              {accountType === 'personal' ? (
                <>
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full px-3 py-1.5 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-3 py-1.5 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Company Name"
                      className="w-full px-3 py-1.5 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400"
                    />
                  </div>
                </>
              )}

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
                    className="w-full pl-10 pr-10 py-1.5 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400"
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

            {/* Submit button */}
            <button
              onClick={handleSignUp}
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-medium mt-4 transition-colors flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-green-400 text-white hover:bg-green-500'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create Account
              <svg
                className={`w-4 h-4 ${isFormValid ? 'text-white' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/auth/sign-in')}
                className="text-gray-800 font-medium underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
