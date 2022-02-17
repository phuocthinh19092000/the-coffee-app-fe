import { useEffect, useState } from 'react';
import './CustomUploadFile.scss';
import IconUpload from '../../share/assets/vector/IconUpload.svg';

type Props = {
  selectedImage?: string;
  setIsHavePreviewFile: React.Dispatch<React.SetStateAction<boolean>>;
  fileRef: React.RefObject<HTMLInputElement>;
  onClickBrowse: React.MouseEventHandler<HTMLElement>;
};

const CustomUploadFile = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState(props.selectedImage || '');
  const [failMessage, setFailMessage] = useState(false);
  const [errorTypeMessage, setErrorTypeMessage] = useState(false);

  const countSizeInMB = (size: number) => {
    return Math.floor(size / (1024 * 1024));
  };

  const validateFileType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!selectedFile) {
      props.setIsHavePreviewFile(false);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewFile(objectUrl);
    setFailMessage(false);
    props.setIsHavePreviewFile(true);
    setErrorTypeMessage(false);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (countSizeInMB(file.size) > 10) {
      setFailMessage(true);
    } else if (!validateFileType(file)) {
      setErrorTypeMessage(true);
    } else {
      setSelectedFile(file);
    }
  };

  return (
    <div
      className="custom-upload"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <div className="custom-upload__header">Item Image</div>
      <div className="custom-upload__area">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={props.fileRef}
          className={`custom-upload__file-upload ${previewFile ? 'absolute' : 'w-full h-full'}`}
          onChange={onChangeFile}
        />
        {previewFile ? (
          <img className="w-full h-full" alt="previewFile" src={previewFile} />
        ) : (
          <>
            <img className="absolute" alt="iconUpload" src={IconUpload} onClick={props.onClickBrowse} />
            <p className="custom-upload__label">
              Use 1:1 ratio Image. <br /> 512x512 for best display.
            </p>
          </>
        )}
      </div>
      {failMessage && (
        <div className="custom-upload__error">The file being attached exceeds the size limit of 10 MB</div>
      )}
      {errorTypeMessage && <div className="custom-upload__error">We only accept PNG,JPG or JPEG files.</div>}
      <div className="custom-upload__footer">Browse or Drag item image into the area</div>
    </div>
  );
};

export default CustomUploadFile;
