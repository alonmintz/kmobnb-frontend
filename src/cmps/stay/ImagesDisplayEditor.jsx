import { useEffect, useRef, useState } from "react";
import { svgService } from "../../services/svg.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function ImagesDisplayEditor({ images, onImagesChange }) {
  const [imagesToEdit, SetImagesToEdit] = useState(images.slice(0, 5));
  const [hoveredImageIdx, setHoveredImageIdx] = useState(-1);
  const [draggedImageIdx, setDraggedImageIdx] = useState(-1);

  useEffect(() => {
    SetImagesToEdit(images.slice(0, 5));
  }, [images]);

  function onUpload(file, imageIdx) {
    const updated = [...imagesToEdit];
    updated[imageIdx] = { blobUrl: URL.createObjectURL(file), file };
    onImagesChange(updated);
  }

  function onRemoveImage(imageIdx) {
    console.log("onRemoveImage");

    const updated = [...imagesToEdit];
    updated[imageIdx] = null;
    onImagesChange(updated);
  }

  function handleDragStart(imageIdx) {
    setDraggedImageIdx(imageIdx);
  }

  function handleDrop(targetIdx) {
    if (draggedImageIdx === -1 || draggedImageIdx === targetIdx) return;

    const updated = [...imagesToEdit];
    [updated[draggedImageIdx], updated[targetIdx]] = [
      updated[targetIdx],
      updated[draggedImageIdx],
    ];
    SetImagesToEdit(updated);
    onImagesChange(updated);
    setDraggedImageIdx(-1);
  }

  function renderImagesTemplate() {
    return imagesToEdit.map((img, idx) => (
      <div
        key={idx}
        className={`img-container img-${idx + 1} ${
          img ? "display" : "template"
        }`}
        draggable={!!img}
        onMouseEnter={() => setHoveredImageIdx(idx)}
        onMouseLeave={() => setHoveredImageIdx(-1)}
        onDrop={() => handleDrop(idx)}
        onDragStart={() => handleDragStart(idx)}
        onDragOver={(ev) => ev.preventDefault()}
      >
        {img ? (
          <ImageDisplay image={img} imageIdx={idx} />
        ) : (
          <ImageUploader onUpload={onUpload} imageIdx={idx} />
        )}
      </div>
    ));
  }

  function ImageDisplay({ image, imageIdx }) {
    function checkImageType() {
      return typeof image === "string" ? image : image.blobUrl;
    }

    return (
      <div className="image-display">
        <img
          src={checkImageType()}
          alt={`stay-img-${imageIdx}`}
          draggable={false}
        />
        {hoveredImageIdx === imageIdx && (
          <button className="remove-btn">
            <FontAwesomeIcon
              className="icon"
              icon={faTrash}
              onClick={() => onRemoveImage(imageIdx)}
            />
          </button>
        )}
      </div>
    );
  }

  function ImageUploader({ onUpload, imageIdx }) {
    const fileInputRef = useRef(null);

    function handleClick() {
      fileInputRef.current.click();
    }

    function handleFileChange(ev) {
      const file = ev.target.files[0];
      if (file) {
        console.log("Selected file:", file);
        onUpload(file, imageIdx);
      }
    }
    return (
      <div className="image-uploader" onClick={handleClick}>
        {svgService.getGenericSvg("Photo", "photo-icon")}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
    );
  }

  return <div className="images-display-editor">{renderImagesTemplate()}</div>;
}
