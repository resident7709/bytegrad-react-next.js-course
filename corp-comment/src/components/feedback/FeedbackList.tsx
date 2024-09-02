import Spinner from '../Spinner';
import FeedbackItem from './FeedbackItem';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsContext } from '../../lib/hooks';

export default function FeedbackList() {
  const { isLoading, errorMessage, filteredFeedbackItems } =
    useFeedbackItemsContext();

  return (
    <ol className='feedback-list'>
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map(feedbackItem => (
        <FeedbackItem
          key={feedbackItem.id}
          feedbackItem={feedbackItem}
        />
      ))}
    </ol>
  );
}
