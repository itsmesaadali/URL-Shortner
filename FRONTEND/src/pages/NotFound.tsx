import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="card max-w-md w-full animate-fadeIn">
        <h1 className="text-4xl font-bold mb-4 text-[var(--primary)]">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-[var(--muted)] mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}