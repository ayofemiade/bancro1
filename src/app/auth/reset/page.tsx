'use client';
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail} from '@/components/icons';

export default function ResetPage() {
  const router = useRouter();
 

  const [formData, setFormData] = useState({  email: ''});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
      
  // Check if all required fields are filled
  const isFormValid = formData.email.trim() !== '';


 const handleForgotPassword = () => {
  // call API to send verification code
  router.push("/auth/verification?mode=reset"); 
};


  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
          {/* Logo at the top */}
          <div className="px-10 ">
            <div className="px-8 py-6">
      <Image src="/logo.png" alt="Bancro Logo" width={150} height={40} />
    </div>
    
          </div>
    
          {/* Main content area */}
          <div className="flex-1 flex items-center min-h-0">
            {/* Left side with image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-100 h-120 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/business.png" 
                  alt="Professional woman holding phone"
                  width={320}
                  height={394}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

      {/* Right side with form */}
        <div className="flex-1 flex items-center justify-start px-2">
          <div className="w-full max-w-sm ">
            <div className="flex flex-col justify-center space-y-2">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h1>
          <p className="text-gray-600 mb-6">Don't worry! It happens to the best of us. Provide your registered email address and we'll get you sorted out.
</p>
          </div>

          {/* Form */}
          <div>
            <div className="space-y-8">
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
                  className="w-full pl-10 pr-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400" 
                />
              </div>
            </div>

            
              </div>
            </div>

          

            <button 
            onClick={handleForgotPassword} 
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-medium mt-4 transition-colors flex items-center justify-center gap-2 ${
              isFormValid 
                ? 'bg-green-400 text-white hover:bg-green-500' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Request Password Reset
            <svg 
              className={`w-4 h-4 ${isFormValid ? 'text-white' : 'text-gray-400'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
         
         <div className="mt-4 text-center">
  <button 
    onClick={() => router.push('/auth/sign-in')} 
    className="text-gray-600 hover:underline"
  >
    Go Back
  </button>
        </div>
          </div>

          
          
        </div>
      </div>
    </div>
   
  );
}
