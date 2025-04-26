export default function AboutPage() {
  return (
    <main className="py-12 bg-white dark:bg-gray-900">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white font-cormorantGaramond">
          About Us
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none font-poppins">
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to Libertania, a platform dedicated to exploring and promoting ideas of liberty and freedom.
          </p>
        </div>
      </div>
    </main>
  )
}