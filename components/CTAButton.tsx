import Link from "next/link";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

const CTAButton = ({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: CTAButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 text-button font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryStyles =
    "bg-adenine text-white hover:bg-adenine-light focus:ring-adenine shadow-lg hover:shadow-xl";
  const secondaryStyles =
    "bg-white text-adenine border-2 border-adenine hover:bg-bg-secondary focus:ring-adenine";

  const styles = `${baseStyles} ${
    variant === "primary" ? primaryStyles : secondaryStyles
  } ${className}`;

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={styles}
        onClick={onClick}
        aria-label={typeof children === "string" ? children : "Call to action"}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        onClick={onClick}
        aria-label={typeof children === "string" ? children : "Call to action"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={styles}
      onClick={onClick}
      aria-label={typeof children === "string" ? children : "Call to action"}
    >
      {children}
    </Link>
  );
};

export default CTAButton;
