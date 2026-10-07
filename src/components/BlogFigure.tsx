import Image from "next/image";

// Used from MDX posts: <BlogFigure src="..." alt="..." width="2000" height="1414" caption="..." />
// MDX is rendered with JS expressions blocked, so width/height arrive as strings.
// width/height are required so the browser reserves the space up front and the
// page doesn't jump while the image loads (CLS). The image links to the
// full-size file because plan diagrams have fine print that is unreadable at
// column width.
export function BlogFigure({
  src,
  alt,
  width,
  height,
  caption,
  credit,
  narrow = false,
  fullSizeLabel = "Отвори в пълен размер",
}: {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  caption?: string;
  credit?: string;
  narrow?: boolean;
  fullSizeLabel?: string;
}) {
  return (
    <figure className={`not-prose my-8 ${narrow ? "mx-auto max-w-sm" : ""}`}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <Image
          src={src}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="h-auto w-full"
        />
      </a>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
          {caption}{" "}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-900 underline hover:text-amber-700"
          >
            {fullSizeLabel}
          </a>
        </figcaption>
      )}
      {credit && <p className="mt-1 text-xs text-slate-500">{credit}</p>}
    </figure>
  );
}
