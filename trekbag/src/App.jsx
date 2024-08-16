import { useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ItemList from './components/ItemList';
import { initialItems } from './lib/constants';
import BackgroundHeading from './components/BackgroundHeading';

function App() {
  const [items, setItems] = useState(initialItems);

  const handleAddItem = newItemText => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  return (
    <>
      <BackgroundHeading />
      <main>
        <Header />
        <ItemList items={items} />
        <Sidebar handleAddItem={handleAddItem} />
      </main>
      <Footer />
    </>
  );
}

export default App;
