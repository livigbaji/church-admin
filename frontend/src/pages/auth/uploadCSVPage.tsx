import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadCSVPage: React.FC = () => {
  const navigate = useNavigate();
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !== "text/csv"
      ) {
        setError("Invalid file format. Please upload a CSV or Excel file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        // You can process the file content here.
        setFileContent(content);
        setError(null); // Clear any previous error messages.
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];

    if (file) {
      if (
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !== "text/csv"
      ) {
        setError("Invalid file format. Please upload a CSV or Excel file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        // You can process the dropped file content here.
        setFileContent(content);
        setError(null); // Clear any previous error messages.
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <section className="p-4 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Upload CSV or Excel File
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Select a file or drag and drop it here.
        </p>

        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileUpload}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <div
          className="drag-drop-area w-full p-6 border border-dashed border-gray-300 rounded-md text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          Drag and drop a CSV or Excel file here, or click to select a file.
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        {fileContent && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">File Content:</h2>
            <pre className="p-2 bg-gray-200 rounded-md mt-2">{fileContent}</pre>
          </div>
        )}

        <button
        className="bg-[#132033] text-white h-10 w-full mt-6 rounded-md "
        onClick={() => navigate("/enter-password")}
        >
        CONTINUE
        </button>

      </section>
    </div>
  );
};

export default UploadCSVPage;
