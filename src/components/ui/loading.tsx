
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
