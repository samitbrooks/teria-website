
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className = '', width = 200, height = 60 }: LogoProps) => {
  return (
    <Link href="/" className={cn("block", className)} aria-label="TERIA Homepage">
      <Image
        src="/Logo.png"
        alt="TERIA Logo"
        width={width}
        height={height}
        priority // Good for LCP elements like a logo
      />
    </Link>
  );
};

export default Logo;
