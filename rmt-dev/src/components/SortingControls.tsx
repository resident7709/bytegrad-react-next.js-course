import { sortBy } from '../lib/types';

type SortingControlsProps = {
  sortBy: sortBy;
  onClick: (newSortBy: sortBy) => void;
};

type SortingButtonProps = {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export default function SortingControls({
  onClick,
  sortBy,
}: SortingControlsProps) {
  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>
      <SortingButton
        isActive={sortBy === 'relevant'}
        onClick={() => onClick('relevant')}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === 'recent'}
        onClick={() => onClick('recent')}
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
