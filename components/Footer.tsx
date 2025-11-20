import React from 'react';
import { Twitter, Send, Disc } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
          <span>YC365 © 2025</span>
          <a href="#" className="hover:text-slate-900 transition-colors">关于我们</a>
          <a href="#" className="hover:text-slate-900 transition-colors">文档</a>
          <a href="#" className="hover:text-slate-900 transition-colors">服务条款</a>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
            <Send className="w-5 h-5 transform -rotate-45" />
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
            <Disc className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;