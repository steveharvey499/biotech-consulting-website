import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogPostById,
  getAllBlogPostIds,
  getLetterColor,
} from "@/lib/blogPosts";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = getAllBlogPostIds();
  return ids.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | The Latest Synthesis`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Back Link */}
      <section className="py-8 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/latest-synthesis"
              className="inline-flex items-center text-thymine hover:text-thymine-light font-medium text-body group"
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
      </section>

      {/* Blog Post Content */}
      <article className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-start gap-6 mb-6">
                <div
                  className={`text-6xl lg:text-7xl font-display ${getLetterColor(
                    post.letter
                  )} flex-shrink-0`}
                >
                  {post.letter}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6 flex-wrap">
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
                  <h1 className="font-display text-hero text-adenine">
                    {post.title}
                  </h1>
                </div>
              </div>
            </header>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-adenine
                prose-h2:text-section prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-subsection prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-body prose-p:text-text-body prose-p:mb-8 prose-p:leading-relaxed prose-p:mt-0
                prose-a:text-thymine prose-a:no-underline hover:prose-a:text-thymine-light hover:prose-a:underline
                prose-strong:text-adenine prose-strong:font-semibold
                prose-ul:text-body prose-ul:text-text-body prose-ul:mb-8 prose-ul:mt-0 prose-ul:ml-6 prose-ul:list-disc
                prose-ol:text-body prose-ol:text-text-body prose-ol:mb-8 prose-ol:mt-0 prose-ol:ml-6
                prose-li:text-body prose-li:text-text-body prose-li:mb-4 prose-li:pl-2 prose-li:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-thymine prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-text-secondary
                prose-code:text-thymine prose-code:bg-thymine/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-guanine/20"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Back to List Link */}
      <section className="py-12 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
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
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;

