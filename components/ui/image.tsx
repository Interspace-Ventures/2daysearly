import { cn } from "@/lib/utils";
import { ComponentProps, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ImageProps = ComponentProps<"img"> & {
  fallbackSrc?: string;
  showLoading?: boolean;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

export default function Image({ 
  className, 
  alt, 
  src,
  fallbackSrc = "/placeholder-image.png",
  showLoading = true,
  onLoad: propsOnLoad,
  onError: propsOnError,
  ...props 
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setCurrentSrc(src);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Image Debug] Loading image: ${src}`);
    }
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setError(false);
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Image Debug] Successfully loaded: ${currentSrc}`);
    }
    propsOnLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setError(true);

    if (process.env.NODE_ENV === 'development') {
      console.error(`[Image Debug] Failed to load: ${currentSrc}`);
    }

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      console.log(`[Image Debug] Attempting fallback: ${fallbackSrc}`);
      setCurrentSrc(fallbackSrc);
    }

    propsOnError?.(e);
  };

  return (
    <div className={cn("relative", className)}>
      {showLoading && isLoading && (
        <Skeleton 
          className="absolute inset-0 bg-muted/50"
        />
      )}
      <img
        className={cn(
          "transition-opacity duration-200",
          isLoading && "opacity-0",
          !isLoading && "opacity-100",
          error && "opacity-50"
        )}
        alt={alt}
        src={currentSrc}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}