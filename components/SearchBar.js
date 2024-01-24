import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    router.push(`/search/${searchTerm}`); // Navigate to [search].js with searchTerm
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
