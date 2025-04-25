import Image from "next/image"

export default function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-20 container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Non-profit mission"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="order-1 md:order-2 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Making a Difference Together</h1>
          <p className="text-lg text-muted-foreground">
            Our non-profit organization is dedicated to creating positive change in communities around the world.
            Through our various initiatives and projects, we strive to make a lasting impact on the lives of those in
            need.
          </p>
          <p className="text-lg text-muted-foreground">Join us in our mission to build a better future for everyone.</p>
        </div>
      </div>
    </section>
  )
}
