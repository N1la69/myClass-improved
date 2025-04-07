import Image from "next/image";
import CountChart from "./CountChart";

const CountChartContainer = async () => {
  const res = await fetch("http://localhost:5000/user/student/sexCount", {
    cache: "no-store",
  });
  const { boys, girls } = await res.json();

  const total = boys + girls;
  const boysPercent = total ? Math.round((boys / total) * 100) : 0;
  const girlsPercent = total ? Math.round((girls / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">Boys ({boysPercent}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">Girls ({girlsPercent}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
