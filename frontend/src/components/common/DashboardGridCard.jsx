import React from 'react';

/**
 * DashboardGridCard
 * Standardized outer card container for farmer dashboard grid items.
 * Ensures consistent background, border, border radius, shadow,
 * heading typography, heading position, and internal padding across all cards.
 */
export default function DashboardGridCard({
  title,
  headerRight,
  onClick,
  className = '',
  bodyClassName = '',
  children,
  footer,
}) {
  return (
    <section
      className={`bg-white rounded-2xl p-5 shadow-sm border border-[#bfcaba]/30 flex flex-col justify-between cursor-pointer card-hover hover:shadow-md hover:border-[#bfcaba]/50 transition-all duration-200 active:scale-[0.99] ${className}`}
      onClick={onClick}
    >
      <div>
        {/* Standardized Card Header: Identical visual position & typography across all grid cards */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-headline font-bold text-base md:text-lg text-onSurface m-0 leading-tight">
            {title}
          </h2>
          {headerRight && (
            <div className="shrink-0 flex items-center">
              {headerRight}
            </div>
          )}
        </div>

        {/* Card Content Area */}
        <div className={`flex flex-col ${bodyClassName}`}>
          {children}
        </div>
      </div>

      {/* Optional Card Footer: Aligned cleanly at the bottom */}
      {footer && (
        <div className="mt-auto pt-3">
          {footer}
        </div>
      )}
    </section>
  );
}
