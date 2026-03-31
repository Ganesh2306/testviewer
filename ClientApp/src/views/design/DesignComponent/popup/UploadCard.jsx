import React from "react"

export const UploadCard = ({
  index,
  prefix = "body",
  formData,
  onInputChange
}) => {
  const fileKey = `${prefix.toLowerCase()}File`
  const uploadedFile = formData?.[fileKey]

  return (
    <div
      className="upload-area upload-area-solid single-upload-area"
      style={{
        width: "32%",
        boxSizing: "border-box",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px"
      }}
    >
      <div className="upload-box">
        <p>{prefix?.charAt(0).toUpperCase() + prefix?.slice(1)}</p>

        {uploadedFile && (
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt={`${prefix} preview`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginBottom: "10px",
              display: "block"
            }}
          />
        )}

        <input
          type="file"
          id={`${prefix}File-${index}`}
          name={fileKey}
          accept="image/*"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
    </div>
  )
}
