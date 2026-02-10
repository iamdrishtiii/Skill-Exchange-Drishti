import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 px-6 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Skill Exchange
          </h3>
          <p className="text-sm leading-relaxed">
            A community-driven platform where people exchange skills, learn
            together, and grow without monetary barriers.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              <Link to="/">Explore Skills</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/requested">My Requests</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/about">FAQs</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Skill Exchange Platform. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
