import { useState, useEffect } from "react";
import axios from "axios";

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    await axios.post("https://footballbackend-vqs7.onrender.com/signup", {
      name,
      activity: "Football",
      createdBy: ip,
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
