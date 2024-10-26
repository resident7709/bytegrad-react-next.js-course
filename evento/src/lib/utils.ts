import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { notFound } from 'next/navigation';

import prisma from './db';

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export async function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getEvents(city: string) {
  const events = await prisma.eventoEvent.findMany({
    where: { city: city === 'all' ? undefined : capitalize(city) },
    orderBy: { date: 'asc' },
  });

  return events;
}

export async function getEvent(slug: string) {
  const event = await prisma.eventoEvent.findUnique({
    where: { slug },
  });

  if (!event) {
    return notFound();
  }

  return event;
}
