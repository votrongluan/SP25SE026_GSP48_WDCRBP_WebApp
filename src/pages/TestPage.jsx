import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const TestPage = () => {
  const signaturePad = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);

  // Function to clear the signature pad
  const clearSignature = () => {
    signaturePad.current.clear();
    setSignatureImage(null);
  };

  // Function to save the signature as an image
  const saveSignature = () => {
    const image = signaturePad.current.toDataURL(); // Get the image data URL
    setSignatureImage(image); // Set the preview image
  };

  // Function to handle image upload to blob storage
  const uploadToBlobStorage = async (image) => {
    const blobStorageUrl = "YOUR_BLOB_STORAGE_URL";

    // Use a library like axios or fetch to upload the image
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(blobStorageUrl, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      alert("Signature uploaded successfully");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={signaturePad}
        backgroundColor="white"
        penColor="black"
        canvasProps={{ width: 500, height: 500, className: "signature-canvas" }}
      />
      <div>
        <button onClick={saveSignature}>Save Signature</button>
        <button onClick={clearSignature}>Clear</button>
      </div>
      {signatureImage && (
        <div>
          <h3>Preview Signature</h3>
          <img
            src={signatureImage}
            alt="Signature Preview"
            style={{ border: "1px solid black" }}
          />
          <button onClick={() => uploadToBlobStorage(signatureImage)}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
