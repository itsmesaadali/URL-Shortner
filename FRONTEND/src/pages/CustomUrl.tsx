import { useEffect, useState } from "react";
import { CustomUrlForm } from "../components/CustomUrlForm";
import { customUrl, getUserUrls } from "../api/shortUrl.api";
import toast from "react-hot-toast";
import type { ShortUrlItem } from "../api/shortUrl.api";
import Spinner from "../components/UI/LoadingSVG";

export const CustomUrl = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [userUrls, setUserUrls] = useState<ShortUrlItem[]>([]);
  const [loadingUrls, setLoadingUrls] = useState(false);

  const handleSubmit = async (fullUrl: string, slug?: string) => {
    try {
      const response = await customUrl(fullUrl, slug);
      setShortUrl(response.data.data.short_url);
      toast.success("Custom URL created successfully!");
      fetchUserUrls(); // Refresh the list after creation
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create custom URL");
    }
  };

  const fetchUserUrls = async () => {
    try {
      setLoadingUrls(true);
      const response = await getUserUrls();
      setUserUrls(response.data.data.urls);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch URLs");
    } finally {
      setLoadingUrls(false);
    }
  };

  // Fetch user URLs on component mount
  useEffect(() => {
    fetchUserUrls();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Create URL Section */}
        <div className="card p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-[var(--primary)]">
            Create Custom Short URL
          </h1>
          <CustomUrlForm onSubmit={handleSubmit} />
          
          {shortUrl && (
            <div className="mt-4 p-4 rounded-md bg-[var(--primary-50)] border border-[var(--primary-200)]">
              <p className="text-sm text-[var(--muted)]">Your custom URL:</p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-[var(--primary)] break-all hover:underline"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>

        {/* User URLs Section */}
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Your Short URLs
          </h2>
          
          {loadingUrls ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : userUrls.length > 0 ? (
            <div className="space-y-3">
              {userUrls.map((url) => (
                <div 
                  key={url._id}
                  className="p-3 rounded-md bg-[var(--surface)] border border-[var(--muted)] hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--muted)] truncate">
                        {url.full_url}
                      </p>
                      <a
                        href={url.short_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary)] hover:underline break-all"
                      >
                        {url.short_url}
                      </a>
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      Clicks: {url.clicks}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--muted)] text-center py-4">
              You haven't created any short URLs yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};