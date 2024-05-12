import React from 'react';

const SearchInput = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex mt-40">
      <input
        type="text"
        className="w-[48em] text-center border-2 border-sky-800 rounded-l-full text-2xl p-4 font-semibold"
        placeholder="검색"
        value={search}
        onChange={handleChange}
      />
      <button type="button" className="w-48 p-4 text-2xl font-semibold text-white rounded-r-full bg-sky-800">
        검색
      </button>
    </div>
  );
};

export default SearchInput;
