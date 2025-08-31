"use client";

import Image from "next/image";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";


function VerificationContent() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [hasStarted, setHasStarted] = useState(false);
  const isComplete = verificationCode.every((digit) => digit !== '');
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // "signup" or "reset"

  const handleVerificationChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (!hasStarted && value !== '') {
        setHasStarted(true);
      }

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerification = () => {
    if (mode === "signup") {
      router.push("/auth/sign-in");
    } else if (mode === "reset") {
      router.push("/auth/reset-password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
      {/* Logo top-left */}
      <div className="absolute top-4 md:top-10 left-4 md:left-10">
        <Image src="/logo.png" alt="Bancro Logo" width={120} height={32} className="md:w-[150px] md:h-[40px]" />
      </div>

      <div className="w-full max-w-md px-4 md:px-8 mt-16 md:mt-0">
        {/* Verification Icon */}
        <div className="flex justify-center mb-6">
          <Image src="/email.png" alt="Verification Icon" width={64} height={64} className="rounded-2xl" />
        </div>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Email Verification</h1>
          <p className="text-gray-600 text-sm px-2">
            Enter the 6-digit verification code that has been sent to your<br className="hidden md:block" />
            <span className="md:inline">registered email address. Check your inbox.</span>
          </p>
        </div>

        {/* Verification Code Input */}
        <div>
          <div className="flex gap-2 md:gap-3 justify-center mb-6 md:mb-8">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={digit}
                onChange={(e) => handleVerificationChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-10 h-10 md:w-12 md:h-12 text-center text-base md:text-xl font-semibold border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-green-500 focus:border-transparent 
                           text-black placeholder-gray-400"
                maxLength={1}
                placeholder={hasStarted ? "" : "0"}
              />
            ))}
          </div>

          <button
            onClick={handleVerification}
            disabled={!isComplete}
            className={`w-full py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base
                        ${
                          isComplete
                            ? "bg-green-400 text-white hover:bg-green-500"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
          >
            Verify Code
          </button>
        </div>
      </div>
    </div>
  );
}


export default function VerificationPage() {
  return (
    <Suspense fallback={<div>Loading verification...</div>}>
      <VerificationContent />
    </Suspense>
  );
}
