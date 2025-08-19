import { memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const LoadingSpinner = memo(({ size = "md", className }: LoadingSpinnerProps) => {
  return (
    <div 
      role="status" 
      aria-label="Loading" 
      className={cn("relative", className)}
    >
      <motion.div
        className={cn(
          "border-4 border-primary/30 rounded-full",
          sizeClasses[size]
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={cn(
            "absolute top-0 left-0 border-4 border-primary rounded-full",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
