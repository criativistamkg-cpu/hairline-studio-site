import { cn } from "@/lib/utils";
import Image from "next/image";

export const HairlinesLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <Image 
            src="https://i.ibb.co/rKSNmWCT/logo-thin-last-1-1.png" 
            alt="Hairline Studio Logo" 
            width={160} 
            height={40} 
            className="object-contain"
        />
    </div>
);
