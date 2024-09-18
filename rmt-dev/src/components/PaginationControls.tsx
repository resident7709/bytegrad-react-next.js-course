import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

type PaginationControlsProps = {
  currentPage: number;
  totalNumberOfPages: number;
  onClick: (direction: 'next' | 'previous') => void;
};

type PaginationButtonProps = {
  direction: 'next' | 'previous';
  currentPage: number;
  onClick: () => void;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className='pagination'>
      {currentPage > 1 && (
        <PaginationButton
          direction='previous'
          currentPage={currentPage}
          onClick={() => onClick('previous')}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction='next'
          currentPage={currentPage}
          onClick={() => onClick('next')}
        />
      )}
    </section>
  );
}

function PaginationButton({
  onClick,
  direction,
  currentPage,
}: PaginationButtonProps) {
  return (
    <button
      onClick={e => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === 'previous' && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === 'next' && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
