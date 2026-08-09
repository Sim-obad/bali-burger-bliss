export function CocktailIcon({
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
      <path d="M3.5 5.5h17L12 14 3.5 5.5z" />
      <path d="M12 14v6" />
      <path d="M8.5 20h7" />
      <path d="M15.5 5.5 20 2" />
      <circle cx="20.5" cy="1.8" r=".9" />
    </svg>
  );
}
