// File: src/app/loading.tsx

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#FFE6F0] to-[#D6EAFF] text-black">
      <Loader2 className="animate-spin text-[#E25A6F]" size={64} />
    </div>
  );
}
