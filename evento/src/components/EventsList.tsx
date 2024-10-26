import EventCard from './EventCard';
import { getEvents } from '@/lib/utils';

type EventsListProps = {
  city: string;
};

export default async function EventsList({ city }: EventsListProps) {
  const events = await getEvents(city);

  return (
    <section className='flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]'>
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </section>
  );
}
