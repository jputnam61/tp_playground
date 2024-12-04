import { Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BrandHeader() {
  return (
    <div className="w-full bg-card/95 backdrop-blur border-b border-border/30 px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <a 
            href="https://techbeatdaily.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
          >
            TechBeat Daily
          </a>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">Automation Testing Playground</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-primary"
          asChild
        >
          <a
            href="https://www.youtube.com/@techbeatdaily"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="h-5 w-5" />
            <span>Watch Tutorials</span>
          </a>
        </Button>
      </div>
    </div>
  );
}