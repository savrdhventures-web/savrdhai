import React from 'react';
import { BrandMark } from './Navigation';

export default function Footer() {
  return (
    <footer className="border-t border-[#13283d] bg-[#040911] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#6E8FA9]">
        <div className="flex items-center gap-3">
          <BrandMark />
          <span className="text-white font-bold tracking-tight">SAVRDH Intelligence Workforce</span>
        </div>

        <div>
          © 2026 Savrdh Technology. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.savrdhtechnology.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#49E3FF] transition-colors"
          >
            savrdhtechnology.com
          </a>
          <a
            href="mailto:info@savrdhtechnology.com"
            className="hover:text-[#49E3FF] transition-colors"
          >
            info@savrdhtechnology.com
          </a>
        </div>
      </div>
    </footer>
  );
}
