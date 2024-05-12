import React from 'react';

const SearchInput = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mt-40 flex">
      <input
        type="text"
        className="w-[48em] text-center border-2 border-sky-800 rounded-l-full text-2xl p-4 font-semibold"
        placeholder="검색"
        value={search}
        onChange={handleChange}
      />
      <button type="button" className="w-48 bg-sky-800 text-white rounded-r-full text-2xl p-4 font-semibold">
        검색
      </button>
    </div>
  );
};

export default SearchInput;
