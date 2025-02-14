import { SidebarDashboard } from "@/app/(private)/_components/sidebar-dashboard";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarDashboard>
      <div className="h-full w-full overflow-x-hidden overflow-y-auto rounded-tl-2xl border border-neutral-200 bg-white px-2 pt-2 md:px-10 md:pt-10 md:pb-0 dark:border-neutral-700 dark:bg-neutral-900 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
        <div className="relative mx-auto h-full w-full max-w-(--breakpoint-lg)">
          {children}
        </div>
      </div>
    </SidebarDashboard>
  );
}
