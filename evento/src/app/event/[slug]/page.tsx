import Image from 'next/image';
import { Metadata } from 'next';

import H1 from '@/components/H1';
import { getEvent } from '@/lib/server-utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);

  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  // top 100 most popular events
  return [
    {
      slug: 'comedy-extravaganza',
    },
    {
      slug: 'dj-practice-session',
    },
  ];
}

export default async function EventPage({ params }: Props) {
  const slug = params.slug;

  const event = await getEvent(slug);

  return (
    <main>
      <section className='relative flex items-center justify-center overflow-hidden py-14 md:py-20'>
        <Image
          fill
          priority
          quality={50}
          src={event.imageUrl}
          alt='Event Background Image'
          className='z-0 object-cover blur-3xl'
          sizes='(max-width: 1280px) 100vw, 1280px'
        />
        <div className='z-1 relative flex flex-col gap-6 lg:flex-row lg:gap-16'>
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className='rounded-xl border-2 border-white/50 object-cover'
          />
          <div className='flex flex-col'>
            <p className='text-white/75'>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <H1 className='mb-2 mt-1 whitespace-nowrap lg:text-5xl'>
              {event.name}
            </H1>
            <p className='whitespace-nowrap text-xl text-white/75'>
              Organized by <span className='italic'>{event.organizerName}</span>
            </p>
            <button
              className='bg-blur state-effects mt-5 w-[95vw] rounded-md border-2 border-white/10 bg-white/20
              py-2 text-lg capitalize sm:w-full lg:mt-auto state-effects'
            >
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className='text-center px-5 py-16 min-h-[75vh]'>
        <Section>
          <SectionHeader>About this event</SectionHeader>
          <SectionText>{event.description}</SectionText>
        </Section>
        <Section>
          <SectionHeader>Location</SectionHeader>
          <SectionText>{event.location}</SectionText>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className='mb-12'>{children}</section>;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h3 className='text-2xl mb-8'>{children}</h3>;
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-lg leading-8 text-white/75 max-w-4xl mx-auto'>
      {children}
    </p>
  );
}
