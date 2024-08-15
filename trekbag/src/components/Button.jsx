export default function Button({ children, type }) {
  return (
    <button className={`btn ${type === 'secondary' ? 'btn--secondary' : ''}`}>
      {children}
    </button>
  );
}
