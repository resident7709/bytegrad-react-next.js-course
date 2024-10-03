'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import Logo from './Logo';

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'All Events',
    path: '/events/all',
  },
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className='flex justify-between items-center border-b border-white/10 h-14 px-3 sm:px-9'>
      <Logo />
      <nav className='h-full'>
        <ul className='flex gap-x-6 h-full text-sm'>
          {routes.map(route => (
            <li
              key={route.path}
              className={clsx(
                ' hover:text-white flex items-center relative transition',
                {
                  'text-white': activePathname === route.path,
                  'text-white/50': activePathname !== route.path,
                },
              )}
            >
              <Link href={route.path}>{route.name}</Link>
              {activePathname === route.path && (
                <motion.div
                  layoutId='underline'
                  className='bg-accent h-1 w-full absolute bottom-0'
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
