import { cn } from "@/lib/utils";
import Image from "next/image";

export const HairlinesLogo = ({ className }: { className?: string }) => (
    <div className={cn("relative w-40 h-10", className)}>
        <Image 
            src="https://i.ibb.co/rKSNmWCT/logo-thin-last-1-1.png" 
            alt="Hairline Studio Logo" 
            fill
            className="object-contain"
        />
    </div>
);
