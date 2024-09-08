export default function SearchForm({ searchText, setSearchText }) {
  return (
    <form
      action='#'
      className='search'
      onSubmit={e => e.preventDefault()}
    >
      <button type='submit'>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        required
        type='text'
        spellCheck='false'
        value={searchText}
        placeholder='Find remote developer jobs..'
        onChange={e => setSearchText(e.target.value)}
      />
    </form>
  );
}
