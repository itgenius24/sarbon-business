import { OfflineFallback } from "@/components/OfflineFallback";

export const metadata = {
  title: "Offline - Sarbon",
  description: "You are currently offline. Some features may not be available.",
};

export default function OfflinePage() {
  return <OfflineFallback />;
}
