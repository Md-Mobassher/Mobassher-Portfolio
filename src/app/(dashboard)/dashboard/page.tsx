// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";

// File: src/app/(main)/dashboard/page.tsx
import DashboardContent from "./components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="">
      <DashboardContent />{" "}
    </div>
  );
}
