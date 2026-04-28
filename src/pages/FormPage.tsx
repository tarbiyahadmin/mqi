import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormPageShell } from "@/components/forms/FormPageShell";
import { getFormPageBySlug } from "@/lib/sanityQueries";

const FormPageRoute = () => {
  const { slug } = useParams();
  const { data: page, isLoading } = useQuery({
    queryKey: ["formPage", slug],
    queryFn: () => getFormPageBySlug(slug ?? ""),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container py-20 text-center max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Form not found</h1>
        <p className="text-muted-foreground mb-6 text-sm">This form page may have been moved or removed.</p>
        <Button asChild variant="default" className="rounded-2xl font-semibold">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <FormPageShell
      title={page.title}
      intro={page.intro}
      embedSource={page.embedFormUrl}
      seo={page.seo}
    />
  );
};

export default FormPageRoute;
