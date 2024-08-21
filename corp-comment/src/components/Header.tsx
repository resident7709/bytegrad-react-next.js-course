import Logo from './Logo';
import Pattern from './Pattern';
import PageHeading from './PageHeading';
import FeedbackForm from './FeedbackForm';

export default function Header() {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
}
