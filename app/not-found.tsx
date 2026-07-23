import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-white">404</h1>

        <h2 className="mt-6 text-3xl font-semibold text-white">
          Page not found
        </h2>

        <p className="mt-4 text-gray-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}