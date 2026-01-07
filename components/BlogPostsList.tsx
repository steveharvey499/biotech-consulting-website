"use client";

import Link from "next/link";
import { useState } from "react";
import { BlogPost, getLetterColor } from "@/lib/blogPosts";

interface BlogPostsListProps {
  posts: BlogPost[];
}

const BlogPostsList = ({ posts }: BlogPostsListProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? posts : posts.slice(0, 4);
  const hasMore = posts.length > 4;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-guanine"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="font-display text-section text-adenine mb-4">
          Coming Soon
        </h2>
        <p className="text-body text-text-body max-w-md mx-auto">
          I&apos;m currently working on my first articles. Check back soon for
          insights on biotech leadership, scaling strategies, and building
          successful companies.
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        {displayedPosts.map((post, index) => (
          <div key={post.id}>
            <article className="pb-8">
              <div className="flex items-start gap-6 mb-4">
                <div
                  className={`text-5xl lg:text-6xl font-display ${getLetterColor(
                    post.letter
                  )} flex-shrink-0`}
                >
                  {post.letter}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <span className="inline-block px-3 py-1 text-small font-semibold text-thymine bg-thymine/10 rounded-full">
                      {post.category}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-small text-text-secondary"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="text-small text-text-secondary">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-subsection text-adenine mb-4 hover:text-thymine transition-colors">
                    <Link href={`/latest-synthesis/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                </div>
              </div>
              <p className="text-body text-text-body mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <Link
                href={`/latest-synthesis/${post.id}`}
                className="inline-flex items-center text-thymine hover:text-thymine-light font-semibold text-body group"
              >
                Read more
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
            {index < displayedPosts.length - 1 && (
              <div className="flex justify-center py-8">
                <div className="w-96 h-px bg-guanine/20"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleToggle}
            className="inline-flex items-center px-6 py-3 bg-thymine text-white font-semibold text-body rounded-lg hover:bg-thymine-light transition-colors focus:outline-none focus:ring-2 focus:ring-thymine focus:ring-offset-2"
            aria-label={showAll ? "Show fewer articles" : "Show all articles"}
          >
            {showAll ? (
              <>
                Show Less
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                View All Articles ({posts.length})
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default BlogPostsList;

