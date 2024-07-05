import TestimonialCard from "./TestimonialCard";

export default function TestimonialSection() {
  return (
    <section className="mt-16 border-2 border-zinc-100 p-10 bg-gray-50">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          user="Jane Smith"
          text="Highly recommended! Easy to use and fast conversion."
        />
        <TestimonialCard
          user="John Doe"
          text="I've tried many file converters, but this one is the best."
        />
        <TestimonialCard
          user="David Johnson"
          text="Highly recommended! Easy to use and fast conversion."
        />
      </div>
    </section>
  );
}
