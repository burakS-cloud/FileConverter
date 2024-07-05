const HomeContent = () => {
  return (
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
  );
};

export default HomeContent;
