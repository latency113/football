import { useState } from "react";
import axios from "axios";

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    await axios.post("http://localhost:3000/signup", {
      name,
      activity: "Football",
    });
    setName("");
    onSignup();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <input
        type="text"
        placeholder="ชื่อของคุณ"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        ลงชื่อ
      </button>
    </form>
  );
};

export default SignupForm;
