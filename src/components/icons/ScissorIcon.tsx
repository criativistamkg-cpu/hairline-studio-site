import { cn } from "@/lib/utils";

export const ScissorIcon = ({ isClicking }: { isClicking: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-foreground/80 drop-shadow-md"
    style={{ transform: 'rotate(-45deg)' }}
  >
    <g
      className={cn(
        "origin-[11.5px_11.5px] transition-transform duration-100 ease-in-out",
        isClicking ? "rotate-[-18deg]" : "rotate-0"
      )}
    >
      <path d="M11.5 11.5L20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.22656 16.5C5.97531 18.2487 8.52469 18.2487 10.2734 16.5C12.0222 14.7513 12.0222 12.2019 10.2734 10.4531" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.34766 14.3789C5.42332 13.4546 5.42332 11.9454 6.34766 11.0211" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g
      className={cn(
        "origin-[11.5px_11.5px] transition-transform duration-100 ease-in-out",
        isClicking ? "rotate-[18deg]" : "rotate-0"
      )}
      style={{ transform: 'scaleY(-1) translate(0, -23px)' }}
    >
      <path d="M11.5 11.5L20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.22656 16.5C5.97531 18.2487 8.52469 18.2487 10.2734 16.5C12.0222 14.7513 12.0222 12.2019 10.2734 10.4531" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.34766 14.3789C5.42332 13.4546 5.42332 11.9454 6.34766 11.0211" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);
