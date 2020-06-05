import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import "./styles.css";

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selecedFileUrl, setSelecedFileUrl] = useState("");

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            const fileUrl = URL.createObjectURL(file);
            setSelecedFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {selecedFileUrl ? (
                <img src={selecedFileUrl} alt="selecedFileUrl" />
            ) : (
                <p>
                    <FiUpload />
                    Imagem do estabelecimento
                </p>
            )}
        </div>
    );
};

export default Dropzone;
