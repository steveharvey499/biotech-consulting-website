import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="font-display text-hero text-adenine mb-6">
            Post Not Found
          </h1>
          <p className="text-body text-text-body mb-8 max-w-md mx-auto">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/latest-synthesis"
            className="inline-flex items-center text-thymine hover:text-thymine-light font-semibold text-body group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to The Latest Synthesis
          </Link>
        </div>
      </div>
    </div>
  );
}

