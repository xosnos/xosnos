interface RichTextProps {
  text: string;
  as?: 'p' | 'span';
  className?: string;
}

/** Renders `**bold**` segments from typed content files. */
export function RichText({ text, as: Tag = 'span', className }: RichTextProps) {
  return (
    <Tag className={className}>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className="text-foreground font-semibold">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </Tag>
  );
}
