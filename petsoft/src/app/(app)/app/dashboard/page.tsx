import Stats from '@/components/stats';
import PetList from '@/components/pet-list';
import Branding from '@/components/branding';
import PetButton from '@/components/pet-button';
import SearchForm from '@/components/search-form';
import PetDetails from '@/components/pet-details';
import ContentBlock from '@/components/content-block';

export default async function Page() {
  return (
    <main>
      <div className='flex items-center justify-between py-8 text-white'>
        <Branding />
        <Stats />
      </div>
      <div className='grid grid-rows-[45px_300px_500px] gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-[45px_1fr]'>
        <div className='md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1'>
          <SearchForm />
        </div>
        <div className='relative md:col-span-1 md:col-start-1 md:row-span-full md:row-start-2'>
          <ContentBlock>
            <PetList />
            <div className='absolute bottom-4 right-4'>
              <PetButton actionType='add' />
            </div>
          </ContentBlock>
        </div>
        <div className='md:col-span-full md:col-start-2 md:row-span-full md:row-start-1'>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
