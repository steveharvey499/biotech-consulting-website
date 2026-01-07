"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackConversion } from "@/lib/analytics";

interface SubscriptionFormData {
  email: string;
  honeypot?: string;
}

const SubscriptionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>();

  const onSubmit = async (data: SubscriptionFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    console.log("Submitting subscription form with email:", data.email);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          disabled={isSubmitting}
          className="px-6 py-3 bg-thymine text-white rounded-lg font-semibold hover:bg-thymine-light focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          aria-label="Subscribe to newsletter"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

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
    </form>
  );
};

export default SubscriptionForm;

