import React, { ChangeEvent, useState } from "react";

import { ReactComponent as FaUpload } from "@/assets/svgs/dashboard/upload.svg";

import "./index.css";

interface CustomFileInputProps {
  onFileSelect: (file: File | null) => void;
  className?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  onFileSelect,
  className,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
    // You can add additional logic here, like file validation or handling the file data.
  };

  return (
    <div className={`custom-file-input ${className}`}>
      <label className="custom-file-label" htmlFor="file-input">
        <FaUpload className="upload-icon" />{" "}
        {selectedFile ? selectedFile.name : "Upload csv"}
      </label>
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CustomFileInput;
