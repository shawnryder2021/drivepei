'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function VehicleGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selected, setSelected] = useState(0);
  if (!images.length)
    return (
      <div className="vdp-image">
        <div className="image-fallback">DrivePEI</div>
      </div>
    );
  return (
    <div className="gallery">
      <div className="vdp-image">
        <img src={images[selected]} alt={`${title} photo ${selected + 1}`} />
        {images.length > 1 && (
          <>
            <button
              className="gallery-prev"
              type="button"
              aria-label="Previous photo"
              onClick={() =>
                setSelected((selected - 1 + images.length) % images.length)
              }
            >
              <ChevronLeft />
            </button>
            <button
              className="gallery-next"
              type="button"
              aria-label="Next photo"
              onClick={() => setSelected((selected + 1) % images.length)}
            >
              <ChevronRight />
            </button>
            <span className="gallery-count">
              {selected + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.slice(0, 10).map((url, i) => (
            <button
              key={url}
              className={i === selected ? 'selected' : ''}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setSelected(i)}
            >
              <img src={url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
