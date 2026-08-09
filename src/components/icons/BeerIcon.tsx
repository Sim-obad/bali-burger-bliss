export function BeerIcon({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* foam */}
      <path d="M6 8.5a2.2 2.2 0 0 1 .6-4.3 2.6 2.6 0 0 1 4.5-1.4 2.4 2.4 0 0 1 4 1.2 2.3 2.3 0 0 1 .9 4.5" />
      {/* pint glass */}
      <path d="M6 8.5h10l-.8 11.1a1.6 1.6 0 0 1-1.6 1.4H8.4a1.6 1.6 0 0 1-1.6-1.4L6 8.5z" />
      {/* handle */}
      <path d="M16.3 11h1.9a1.8 1.8 0 0 1 1.8 1.8v2.4a1.8 1.8 0 0 1-1.8 1.8h-2.3" />
      {/* bubbles */}
      <path d="M9.5 12h.01M12.5 14.5h.01" />
    </svg>
  );
}
