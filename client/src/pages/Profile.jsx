import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (file) {
      // Update preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setUploading(false);
        console.error(error);
      },
      () => {
        setUploading(false);
        console.log("Upload complete");
      }
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Profile</h1>

      <form className="flex flex-col space-y-4">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            onClick={() => fileRef.current.click()}
            accept="image/*"
            src={imagePreview || "/default-avatar.png"} // Default avatar if no preview
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer border-2 border-gray-300 hover:opacity-80 transition"
          />
          {uploading && (
            <span className="text-sm text-gray-500 mt-1">Uploading...</span>
          )}
        </div>

        {/* Username Field */}
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser?.displayName || ""}
          className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500"
        />

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser?.email || ""}
          className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500"
          disabled
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="New Password"
          id="password"
          className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500"
        />

        {/* Update Button */}
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80 transition"
        >
          Update
        </button>
      </form>

      {/* Delete and Sign Out Options */}
      <div className="flex justify-between mt-4 text-sm">
        <span className="text-red-600 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-red-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}
