"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Sample data for categories and blog posts
const categories = [
  { id: "all", name: "All" },
  { id: "education", name: "Education" },
  { id: "environment", name: "Environment" },
  { id: "health", name: "Health" },
  { id: "community", name: "Community" },
]

const blogPosts = [
  {
    id: 1,
    title: "Supporting Local Education Initiatives",
    excerpt: "How our organization is working with local schools to improve educational outcomes.",
    category: "education",
    date: "May 15, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Environmental Conservation Efforts",
    excerpt: "Our latest project to clean up local waterways and protect wildlife habitats.",
    category: "environment",
    date: "April 22, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Community Health Workshop Success",
    excerpt: "Recap of our recent health workshop that provided free screenings to over 200 people.",
    category: "health",
    date: "March 10, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Building Stronger Communities",
    excerpt: "How our community outreach programs are fostering connections and support networks.",
    category: "community",
    date: "February 28, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "New Educational Resources Available",
    excerpt: "We've developed new resources to help students succeed in their academic pursuits.",
    category: "education",
    date: "January 15, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Volunteer Spotlight: Meet Our Team",
    excerpt: "Get to know the dedicated volunteers who make our work possible.",
    category: "community",
    date: "December 5, 2022",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts =
    activeCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <section className="py-12 bg-muted/50">
      <div className="container space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest news, stories, and insights from our work around the world.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <div className="bg-background rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg">

                <div className="p-5 space-y-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="capitalize">{post.category}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="pt-2">
                    <span className="text-sm font-medium text-primary inline-flex items-center">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
