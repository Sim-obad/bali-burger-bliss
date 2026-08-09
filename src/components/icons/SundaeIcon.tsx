export function SundaeIcon({
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
      {/* cherry */}
      <path d="M12 3.2v1.6" />
      <circle cx="12" cy="2.6" r=".8" />
      {/* scoops */}
      <path d="M6.5 10.5a2.75 2.75 0 0 1 2.6-2.75 3 3 0 0 1 5.8 0 2.75 2.75 0 0 1 2.6 2.75z" />
      {/* glass */}
      <path d="M5.5 10.5h13l-1.7 6.2a3 3 0 0 1-2.9 2.2h-3.8a3 3 0 0 1-2.9-2.2L5.5 10.5z" />
      <path d="M12 18.9V22" />
      <path d="M9 22h6" />
    </svg>
  );
}
