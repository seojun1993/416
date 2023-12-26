import BarChart from "@/components/bar-chart";

const Cloud = () => {
  const data = [
    { label: "A", value: 25 },
    { label: "B", value: 45 },
    { label: "C", value: 60 },
    { label: "D", value: 30 },
    { label: "E", value: 10 },
  ];
  return (
    <div>
      <BarChart />
    </div>
  );
};

export default Cloud;
