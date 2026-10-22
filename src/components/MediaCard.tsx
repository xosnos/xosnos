import Image from 'next/image';

interface MediaCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  tags?: readonly string[];
  onClick: () => void;
}

/** Clickable card shared by Projects and Education: media on top, tags, title, and subtitle below. */
export function MediaCard({
  image,
  imageAlt,
  title,
  subtitle,
  tags = [],
  onClick,
}: MediaCardProps) {
  return (
    <button
      type="button"
      className="group block h-full w-full cursor-pointer rounded-2xl bg-[color-mix(in_oklab,var(--accent)_14%,var(--card))] p-2.5 text-left text-foreground transition-[background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:bg-[color-mix(in_oklab,var(--accent)_22%,var(--card))] hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--accent)_55%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      onClick={onClick}
    >
      <span className="relative block aspect-16/10 overflow-hidden rounded-[10px] bg-background">
        <Image
          src={image}
          alt={imageAlt}
          width={600}
          height={400}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
        />
      </span>
      <span className="grid gap-3 px-3.5 pt-5 pb-3.5">
        {tags.length > 0 ? (
          <span className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-background px-2.5 py-1 font-montserrat text-xs font-bold uppercase tracking-[0.06em]"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}
        <h3 className="font-montserrat text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance">
          {title}
        </h3>
        {subtitle ? (
          <span className="line-clamp-2 leading-relaxed text-[color-mix(in_oklab,var(--foreground)_82%,var(--accent))]">
            {subtitle}
          </span>
        ) : null}
      </span>
    </button>
  );
}
