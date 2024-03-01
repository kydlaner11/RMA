import { useRef, useState } from "react";

const useSearchColumn = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return {
    handleSearch,
    handleReset,
    searchInput,
    setSearchText,
    setSearchedColumn,
    searchedColumn,
    searchText,
  };
};

export default useSearchColumn;
