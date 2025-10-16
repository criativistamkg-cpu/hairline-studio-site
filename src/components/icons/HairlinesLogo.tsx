import { cn } from "@/lib/utils";
import { Scissors } from "lucide-react";

export const HairlinesLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <Scissors className="h-6 w-6" />
        <span className="font-headline text-2xl tracking-tight">
            Hairline Studio
        </span>
    </div>
);
