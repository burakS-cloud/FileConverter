export default function Navbar() {
  return (
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
  );
}
