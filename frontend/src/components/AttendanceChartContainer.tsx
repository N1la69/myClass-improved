import Image from "next/image";
import AttendanceChart from "./AttendanceChart";

const AttendanceChartContainer = async () => {
  const res = await fetch(
    "http://localhost:5000/user/student/weekly-attendance",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
