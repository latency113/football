import { useState } from "react";
import SignupForm from "./components/SignupForm";
import ParticipantList from "./components/ParticipantList";

const App = () => {
  const [refresh, setRefresh] = useState(0);

  // ฟังก์ชันดึงวันที่ปัจจุบันในรูปแบบที่อ่านง่าย
  const currentDate = new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5">
      <h1 className="text-2xl text-center text-gray-800">ลงชื่อเตะบอล</h1>
      <p className="text-center text-gray-500 text-sm mt-1">{currentDate}</p>
      <SignupForm onSignup={() => setRefresh((prev) => prev + 1)} />
      <ParticipantList refresh={refresh} />
    </div>
  );
};

export default App;
