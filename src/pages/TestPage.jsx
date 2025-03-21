import ImageUpload from "../components/Utility/ImageUpload";

export default function TestPage() {
  return (
    <div>
      <ImageUpload
        onUploadComplete={(results) => {
          console.log(results);
        }}
      />
    </div>
  );
}
