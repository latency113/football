import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // นำเข้า SweetAlert2

const ParticipantList = ({ refresh }) => {
  const [participants, setParticipants] = useState([]);
  const [createdBy, setCreatedBy] = useState(""); // สร้างสถานะ createdBy เพื่อเก็บ IP หรือข้อมูลอื่นๆ

  useEffect(() => {
    const fetchParticipants = async () => {
      const res = await axios.get(
        "https://footballbackend-vqs7.onrender.com/participants"
      );
      setParticipants(res.data);
    };
    fetchParticipants();
  }, [refresh]);

  // ดึงข้อมูล createdBy (IP address หรือข้อมูลอื่นๆ)
  useEffect(() => {
    const fetchCreatedBy = async () => {
      // ส่งคำขอไปยัง API เพื่อดึงค่า createdBy (สามารถดึง IP หรือข้อมูลอื่นๆ ตามที่ต้องการ)
      const res = await axios.get(
        "https://footballbackend-vqs7.onrender.com/getUserIP"
      );
      setCreatedBy(res.data.createdBy);
    };
    fetchCreatedBy();
  }, []);

  const handleDelete = async (id) => {
    try {
      // ส่งคำขอลบไปยัง API
      const res = await axios.delete(
        `https://footballbackend-vqs7.onrender.com/delete/${id}`,
        {
          data: { createdBy }, // ส่ง createdBy ไป
        }
      );

      // ใช้ SweetAlert แสดงข้อความการลบสำเร็จ
      Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ!",
        text: "ข้อมูลของคุณถูกลบเรียบร้อยแล้ว",
      });

      refresh(); // รีเฟรชข้อมูลหลังจากลบ
    } catch (error) {
      // ใช้ SweetAlert แสดงข้อผิดพลาด
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถลบข้อมูลได้",
      });
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div className="mt-5">
      <h3 className="bg-[#dff0d8] text-lg text-[#3c763d] mb-3 px-3 py-1 rounded-md">
        จำนวนคนที่ลงชื่อ: {participants.length} คน
      </h3>
      <div className="overflow-hidden border-gray-200 bg-gray-100 rounded-lg shadow-sm">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-sm border-b-2 border-gray-200">
            <tr>
              <th className="py-2 px-4">ชื่อ</th>
              <th className="py-2 px-4">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 ? (
              participants.map((p) => (
                <tr
                  key={p._id}
                  className="border-b-2 border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">
                    {p.createdBy === createdBy && ( // ตรวจสอบว่า createdBy ตรงกันหรือไม่
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ยกเลิก
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-4 text-center text-gray-500">
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
