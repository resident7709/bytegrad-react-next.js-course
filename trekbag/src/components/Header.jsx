import Logo from './Logo';
import Counter from './Counter';
import { useItemsStore } from '../stores/itemsStore';

export default function Header() {
  const items = useItemsStore(state => state.items);

  return (
    <header>
      <Logo />
      <Counter
        totalNumberOfItems={items.length}
        numberOfItemsPacked={items.filter(item => item.packed).length}
      />
    </header>
  );
}
