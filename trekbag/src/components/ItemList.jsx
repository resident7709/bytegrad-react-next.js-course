export default function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => {
        return (
          <Item
            key={item.name}
            item={item}
          />
        );
      })}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li className='item'>
      <label>
        <input type='checkbox' />
        {item.name}
      </label>
      <button>❌</button>
    </li>
  );
}
