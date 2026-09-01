"use client";

import { useEffect } from "react";
import { Link, usePathname } from "@/lib/navigation";
import { PageTitle } from "@/components/layout/PageTitle";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <div className="container flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <PageTitle title="404" subtitle="Oops! Page not found" />
        <Link
          href="/"
          className="mt-10 text-base font-medium text-primary underline underline-offset-4 hover:text-primary/90 md:mt-12"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
