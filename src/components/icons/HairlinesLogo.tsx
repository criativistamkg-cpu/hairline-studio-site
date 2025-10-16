import { cn } from "@/lib/utils";

export const HairlinesLogo = ({ className }: { className?: string }) => (
    <span className={cn(
        "font-headline text-2xl tracking-tight",
        className
    )}>
        Hairline Studio
    </span>
);
