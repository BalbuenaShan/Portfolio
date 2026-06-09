import { ImageGallery } from "@/components/ui/image-gallery";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full bg-[#5F46E7] py-20 text-white dark:bg-[#2a1556]"
    >
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-center text-4xl font-bold md:text-5xl">
          Where creativity becomes visual craft
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/80 dark:text-white/85">
          Graphic Designs
        </p>
      </div>
      <ImageGallery />
    </section>
  );
}
