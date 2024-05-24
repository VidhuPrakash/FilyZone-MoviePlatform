import NavBar from "@/components/NavBar";
import SearchResults from "@/components/SearchResults/SearchResults";
import React from "react";

const SearchPage = ({ params }: { params: { query: string } }) => {
  const query = params.query;
  return (
    <>
      <NavBar />
      <SearchResults query={query} />
    </>
  );
};

export default SearchPage;
