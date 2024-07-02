import TestimonialCard from "@/components/TestimonialCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10">
      <nav className="flex items-center justify-between w-full mb-8 p-4">
        <div className="text-2xl font-bold">File Converter</div>
        <ul className="flex space-x-6">
          <li>
            <a
              className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
              href="/"
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
            </a>
          </li>
          <li>
            <a
              className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
              href="/upload"
            >
              Upload
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
            </a>
          </li>
          <li>
            <a
              className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
              href="/login"
            >
              Login
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
            </a>
          </li>
        </ul>
      </nav>
      <header className="text-3xl font-bold mb-8">
        Welcome to File Converter
      </header>
      <section className="flex flex-col items-center justify-center">
        <p className="text-lg mb-4">
          Upload your files and convert them to the format you want!
        </p>
        <a
          href="/upload"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
        >
          Try it now
        </a>
      </section>

      <section className="mt-28 border-2 border-zinc-100 p-10 bg-gray-50">
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

      <footer className="mt-48 text-center text-gray-500">
        <p>&copy; 2021 File Converter. All rights reserved.</p>
      </footer>
    </main>
  );
}
