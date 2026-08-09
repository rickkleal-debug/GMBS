import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div aria-hidden className="pointer-events-none absolute right-[-12rem] top-[-14rem] h-[32rem] w-[32rem] rounded-full bg-gold/[0.055] blur-[110px]" />
        <MobileNav />
        <main className="relative flex-1 px-4 py-6 sm:px-8 sm:py-9 xl:px-12">
          <div className="mx-auto w-full max-w-[1240px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
