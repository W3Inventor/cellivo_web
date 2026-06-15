import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Eye, EyeOff, Check, ArrowLeft, ArrowRight, Mail, Lock, User, ChevronDown } from "lucide-react";
import cellivoLogo from "@/assets/cellivo-logo.webp";

const ACCOUNT_LOGIN_URL = "https://account.cellivo.com/login";

const benefits = [
  "No credit card required",
  "Ready in under 2 minutes",
  "Full access to all features",
];

const steps = [
  { label: "Account", icon: User },
  { label: "Verify", icon: Mail },
  { label: "Password", icon: Lock },
];

const countryOptions = [
  { value: "LK", label: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { value: "IN", label: "India", dialCode: "+91", flag: "🇮🇳" },
  { value: "BD", label: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { value: "NP", label: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { value: "PK", label: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { value: "SG", label: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { value: "MY", label: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { value: "TH", label: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { value: "AE", label: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { value: "SA", label: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { value: "QA", label: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { value: "KW", label: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { value: "OM", label: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { value: "BH", label: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { value: "GB", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { value: "US", label: "United States", dialCode: "+1", flag: "🇺🇸" },
  { value: "CA", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { value: "AU", label: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { value: "NZ", label: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { value: "ZA", label: "South Africa", dialCode: "+27", flag: "🇿🇦" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0].value);
  const [phoneNumber, setPhoneNumber] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const activeCountry = countryOptions.find((country) => country.value === selectedCountry) ?? countryOptions[0];

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12 relative">
      <SEOHead
        title="Start Your Free Cellivo Account"
        description="Create your Cellivo account in minutes and start using the phone shop POS with no credit card required."
        canonical="/signup"
        noindex
      />
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={cellivoLogo} alt="Cellivo" className="h-8 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Start free today</h1>
          <p className="text-muted-foreground mt-1 text-sm">Create your Cellivo account — no credit card needed</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    i < currentStep
                      ? "bg-primary text-primary-foreground"
                      : i === currentStep
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? <Check size={16} /> : <step.icon size={16} />}
                </div>
                <span className={`text-[11px] mt-1.5 font-medium ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-20 h-px mx-2 mb-5 transition-colors duration-300 ${
                  i < currentStep ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-background rounded-2xl border border-border p-8 shadow-sm">
          {currentStep === 0 && (
            <div className="space-y-5">
              {/* Social login */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-border bg-background hover:bg-secondary/50 transition-colors text-sm font-medium text-foreground"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-border bg-background hover:bg-secondary/50 transition-colors text-sm font-medium text-foreground"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground">or continue with email</span></div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone number</Label>
                  <div className="flex h-12 items-center rounded-xl border border-input bg-background transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          aria-label="Choose country"
                          aria-expanded={countryPickerOpen}
                          className="flex h-full min-w-[72px] shrink-0 items-center justify-center gap-2 rounded-l-xl px-3 text-foreground transition-colors hover:bg-secondary/40 focus-visible:outline-none"
                        >
                          <span className="text-xl leading-none">{activeCountry.flag}</span>
                          <ChevronDown size={14} className="text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-[320px] p-0">
                        <Command>
                          <CommandInput placeholder="Search country or code..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {countryOptions.map((country) => (
                                <CommandItem
                                  key={country.value}
                                  value={`${country.label} ${country.dialCode} ${country.value}`}
                                  onSelect={() => {
                                    setSelectedCountry(country.value);
                                    setCountryPickerOpen(false);
                                  }}
                                  className="flex items-center gap-3 rounded-none px-3 py-2.5"
                                >
                                  <span className="text-xl leading-none">{country.flag}</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-foreground">{country.label}</p>
                                    <p className="text-xs text-muted-foreground">{country.dialCode}</p>
                                  </div>
                                  <Check
                                    size={16}
                                    className={selectedCountry === country.value ? "text-primary" : "text-transparent"}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <span className="h-6 w-px bg-border" />
                    <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                      <span className="shrink-0 text-sm font-medium text-muted-foreground">
                        {activeCountry.dialCode}
                      </span>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-full border-0 px-0 py-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 h-11 rounded-xl font-medium">
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </form>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Check your email</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  We sent a 6-digit code to your email address
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-12 text-center text-lg font-semibold rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
                  />
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Didn't receive a code?{" "}
                <button type="button" className="text-primary font-medium hover:underline">Resend</button>
              </p>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-11 rounded-xl font-medium">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1 bg-foreground text-background hover:bg-foreground/90 h-11 rounded-xl font-medium">
                  Verify
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock size={24} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Create your password</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a secure password for your account
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirm your password" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-11 rounded-xl font-medium">
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-foreground text-background hover:bg-foreground/90 h-11 rounded-xl font-medium">
                    Create Account
                  </Button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 0 && (
            <div className="mt-6 pt-5 border-t border-border">
              <div className="flex flex-col gap-2">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <a href={ACCOUNT_LOGIN_URL} className="text-primary font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
