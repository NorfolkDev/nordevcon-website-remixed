export function Gallery({ images }: { images: string[] }) {
  return (
    <div className="space-y-12">
      <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
        {images.map((image, i) => (
          <li key={`gallery_${i}`}>
            <div className="aspect-w-3 aspect-h-2">
              <img
                className="rounded-lg object-cover shadow-lg"
                src={image}
                alt=""
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
