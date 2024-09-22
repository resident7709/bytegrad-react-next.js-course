import { useJobItemsContext } from '../lib/hooks';

type SortingButtonProps = {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();

  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>
      <SortingButton
        isActive={sortBy === 'relevant'}
        onClick={() => handleChangeSortBy('relevant')}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === 'recent'}
        onClick={() => handleChangeSortBy('recent')}
      >
        Recent
      </SortingButton>
    </section>
  );
}

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? 'sorting__button--active' : ''
      }`}
    >
      {children}
    </button>
  );
}
