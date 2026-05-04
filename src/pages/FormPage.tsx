import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormPageShell } from "@/components/forms/FormPageShell";
import { PageTitle } from "@/components/layout/PageTitle";
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
      <div className="container mx-auto max-w-lg py-20">
        <PageTitle title="Form not found" subtitle="This form page may have been moved or removed." />
        <div className="mt-10 flex justify-center">
          <Button asChild variant="default" className="rounded-2xl font-semibold">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
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
