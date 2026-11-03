
import { useState } from "react";
import API from "./config/api";

function App() {
  console.log( `${API}/api/images/upload`)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Release previous preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));

      // Reset upload status for new image
      setUploaded(false);
      setImageUrl("");
    }
  };

  const handleUpload = async () => {
    // Prevent duplicate uploads
    if (!image || loading || uploaded) {
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        // "http://localhost:3000/api/images/upload",
        `${API}/api/images/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Image upload failed");
      }

      setImageUrl(data.imageUrl);
      setUploaded(true);

    } catch (error) {
      console.log(error);
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      alert("URL copied successfully!");
    } catch (error) {
      alert("Unable to copy URL.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Image to URL Converter
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Upload your image and generate a shareable URL.
        </p>

        {/* Image Selection */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">

          <p className="text-gray-600 mb-4">
            Select an image from your device
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageInput"
          />

          <label
            htmlFor="imageInput"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Choose Image
          </label>

        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-6">

            <h2 className="font-semibold mb-3">
              Image Preview
            </h2>

            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg border"
            />

            <p className="text-sm text-gray-500 mt-2">
              Selected file: {image.name}
            </p>

          </div>
        )}

        {/* Upload Button */}
        <button
          disabled={!image || loading || uploaded}
          onClick={handleUpload}
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading
            ? "Uploading..."
            : uploaded
            ? "Image Uploaded ✓"
            : "Upload Image"}
        </button>

        {/* Generated URL */}
        {imageUrl && (
          <div className="mt-6">

            <h2 className="font-semibold mb-2">
              Generated Image URL
            </h2>

            <div className="flex gap-2">

              <input
                type="text"
                value={imageUrl}
                readOnly
                className="border rounded-lg p-2 w-full min-w-0"
              />

              <button
                onClick={handleCopy}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-blue-700 active:bg-green-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 whitespace-nowrap"
              >
                Copy
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
