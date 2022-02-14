import React, { useState } from "react";
import DataTable from "react-data-table-component";
import XLSX from "xlsx";

const ReadExcel = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const createHeaderAndData = (dt) => {
    console.log("dt: ", dt);
    const csvData = dt.split("\n");
    console.log("csvData: ", csvData);

    //creating the columns title
    const headers = csvData[0].split(",");
    console.log(headers);

    //separating the actual data from the headers
    const rows = dt.slice(dt.indexOf("\n") + 1).split("\n");
    console.log(rows);

    //creating an array of objects
    const fileData = [];
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i].split(",");

      if (row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        fileData.push(obj);
      }
    }
    console.log("fileData: ", fileData);

    const titles = headers.map((c) => ({
      name: c,
      selector: (row) => row[c],
    }));

    console.log("columns: ", columns);

    setData(fileData);
    setColumns(titles);
  };

  // upload CSV file
  const handleCsvFile = async (e) => {
    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_csv(workSheet);
    createHeaderAndData(data);
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-4">Upload your excel file</h1>
      <input
        className="mt-3 mb-4 form-control"
        type="file"
        onChange={(e) => handleCsvFile(e)}
      />

      <DataTable pagination highlightOnHover columns={columns} data={data} />
    </div>
  );
};

export default ReadExcel;
