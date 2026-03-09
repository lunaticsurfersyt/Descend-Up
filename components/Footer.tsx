export default function Footer() {
  return (
    <footer className="bg-black flex items-center justify-between px-10 py-5 font-sans">
      <p className="text-white text-xl font-bold">
        © {new Date().getFullYear()} Descendup Private Limited. All rights
        reserved.
      </p>
      <div className="flex gap-6">
        <a href="#" target="_blank" className="text-white text-xl font-bold">
          Instagram
        </a>
        <a href="#" target="_blank" className="text-white text-xl font-bold">
          X (Twitter)
        </a>
        <a href="#" target="_blank" className="text-white text-xl font-bold">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
