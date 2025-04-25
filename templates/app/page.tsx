import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import BlogSection from "@/components/blog-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
