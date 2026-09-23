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
      ([entry]) => {
        if (entry.isIntersecting) {
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
          <p className="font-marker text-sm tracking-wide text-foreground">
            kept close to home
          </p>
          <h2 className="mt-2 flex flex-col text-3xl uppercase leading-[0.85] tracking-[0.01em] sm:text-4xl sm:text-5xl">
            <span>Proudly</span>
            <span>Local,</span>
            <span>Whenever</span>
            <span>We can.</span>
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
