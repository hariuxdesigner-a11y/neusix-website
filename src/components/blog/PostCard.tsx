import Link from "next/link";
import { MediaPoster } from "@/components/media/MediaPoster";
import { ArrowChip } from "@/components/ui/Icon";
import { formatDate, postHref, tagLabel, type BlogPost } from "@/content/resources";

function Meta({ post, light = false }: { post: BlogPost; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-[13px] ${light ? "text-paper/80" : "text-slate"}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{post.readTime}</span>
    </p>
  );
}

export function TagPill({ tag, light = false }: { tag: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] ${light ? "text-lilac-soft" : "text-brand"}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-orange" />
      {tagLabel(tag)}
    </span>
  );
}

/** Standard article card: poster, category, title, excerpt, date and read time. */
export function PostCard({ post, headingLevel = 3, excerpt = true }: { post: BlogPost; headingLevel?: 2 | 3; excerpt?: boolean }) {
  const H = `h${headingLevel}` as const;
  return (
    <Link href={postHref(post)} className="group flex h-full flex-col overflow-hidden rounded-card border border-ink/10 bg-paper transition-[border-color,box-shadow] duration-300 hover:border-navy/40 hover:shadow-[0_18px_40px_-24px_rgba(15,15,31,.35)]">
      <MediaPoster id={post.image} className="aspect-[16/10]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
      <div className="flex flex-1 flex-col p-6">
        <TagPill tag={post.tag} />
        <H className="mt-4 text-[1.15rem] font-medium leading-snug text-ink transition-colors group-hover:text-brand">{post.title}</H>
        {excerpt && <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-body">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <Meta post={post} />
          <ArrowChip className="size-9" />
        </div>
      </div>
    </Link>
  );
}

/** Large featured card used at the top of the blog index. */
export function FeaturedPostCard({ post, headingLevel = 2 }: { post: BlogPost; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <Link href={postHref(post)} className="group grid overflow-hidden rounded-[24px] border border-ink/10 bg-paper transition-[border-color,box-shadow] duration-300 hover:border-navy/40 hover:shadow-[0_24px_60px_-30px_rgba(15,15,31,.4)] lg:grid-cols-[1.15fr_1fr]">
      <MediaPoster id={post.image} priority className="aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" sizes="(min-width: 1024px) 55vw, 92vw" />
      <div className="flex flex-col justify-center p-[clamp(24px,4vw,56px)]">
        <p className="eyebrow text-slate">Featured article</p>
        <div className="mt-5">
          <TagPill tag={post.tag} />
        </div>
        <H className="t-h3 mt-4 text-ink transition-colors group-hover:text-brand">{post.title}</H>
        <p className="mt-4 text-[17px] leading-relaxed text-body">{post.excerpt}</p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <Meta post={post} />
          <span className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-sm font-medium text-navy">
            <span className="hidden sm:inline">Read article</span> <ArrowChip />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Compact row (sidebar / menus). */
export function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link href={postHref(post)} className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-mist">
      <MediaPoster id={post.image} className="aspect-square w-20 shrink-0 rounded-lg" sizes="80px" />
      <span className="min-w-0">
        <TagPill tag={post.tag} />
        <span className="mt-1.5 block text-[15px] font-medium leading-snug text-ink group-hover:text-brand">{post.title}</span>
      </span>
    </Link>
  );
}
