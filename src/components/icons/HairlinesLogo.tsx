import { cn } from "@/lib/utils";
import Image from "next/image";

export const HairlinesLogo = ({ className }: { className?: string }) => (
    <div className={cn("relative w-40 h-10", className)}>
        <Image 
            src="https://i.ibb.co/fV5L2chB/logo-thin-last-1-1.png" 
            alt="Hairline Studio Logo" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
        />
    </div>
);
