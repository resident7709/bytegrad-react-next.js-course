import Logo from '../Logo';
import Pattern from '../Pattern';
import PageHeading from '../PageHeading';
import FeedbackForm from '../feedback/FeedbackForm';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

export default function Header() {
  const addItemToList = useFeedbackItemsStore(state => state.addItemToList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
    </header>
  );
}
