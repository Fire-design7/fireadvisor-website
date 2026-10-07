import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogPostMeta } from "@/lib/blog";

// Card used on the blog index and in the "related articles" block. The cover
// is decorative here (the title right next to it already names the article),
// so it gets an empty alt; the real alt text lives on the article page itself.
export function BlogCard({
  post,
  showDate = false,
  headingLevel = "h2",
}: {
  post: BlogPostMeta;
  showDate?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-slate-900">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <Image
              src="/logo-icon-light.png"
              alt=""
              width={36}
              height={53}
              className="h-14 w-auto opacity-60"
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {showDate && (
          <time className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            {post.date}
          </time>
        )}
        <Heading className={`${showDate ? "mt-2 " : ""}text-lg font-semibold text-slate-900`}>
          {post.title}
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
