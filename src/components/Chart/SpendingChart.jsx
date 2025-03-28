import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B35EFF'];

const SpendingChart = ({ data }) => {
  const totalPerCategory = data.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
    return acc;
  }, {});

  const chartData = Object.entries(totalPerCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SpendingChart;
