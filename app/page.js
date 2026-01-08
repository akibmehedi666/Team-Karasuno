import { Suspense } from "react";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Experience />
    </Suspense>
  );
}
