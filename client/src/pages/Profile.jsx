import { useState, useRef } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: "johndoe",
    email: "john@example.com",
    password: "********",
    profilePic: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    // Here you would typically make an API call to update the user data
    setIsEditing(false);
    console.log("Updated user data:", userData);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deletion requested");
    }
  };

  const handleSignOut = () => {
    console.log("User signed out");
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-purple-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200">
                {userData.profilePic ? (
                  <img
                    src={userData.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-2xl font-bold">
                      {userData.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {isEditing && (
                <>
                  <button
                    onClick={triggerFileInput}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h2 className="mt-2 text-lg font-semibold text-purple-800">
              {userData.username}
            </h2>
          </div>

          {/* User Details Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-700">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="mt-1 text-gray-700">{userData.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="mt-1 text-gray-700">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700">
                Password
              </label>
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="mt-1 text-gray-700">{userData.password}</p>
              )}
            </div>
          </div>

          {/* Actions Section */}
          <div className="border-t border-purple-200 pt-4">
            <h2 className="text-lg font-semibold text-purple-700">UPDATE</h2>

            <div className="mt-4 space-y-3">
              {isEditing ? (
                <button
                  onClick={handleUpdate}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Edit Profile
                </button>
              )}

              <button
                onClick={handleDeleteAccount}
                className="w-full flex justify-center py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Account
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex justify-center py-2 px-4 border border-purple-600 rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
