import axios from "axios";
import React, { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const shortUrlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create`,
        { url }
      );
      setShortUrl(data.data.short_url);
      // console.log(data.data.short_url)
    } catch (error) {
      console.error("Error creating short URl", error);
    }
  };

  const handleCopy = () => {
    if (shortUrlRef.current) {
      shortUrlRef.current.select();
      document.execCommand("Copy");
      setCopied(true);

      // rest after 1.5s

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-4">
      <div className="card w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Shorten Your Link</h2>

        <form
          className="flex flex-col sm:flex-row gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            id="url"
            value={url}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setUrl(e.currentTarget.value)
            }
            required
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 rounded-lg border border-[var(--muted)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
          />

          <button type="submit" className="btn-primary whitespace-nowrap">
            Shorten URL
          </button>
        </form>

        <p className="mt-3 text-sm text-[var(--muted)]">
          Paste any link to get a short and shareable version instantly.
        </p>

        {shortUrl && (
          <div className="mt-6 p-4 rounded-lg bg-[var(--surface)] border border-[var(--muted)] flex items-center gap-3 animate-fadeIn">
            <input
              ref={shortUrlRef}
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 bg-transparent text-[var(--text)] focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="btn-accent flex items-center gap-2"
              type="button"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
