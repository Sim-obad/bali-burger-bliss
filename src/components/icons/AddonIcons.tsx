type IconProps = { className?: string; strokeWidth?: number };

function Svg({
  className,
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) {
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
      {children}
    </svg>
  );
}

export function BaconIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 7c2.5-2.4 5-2.4 7.5 0S15.5 9.4 18 7l3 2.6c-2.5 2.4-5 2.4-7.5 0S8.5 7.2 6 9.6L3 7z" />
      <path d="M3 13.5c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0l3 2.6c-2.5 2.4-5 2.4-7.5 0s-5-2.4-7.5 0L3 13.5z" />
    </Svg>
  );
}

export function JalapenoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 4.5c1.6-.4 3 .4 3.4 1.6" />
      <path d="M13 4.5v2" />
      <path d="M13 6.5c3.6 1 5.6 4.3 4.6 7.7-1 3.4-4.4 5.6-8 5.3-2.6-.2-4.4-1.6-4.9-3.4-.4-1.5.6-2.7 2-2.6 1.2.1 1.8 1 2.6 1 1.4 0 1.8-1.6 1.6-3-.2-1.6.2-3.9 2.1-5z" />
    </Svg>
  );
}

export function CheeseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10.5 12.5 5 21 10.5v6.2a1.3 1.3 0 0 1-1.3 1.3H4.3A1.3 1.3 0 0 1 3 16.7v-6.2z" />
      <path d="M3 10.5h18" />
      <path d="M8 14h.01M13 13h.01M17 15h.01" />
    </Svg>
  );
}

export function SauceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 3h4v2.5l2.6 2A3 3 0 0 1 17.8 10L17 20a1.5 1.5 0 0 1-1.5 1.4h-7A1.5 1.5 0 0 1 7 20l-.8-10a3 3 0 0 1 1.2-2.5l2.6-2V3z" />
      <path d="M7.4 12.5h9.2" />
    </Svg>
  );
}
