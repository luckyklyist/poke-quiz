import { useState } from "react";
import service from "../appwrite/appwriteConfig";

function CreateProfilePage() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  function createUserProfile() {
    if (!name || !country) return alert("Please fill all the fields");
    service.createPortfolio({
      country,
      name,
      points: 0,
      userId: "luckywillhaveaday@gmail.com",
    });
  }

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">Create Profile</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-gray-600 font-medium mb-2"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={createUserProfile}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateProfilePage;
