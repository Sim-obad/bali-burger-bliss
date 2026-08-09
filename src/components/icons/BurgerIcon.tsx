export function BurgerIcon({
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
      {/* top bun */}
      <path d="M3 9.5c0-3.3 4-6 9-6s9 2.7 9 6" />
      <path d="M3 9.5h18" />
      {/* fillings */}
      <path d="M3.5 12.5h17" />
      <path d="M4 15.5h16" />
      {/* bottom bun */}
      <path d="M3 18.5h18a0 0 0 0 1 0 0c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2z" />
      {/* sesame */}
      <path d="M8 6.6h.01M12 5.8h.01M16 6.6h.01" />
    </svg>
  );
}
