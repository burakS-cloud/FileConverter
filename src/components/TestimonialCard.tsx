export default function TestimonialCard({
  user,
  text,
}: {
  user: string;
  text: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <p className="text-lg mb-4 text-gray-700 italic">“{text}”</p>
      <p className="text-gray-500 font-semibold">- {user}</p>
    </div>
  );
}
