"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || ""; // Read existing query from URL
  const [search, setSearch] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams); // Clone existing params
    if (search) {
      params.set("query", search); // Update the "query" parameter
    } else {
      params.delete("query"); // Remove "query" if empty
    }
    router.push(`?${params.toString()}`); // Update the URL with new parameters
  };

  return (
    <form onSubmit={handleSearch} className={styles.search}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
