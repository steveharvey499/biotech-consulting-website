"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackConversion } from "@/lib/analytics";

interface SubscriptionFormData {
  email: string;
  name: string;
  role?: string;
  companyFocus?: string;
  biggestChallenge?: string;
  teamSize?: string;
  referralSource?: string;
  honeypot?: string;
}

const SubscriptionForm = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState<Partial<SubscriptionFormData>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SubscriptionFormData>();

  const onEmailSubmit = (data: Partial<SubscriptionFormData>) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    // Validate email
    if (!data.email) {
      return;
    }

    // Save email and move to next step
    setFormData({ ...formData, email: data.email });
    setCurrentStep(2);
  };

  const onNameSubmit = (data: Partial<SubscriptionFormData>) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    // Validate name
    if (!data.name) {
      return;
    }

    // Save name and move to questions step
    setFormData({ ...formData, name: data.name });
    setCurrentStep(3);
  };

  const onFinalSubmit = async (data: SubscriptionFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    console.log("Submitting subscription form with data:", {
      email: data.email,
      name: data.name,
      role: data.role,
      companyFocus: data.companyFocus,
      biggestChallenge: data.biggestChallenge,
      teamSize: data.teamSize,
      referralSource: data.referralSource,
    });

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      console.log("Making subscription request to /api/subscribe");
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          role: data.role,
          companyFocus: data.companyFocus,
          biggestChallenge: data.biggestChallenge,
          teamSize: data.teamSize,
          referralSource: data.referralSource,
        }),
      });

      console.log("Response status:", response.status, response.statusText);

      // Try to parse response as JSON first
      let responseData;
      try {
        responseData = await response.json();
        console.log("Response data:", responseData);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        // Extract error message from response
        const errorMessage = responseData?.error || responseData?.message || `Server error: ${response.status}`;
        console.error("Subscription failed:", errorMessage);
        throw new Error(errorMessage);
      }

      // Success
      console.log("Subscription successful:", responseData);
      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you for subscribing! You'll receive the latest insights and articles directly to your inbox."
      );
      trackConversion("newsletter_subscription");
      reset();
      setCurrentStep(1);
      setFormData({});
    } catch (error) {
      console.error("Subscription error details:", error);
      setSubmitStatus("error");
      
      // Extract meaningful error message
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }
      
      // Show user-friendly message with details
      setSubmitMessage(
        `Sorry, there was an error subscribing: ${errorMessage}. Please try again or contact support if the problem persists.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress indicator */}
      {(currentStep === 2 || currentStep === 3) && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            currentStep >= 1 ? "bg-thymine text-white" : "bg-guanine/20 text-guanine"
          }`}>
            1
          </div>
          <div className={`w-12 h-0.5 ${currentStep >= 2 ? "bg-thymine" : "bg-guanine/20"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            currentStep >= 2 ? "bg-thymine text-white" : "bg-guanine/20 text-guanine"
          }`}>
            2
          </div>
          <div className={`w-12 h-0.5 ${currentStep >= 3 ? "bg-thymine" : "bg-guanine/20"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            currentStep >= 3 ? "bg-thymine text-white" : "bg-guanine/20 text-guanine"
          }`}>
            3
          </div>
        </div>
      )}

      {currentStep === 1 ? (
        // Step 1: Email
        <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
          {/* Honeypot field */}
          <input
            type="text"
            {...register("honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="subscription-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="subscription-email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                aria-invalid={errors.email ? "true" : "false"}
                aria-label="Email address for newsletter subscription"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors whitespace-nowrap"
              aria-label="Continue to name"
            >
              Continue
            </button>
          </div>
        </form>
      ) : currentStep === 2 ? (
        // Step 2: Name
        <form onSubmit={handleSubmit(onNameSubmit)} className="space-y-4">
          {/* Honeypot field */}
          <input
            type="text"
            {...register("honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Hidden email field to preserve it */}
          <input
            type="hidden"
            {...register("email")}
            value={formData.email}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="subscription-name" className="sr-only">
                Your name
              </label>
              <input
                type="text"
                id="subscription-name"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
                aria-invalid={errors.name ? "true" : "false"}
                aria-label="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors whitespace-nowrap"
              aria-label="Continue to questions"
            >
              Continue
            </button>
          </div>

          <div className="flex justify-start pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-sm text-thymine hover:text-thymine-light font-medium"
            >
              ← Back to email
            </button>
          </div>
        </form>
      ) : (
        // Step 3: Questions
        <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
          {/* Honeypot field */}
          <input
            type="text"
            {...register("honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Hidden fields to preserve email and name */}
          <input
            type="hidden"
            {...register("email")}
            value={formData.email}
          />
          <input
            type="hidden"
            {...register("name")}
            value={formData.name}
          />

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-adenine mb-2">
              1. Which of these best describes your current role? <span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              {...register("role", { required: "Please select your role" })}
              className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
              aria-invalid={errors.role ? "true" : "false"}
            >
              <option value="">Select your role</option>
              <option value="founder-ceo">Founder / CEO</option>
              <option value="scientific-founder-cso">Scientific Founder / CSO</option>
              <option value="operations-commercial">Operations / Commercial Lead</option>
              <option value="investor-board">Investor / Board Member</option>
              <option value="aspiring-founder">Aspiring Founder / Researcher</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="companyFocus" className="block text-sm font-semibold text-adenine mb-2">
              2. What is your company&apos;s current primary focus? <span className="text-red-600">*</span>
            </label>
            <select
              id="companyFocus"
              {...register("companyFocus", { required: "Please select company focus" })}
              className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
              aria-invalid={errors.companyFocus ? "true" : "false"}
            >
              <option value="">Select company focus</option>
              <option value="rd-discovery">R&D / Early-Stage Discovery</option>
              <option value="pre-seed-seed">Pre-Seed / Seed Fundraising</option>
              <option value="series-a-scaling">Series A+ Scaling</option>
              <option value="commercial-validation">Commercial Validation & Partnerships</option>
              <option value="clinical-regulatory">Clinical Trials / Regulatory Approval</option>
            </select>
            {errors.companyFocus && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.companyFocus.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="biggestChallenge" className="block text-sm font-semibold text-adenine mb-2">
              3. What is your biggest challenge right now? <span className="text-red-600">*</span>
            </label>
            <select
              id="biggestChallenge"
              {...register("biggestChallenge", { required: "Please select your biggest challenge" })}
              className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
              aria-invalid={errors.biggestChallenge ? "true" : "false"}
            >
              <option value="">Select your challenge</option>
              <option value="attention">Attention: Building a brand to attract top-tier talent or investors.</option>
              <option value="trajectory">Trajectory: Deciding whether to pivot, persevere, or raise capital.</option>
              <option value="culture">Culture: Bridging the gap between our technical and business teams.</option>
              <option value="gains">Gains: Securing our first revenue-generating partners or customers.</option>
            </select>
            {errors.biggestChallenge && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.biggestChallenge.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="teamSize" className="block text-sm font-semibold text-adenine mb-2">
              4. What is your current team size? <span className="text-red-600">*</span>
            </label>
            <select
              id="teamSize"
              {...register("teamSize", { required: "Please select team size" })}
              className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
              aria-invalid={errors.teamSize ? "true" : "false"}
            >
              <option value="">Select team size</option>
              <option value="solo-duo">Solo Founder / Duo</option>
              <option value="3-10">3–10 (The Core Team)</option>
              <option value="11-50">11–50 (The Scaling Phase)</option>
              <option value="51-plus">51+ (The Principles-Led Organization)</option>
            </select>
            {errors.teamSize && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.teamSize.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="referralSource" className="block text-sm font-semibold text-adenine mb-2">
              5. How did you first hear about The Synthesis? <span className="text-red-600">*</span>
            </label>
            <select
              id="referralSource"
              {...register("referralSource", { required: "Please select how you heard about us" })}
              className="w-full px-4 py-3 border border-guanine/30 rounded-lg focus:ring-2 focus:ring-thymine focus:border-thymine outline-none transition-colors"
              aria-invalid={errors.referralSource ? "true" : "false"}
            >
              <option value="">Select referral source</option>
              <option value="linkedin">LinkedIn / Founder Brand</option>
              <option value="podcast">Podcast Episode</option>
              <option value="referral">Personal Referral</option>
              <option value="event">Speaking Event / Webinar</option>
            </select>
            {errors.referralSource && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.referralSource.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 border border-guanine/30 text-adenine rounded-lg font-semibold hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Subscribe to newsletter"
            >
              {isSubmitting ? "Subscribing..." : "Complete Subscription"}
            </button>
          </div>
        </form>
      )}

      {/* Status Message */}
      {submitStatus !== "idle" && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="alert"
        >
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;

