export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-white rounded-full animate-spin" />

        <p className="text-gray-300 text-sm tracking-wide">
          Loading...
        </p>
      </div>
    </main>
  );
}