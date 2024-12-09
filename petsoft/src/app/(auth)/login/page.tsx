import Link from 'next/link';

import H1 from '@/components/h1';
import AuthForm from '@/components/auth-form';

export default function Page() {
  return (
    <main>
      <H1 className='mb-5 text-center'>Log In</H1>
      <AuthForm type='login' />
      <p className='text-zinc-500 text-sm mt-6'>
        Don&apos;t have an account?{' '}
        <Link
          href='/signup'
          className='font-medium'
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
