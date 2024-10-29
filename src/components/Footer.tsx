import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 w-[calc(100%-16rem)] p-4 border-t bg-background/50 backdrop-blur-sm">
      <div className="flex justify-center items-center text-sm text-muted-foreground">
        <span>Made with</span>
        <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" />
        <span>by Isaac Tony Loi © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}