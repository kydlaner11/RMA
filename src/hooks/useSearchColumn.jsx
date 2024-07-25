import { useRef, useState } from "react";

const useSearchColumn = (setFilterValues) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setFilterValues((prev) => {
      const newFilterValues = { ...prev, [dataIndex]: selectedKeys[0] };
      // console.log('Updated filterValues:', newFilterValues); // Debug log
      return newFilterValues;
    });
  };

  const handleReset = (clearFilters) => {
    setSearchText("");
    setFilterValues({});
    clearFilters();
    // await apiTable();
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
