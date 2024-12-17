import React, { useState, useEffect } from "react";

const Table = ({ data, getPaginatedData, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [sortedData, setSortedData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    let filtered = data.filter((row) => {
      return Object.keys(filters).every((key) => {
        const value = row[key];
        const filter = filters[key];
        if (!filter || filter.value === "") return true;

        switch (filter.type) {
          case "greater":
            return value > filter.value;
          case "less":
            return value < filter.value;
          case "equals":
            return value === filter.value;
          case "includes":
            return String(value).includes(filter.value);
          default:
            return true;
        }
      });
    });
    console.log("filtered: ", filtered);
    setFilteredData(filtered);
  }, [data, filters]);

  useEffect(() => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortConfig.key) {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key] > b[sortConfig.key]
            ? 1
            : -1
          : a[sortConfig.key] < b[sortConfig.key]
          ? 1
          : -1;
      }
      return 0;
    });
    setSortedData(sortedData);
  }, [sortConfig, filteredData]);

  useEffect(() => {
    const paginatedData = getPaginatedData(sortedData, currentPage);

    setPaginatedData(paginatedData);
  }, [currentPage, sortedData]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleFilterChange = (key, type, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: { type, value },
    }));
    setCurrentPage(1);
  };

  console.log("filters: ", filters);

  console.log(paginatedData);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>
                <div
                  onClick={() => handleSort(key)}
                  style={{ cursor: "pointer" }}
                >
                  {key}{" "}
                  {sortConfig.key === key
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Equals"
                    onChange={(e) =>
                      handleFilterChange(key, "equals", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Includes"
                    onChange={(e) =>
                      handleFilterChange(key, "includes", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Greater"
                    onChange={(e) =>
                      handleFilterChange(key, "greater", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Less"
                    onChange={(e) =>
                      handleFilterChange(key, "less", e.target.value)
                    }
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Prev
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(sortedData.length / rowsPerPage))
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
