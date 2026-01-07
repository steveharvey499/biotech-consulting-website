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

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you for subscribing! You'll receive the latest insights and articles directly to your inbox."
      );
      trackConversion("newsletter_subscription");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Sorry, there was an error subscribing. Please try again."
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

