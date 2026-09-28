import DesktopSidebar from './DesktopSidebar';
import TopNavbar from './TopNavbar';
import BottomTabs from './BottomTabs';
import { useIsMobile } from '../../hooks/useMediaQuery';
import FloatingAIButton from '../ai/FloatingAIButton';

/**
 * ResponsiveShell wraps all authenticated (farmer) screens.
 * - Mobile: content + BottomTabs
 * - Tablet/Desktop: Sidebar + TopNavbar + content
 */
export default function ResponsiveShell({ children }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex flex-col overflow-hidden bg-surface-light">
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
        <div className="shrink-0 z-50 w-full bg-white/92 backdrop-blur-md">
          <BottomTabs />
        </div>
        <FloatingAIButton />
      </div>
    );
  }

  // Tablet + Desktop
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-surface-light">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4e8d1] [&::-webkit-scrollbar-thumb]:rounded-full">
          {children}
        </main>
      </div>
      <FloatingAIButton />
    </div>
  );
}
