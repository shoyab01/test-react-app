import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";

function App() {
  const data = [
    { id: 1, name: "Alice", age: 25, score: 85 },
    { id: 2, name: "Bob", age: 30, score: 90 },
    { id: 3, name: "Charlie", age: 22, score: 70 },
    { id: 4, name: "David", age: 28, score: 95 },
    { id: 5, name: "Eve", age: 35, score: 60 },
    { id: 6, name: "Frank", age: 27, score: 80 },
    { id: 7, name: "Grace", age: 24, score: 75 },
    { id: 8, name: "Hannah", age: 29, score: 88 },
    { id: 9, name: "Isaac", age: 32, score: 78 },
    { id: 10, name: "Jack", age: 21, score: 82 },
    { id: 11, name: "Kelly", age: 26, score: 72 },
    { id: 12, name: "Leo", age: 31, score: 65 },
    { id: 13, name: "Mia", age: 23, score: 91 },
    { id: 14, name: "Nathan", age: 33, score: 68 },
    { id: 15, name: "Olivia", age: 28, score: 84 },
    { id: 16, name: "Paul", age: 25, score: 77 },
    { id: 17, name: "Quinn", age: 30, score: 69 },
    { id: 18, name: "Rachel", age: 27, score: 73 },
    { id: 19, name: "Steve", age: 22, score: 86 },
    { id: 20, name: "Tom", age: 29, score: 79 },
  ];

  const rowsPerPage = 5;
  const getPaginatedData = (data, currentPage) => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return data.slice(startIdx, endIdx);
  };

  return (
    <Table
      data={data}
      getPaginatedData={getPaginatedData}
      rowsPerPage={rowsPerPage}
    />
  );
}

export default App;
