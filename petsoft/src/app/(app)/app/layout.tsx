import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import BackgroundPattern from '@/components/background-pattern';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className='mx-auto max-w-[1050px] px-4'>
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}
