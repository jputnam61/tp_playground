import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 bg-card p-4 rounded-lg shadow-lg z-50",
        "border border-border/30 flex items-center gap-2",
        "animate-in fade-in slide-in-from-top-2 duration-300",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out"
      )}
      data-testid="success-toast"
    >
      <CheckCircle className="h-5 w-5 text-green-500" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}