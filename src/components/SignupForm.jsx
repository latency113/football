import { useState, useEffect } from "react";
import axios from "axios";

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [localIp, setLocalIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // ดึง Public IP จาก ipify
    const fetchPublicIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching Public IP:", error);
        setError("ไม่สามารถดึง IP สาธารณะได้");
      }
    };

    // ดึง Local IP ผ่าน WebRTC
    const getLocalIP = () => {
      const peerConnection = new RTCPeerConnection({ iceServers: [] });
      peerConnection.createDataChannel("");

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
          const localIpAddress = ipRegex.exec(event.candidate.candidate);
          if (localIpAddress) {
            setLocalIp(localIpAddress[0]);
          }
        }
      };

      peerConnection.createOffer().then((offer) => {
        peerConnection.setLocalDescription(offer);
      });
    };

    fetchPublicIp();
    getLocalIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || (!ip && !localIp)) return;

    setLoading(true);
    setError("");

    try {
      await axios.post("https://footballbackend-vqs7.onrender.com/signup", {
        name,
        activity: "Football",
        createdBy: localIp || ip,
      });

      setName("");
      onSignup();
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="ชื่อของคุณ"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        disabled={loading}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={loading || (!ip && !localIp)}
      >
        {loading ? "กำลังลงชื่อ..." : "ลงชื่อ"}
      </button>
    </form>
  );
};

export default SignupForm;
