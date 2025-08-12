import { useState } from "react";
import InputField from "./UI/InputField";
import Spinner from "./UI/LoadingSVG";

interface CustomUrlFormProps {
  onSubmit: (fullUrl: string, customPath?: string) => void;
}

export function CustomUrlForm({ onSubmit }: CustomUrlFormProps) {
  const [fullUrl, setFullUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullUrl) return;
    
    setLoading(true);
    try {
      await onSubmit(fullUrl, slug);
      setFullUrl("");
      setSlug("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
      <InputField
        label="Original URL"
        type="url"
        placeholder="https://example.com"
        value={fullUrl}
        onChange={setFullUrl}
        required
      />
      
      <InputField
        label="Custom Path (optional)"
        placeholder="my-custom-path"
        value={slug}
        onChange={setSlug}
      />

      <button
        type="submit"
        disabled={loading || !fullUrl}
        className="btn-primary w-full py-3 px-4 disabled:opacity-70 flex justify-center items-center gap-2"
      >
        {loading && <Spinner />}
        {loading ? "Creating..." : "Create Custom URL"}
      </button>
    </form>
  );
}