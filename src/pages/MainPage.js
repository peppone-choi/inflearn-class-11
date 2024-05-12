import React from 'react';
import SearchInput from '../components/SearchInput';

const MainPage = () => {
  const [search, setSearch] = React.useState('');

  return (
    <main className="flex justify-center">
      <SearchInput search={search} setSearch={setSearch} />
    </main>
  );
};

export default MainPage;
