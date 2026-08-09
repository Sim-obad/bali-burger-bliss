export function FriesIcon({
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
      <path d="M6 11h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z" />
      <path d="M8 11V5" />
      <path d="M11 11V4" />
      <path d="M14 11V5" />
      <path d="M17 11V4" />
    </svg>
  );
}
