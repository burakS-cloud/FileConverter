import Link from "next/link";
const HomeContent = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <p className="text-lg mb-4">
        Upload your files and convert them to the format you want!
      </p>
      <Link
        href="/upload"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
      >
        Try it now
      </Link>
      <span className="mt-8 text-slate-400">
        Only pdf-word conversions are supported for now.
      </span>
    </section>
  );
};

export default HomeContent;
