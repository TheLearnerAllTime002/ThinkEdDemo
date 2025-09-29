import React from 'react';

export const SkipLink = ({ href = "#main-content", children = "Skip to main content" }) => {
  return (
    <a 
      href={href}
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:shadow-lg"
    >
      {children}
    </a>
  );
};