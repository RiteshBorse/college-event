const Footer = () => {
  return (
    <footer className="bg-dark-card border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 College Event Management. All rights reserved.
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-blue-400 transition">About</a>
            <a href="#" className="hover:text-blue-400 transition">Contact</a>
            <a href="#" className="hover:text-blue-400 transition">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
