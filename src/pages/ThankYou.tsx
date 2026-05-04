import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getThankYouPage } from "@/lib/sanityQueries";
import { PageSeo } from "@/components/PageSeo";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ThankYou = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["thankYouPage"],
    queryFn: getThankYouPage,
  });

  const title = data?.title?.trim() || "Thank you";
  const subtitle =
    data?.subtitle?.trim() ||
    "Your submission was received. We appreciate you taking the time to connect with Milton Qur'an Institute.";
  const body = data?.body;
  const ctaLabel = data?.primaryCtaLabel?.trim() || "Back to home";
  const ctaPath = data?.primaryCtaPath?.trim() || "/";
  const seo = data?.seo;

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <main className="section-soft-radial section-y relative overflow-hidden">
      <DecorativeArabic variant="full" opacity={0.034} />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${title} | MQI`} />
      <div className="container relative z-10 max-w-3xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
        >
          <h1 className="heading-section mb-6">{title}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>

          {body && body.length > 0 && (
            <div className="prose prose-lg max-w-none prose-p:text-muted-foreground text-left mb-10">
              <PortableText value={body} />
            </div>
          )}

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-2xl border-primary/24 bg-background/85 px-10 py-6 text-base font-medium shadow-sm backdrop-blur-sm hover:border-primary/34 hover:bg-primary/[0.07]"
          >
            <Link to={ctaPath.startsWith("/") ? ctaPath : `/${ctaPath}`}>{ctaLabel}</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default ThankYou;
