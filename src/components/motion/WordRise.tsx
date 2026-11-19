import { Fragment, type ReactNode } from "react";

/**
 * Headline whose words rise into place from a masked line, one after another (Abridge hero).
 * Pure CSS (runs on load, no JS needed); the text is real, selectable and indexed.
 * Non-string titles are rendered unchanged.
 */
export function WordRise({ children, delay = 150 }: { children: ReactNode; delay?: number }) {
  if (typeof children !== "string") return <>{children}</>;
  const words = children.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="wr" style={{ ["--i" as string]: i, ["--d" as string]: `${delay}ms` }}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
