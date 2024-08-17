import Button from './Button';

export default function ButtonGroup({
  handleMarkAllAsComplete,
  handleMarkAllAsIncomplete,
  handleResetToInitial,
  handleRemoveAllItems,
}) {
  const secondaryButtons = [
    { text: 'Mark all as complete', onClick: handleMarkAllAsComplete },
    { text: 'Mark all as incomplete', onClick: handleMarkAllAsIncomplete },
    { text: 'Reset to initial', onClick: handleResetToInitial },
    { text: 'Remove all items', onClick: handleRemoveAllItems },
  ];

  return (
    <section className='button-group'>
      {secondaryButtons.map(({ text, onClick }) => (
        <Button
          key={text}
          buttonType='secondary'
          onClick={onClick}
        >
          {text}
        </Button>
      ))}
    </section>
  );
}
