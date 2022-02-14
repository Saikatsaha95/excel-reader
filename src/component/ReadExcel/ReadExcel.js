import React, { useState } from "react";
import DataTable from "react-data-table-component";
import XLSX from "xlsx";
import "./ReadExcel.css";

const ReadExcel = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");

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
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_csv(workSheet);
    createHeaderAndData(data);
  };

  return (
    <div className="container form-area">
      <h2 className="mt-3 mb-4 fw-bold">Upload your excel file</h2>
      <input
        className="mt-3 mb-2 form-control"
        type="file"
        onChange={(e) => handleCsvFile(e)}
      />
      <input
        className="mb-4 btn btn-primary"
        type="submit"
        value="Upload"
        onClick={handleUpload}
      />

      <DataTable pagination highlightOnHover columns={columns} data={data} />
    </div>
  );
};

export default ReadExcel;
