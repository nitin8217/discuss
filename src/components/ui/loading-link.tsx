'use client';
import Link from 'next/link';
import { useLoading } from '@/components/providers/loading-provider';
import { useRouter } from 'next/navigation';
interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export default function LoadingLink({ href, children, className }: LoadingLinkProps) {
  const { setIsLoading } = useLoading();
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(href);
      setTimeout(() => setIsLoading(false), 1200);
    }, 100);
  };
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

