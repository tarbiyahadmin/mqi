import { useEffect } from "react";

interface PageSeoProps {
  title?: string | null;
  description?: string | null;
  fallbackTitle?: string;
}

export function PageSeo({ title, description, fallbackTitle = "Milton Qur'an Institute" }: PageSeoProps) {
  useEffect(() => {
    document.title = title?.trim() || fallbackTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (description?.trim()) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description.trim());
    }
  }, [title, description, fallbackTitle]);

  return null;
}
