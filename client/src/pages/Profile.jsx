import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col" action="">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="p-2 rounded-lg mt-4"
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className=" p-2 rounded mt-4"
        />

        <input
          type="text"
          placeholder="Password"
          id="password"
          defaultValue={currentUser.phone}
          className="p-2 rounded mt-4"
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg mt-4 hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
