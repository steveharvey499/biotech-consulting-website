import type { Metadata } from "next";
import SubscriptionForm from "@/components/SubscriptionForm";
import BlogPostsList from "@/components/BlogPostsList";
import { blogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "The Latest Synthesis | Steve Harvey | Biotech Insights & Articles",
  description:
    "Read the latest articles, insights, and thoughts on biotech leadership, scaling companies, synthetic biology, and building successful life sciences businesses.",
  openGraph: {
    title: "The Latest Synthesis | Steve Harvey | Biotech Insights",
    description:
      "Insights on biotech leadership, scaling companies, and building successful life sciences businesses.",
  },
};

const LatestSynthesis = () => {
  // Sort posts by date (latest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-hero text-adenine mb-6">
              The Latest Synthesis
            </h1>
            <p className="text-intro text-text-body max-w-2xl mx-auto">
              Insights, strategies, and lessons learned from building and scaling
              biotech companies.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <BlogPostsList posts={sortedPosts} />
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 border border-guanine/20">
              <h2 className="font-display text-section text-adenine mb-4">
                Stay Updated
              </h2>
              <p className="text-body text-text-body mb-8">
                Subscribe to receive the latest insights, strategies, and articles
                on biotech leadership, scaling companies, and building successful
                life sciences businesses.
              </p>
              <SubscriptionForm />
              <p className="mt-6 text-small text-text-secondary">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestSynthesis;
