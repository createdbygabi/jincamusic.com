'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function MusicSheetCard({ sheet, showDescription = true }) {
  const [imageError, setImageError] = useState(false);
  const hasImage = sheet.image && !imageError;

  return (
    <div className="group">
      <div className="aspect-[3/4] bg-black/3 mb-8 transition-all duration-700 group-hover:bg-black/8 group-hover:scale-[1.02] cursor-pointer overflow-hidden relative">
        {hasImage ? (
          <Image
            src={sheet.image}
            alt={sheet.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : null}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-serif text-black group-hover:opacity-70 transition-opacity">
            {sheet.title}
          </h3>
          {sheet.price && (
            <span className="text-sm text-black/50 font-light">
              €{sheet.price}
            </span>
          )}
        </div>
        {sheet.difficulty && (
          <p className="text-xs uppercase tracking-[0.15em] text-black/40 mb-4">
            {sheet.difficulty}
          </p>
        )}
        {showDescription && sheet.description && (
          <p className="text-sm text-black/50 leading-relaxed mb-6 font-light">
            {sheet.description}
          </p>
        )}
        {sheet.stripeLink && (
          <a 
            href={sheet.stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-2 hover:border-black transition-all duration-300"
          >
            Buy
          </a>
        )}
      </div>
    </div>
  );
}
