import { useEffect, useRef, useState } from "react";

const paragraphs = [
  <>We believe good food starts with good people around us.</>,
  <>That&rsquo;s why we choose to work with local partners whenever possible.</>,
  <>
    From our potato buns, freshly made by <strong>Baker Street</strong> here in
    Amed, to <strong>Kura Kura</strong> beer and <strong>Santai</strong>,
    proudly brewed and made in Bali.
  </>,
  <>
    Supporting local businesses, keeping things close to home, and celebrating
    the people and products that make Bali special.
  </>,
];

export function LocalSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="local"
      ref={ref}
      className={`bg-secondary py-16 sm:py-24 ${visible ? "hero-fade" : "opacity-0"}`}
    >
      <div className="grid gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <div className="flex flex-col items-start">
          <h2 className="flex flex-col text-3xl uppercase leading-[1.15] tracking-[0.01em] sm:text-5xl sm:leading-[1.12]">
            <span>Proudly Local,</span>
            <span>Whenever we can.</span>
          </h2>
        </div>

        <div className="max-w-md space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base lg:justify-self-end">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
