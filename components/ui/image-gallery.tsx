'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const GALLERY_IMAGES = [
  { src: '/Graphic Design/Alfonsi.png', alt: 'Alfonsi graphic design piece' },
  { src: '/Graphic Design/Deegan.png', alt: 'Deegan graphic design piece' },
  { src: '/Graphic Design/Bianca.png', alt: 'Bianca graphic design piece' },
  { src: '/Graphic Design/borns.png', alt: 'Borns graphic design piece' },
  { src: '/Graphic Design/Jet (final).png', alt: 'Jet final graphic design piece' },
  { src: '/Graphic Design/BE STRONG.jpg', alt: 'Be Strong poster design' },
  { src: '/Graphic Design/Rise and Grind.jpg', alt: 'Rise and Grind poster design' },
  { src: '/Graphic Design/Zapla.png', alt: 'Zapla graphic design piece' },
  { src: '/Graphic Design/ERacing.png', alt: 'E-Racing graphic design piece' },
  { src: '/Graphic Design/ERacing2.png', alt: 'E-Racing graphic design piece 2' },
  { src: '/Graphic Design/ERacing3.png', alt: 'E-Racing graphic design piece 3' },
  { src: '/Graphic Design/Kobe.png', alt: 'Kobe graphic design piece' },
  { src: '/Graphic Design/POST.png', alt: 'Poster design' },
  { src: '/Graphic Design/UIC Layout 1.png', alt: 'UIC layout design 1' },
  { src: '/Graphic Design/UIC Layout White.png', alt: 'UIC layout design white' },
] as const;

export function ImageGallery() {
  const [activeImage, setActiveImage] = React.useState<(typeof GALLERY_IMAGES)[number] | null>(null);
  const previousOverflowRef = React.useRef("");

  React.useEffect(() => {
    if (!activeImage) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [activeImage]);

  return (
    <>
      <div className="relative flex w-full justify-center px-4 py-10">
        <div className="mx-auto w-full max-w-6xl columns-1 gap-6 sm:columns-2 lg:columns-3">
        {GALLERY_IMAGES.map((image, index) => (
          <AnimatedImage
            key={image.src}
            alt={image.alt}
            src={image.src}
            onOpen={() => setActiveImage(image)}
            className={index % 5 === 0 ? 'aspect-[4/5]' : index % 3 === 0 ? 'aspect-square' : 'aspect-[5/6]'}
          />
        ))}
      </div>
      </div>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[95vw]" onClick={(event) => event.stopPropagation()}>
            <Image
              alt={activeImage.alt}
              src={encodeURI(activeImage.src)}
              width={2400}
              height={2400}
              className="h-auto w-auto max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  className?: string;
  onOpen: () => void;
}

function AnimatedImage({ alt, src, className, onOpen }: AnimatedImageProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <button
      type="button"
      ref={ref}
      onClick={onOpen}
      className={cn(
        'relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-accent text-left shadow-lg shadow-black/10 focus:outline-none focus:ring-2 focus:ring-white/70',
        className,
      )}
      aria-label={`Open ${alt}`}
    >
      <Image
        alt={alt}
        src={encodeURI(src)}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className={cn(
          'object-cover transition-all duration-700 ease-out',
          isInView && isLoaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0',
        )}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
    </button>
  );
}
