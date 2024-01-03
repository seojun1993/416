import LoadGraphWithHook from "@/hooks/graph";

const Cloud = () => {
  const data = [
    { label: "A", value: 25 },
    { label: "B", value: 45 },
    { label: "C", value: 60 },
    { label: "D", value: 30 },
    { label: "E", value: 10 },
  ];
  return <LoadGraphWithHook />;
};

// {/* <BarChart /> */}
export default Cloud;
