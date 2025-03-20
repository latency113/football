import { useEffect, useState } from "react";
import axios from "axios";

const ParticipantList = ({ refresh }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const res = await axios.get("http://localhost:3000/participants");
      setParticipants(res.data);
    };
    fetchParticipants();
  }, [refresh]);

  return (
    <div className="mt-5">
      <h3 className="bg-[#dff0d8] text-lg text-[#3c763d] mb-3 px-3 py-1 rounded-md">
        จำนวนคนที่ลงชื่อ: {participants.length} คน
      </h3>
      <div className="overflow-hidden border-gray-200 bg-gray-100">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-sm border-b-2 border-gray-200">
            <tr>
              <th className="py-2 px-4">ชื่อ</th>
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 ? (
              participants.map((p, index) => (
                <tr
                  key={index}
                  className="border-b-2 border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{p.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  ยังไม่มีใครลงชื่อ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantList;
