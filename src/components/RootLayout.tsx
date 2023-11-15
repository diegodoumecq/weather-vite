import { HeartIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col px-4 text-white antialiased selection:bg-white selection:text-black md:px-8">
      <Outlet />
      <footer className="py-4">
        <div
          className="group flex items-center justify-center gap-1 text-neutral-600"
          aria-hidden={true}
        >
          code made with
          <HeartIcon className="h-4 w-4 group-hover:text-red-500" />
          and elbow grease
        </div>
      </footer>
    </div>
  );
}
