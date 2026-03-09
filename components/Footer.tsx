export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-gray-800 flex items-center justify-between px-10 py-5">
      <p className="text-xs text-gray-600">© 2026 DescendUp. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="text-xs font-semibold text-gray-500 no-underline hover:text-yellow-400 tracking-wide transition-colors">Instagram</a>
        <a href="#" className="text-xs font-semibold text-gray-500 no-underline hover:text-yellow-400 tracking-wide transition-colors">LinkedIn</a>
      </div>
    </footer>
  );
}
