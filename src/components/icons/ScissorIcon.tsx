import { cn } from "@/lib/utils";

export const ScissorIcon = ({ isClicking }: { isClicking: boolean }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-foreground/80 drop-shadow-md"
  >
    <g
      className={cn(
        "origin-center transition-transform duration-100 ease-in-out",
        isClicking ? "rotate-[-15deg]" : "rotate-0"
      )}
    >
      <path
        d="M15 8.5L20 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.5"
        cy="11.5"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </g>
    <g
      className={cn(
        "origin-center transition-transform duration-100 ease-in-out",
        isClicking ? "rotate-[15deg]" : "rotate-0"
      )}
    >
      <path
        d="M15 14.5L20 19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </g>
  </svg>
);
