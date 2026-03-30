import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Users className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">HRFlow</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering modern businesses with intelligent HR solutions. Streamline your workforce management today.
            </p>
            <div className="flex space-x-4 mt-6">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Github className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest HR trends and product updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} HRFlow Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
