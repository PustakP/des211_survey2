'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface DashboardData {
  totalResponses: number;
  averageScore: number;
  schoolCounts: Record<string, number>;
  evaluationCounts: Record<string, number>;
  questionAverages: Record<string, number>;
  rawData: any[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen">Error loading data</div>;
  }

  // prepare data for charts
  const schoolData = Object.entries(data.schoolCounts).map(([name, value]) => ({
    name,
    value
  }));

  const evaluationData = Object.entries(data.evaluationCounts).map(([name, value]) => ({
    name,
    value
  }));

  const questionData = Object.entries(data.questionAverages).map(([name, value]) => ({
    name: `Q${name.slice(1)}`,
    value: Number(value.toFixed(2))
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Survey Dashboard</h1>
      
      {/* summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Responses</h2>
          <p className="text-3xl font-bold">{data.totalResponses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Average Impact Score</h2>
          <p className="text-3xl font-bold">{data.averageScore.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Most Common Evaluation</h2>
          <p className="text-3xl font-bold">
            {Object.entries(data.evaluationCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
          </p>
        </div>
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* school distribution pie chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Responses by School</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schoolData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {schoolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* graduation year distribution bar chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Responses by Graduation Year</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(
                data.rawData.reduce((acc, curr) => {
                  acc[curr.graduation_year] = (acc[curr.graduation_year] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([year, count]) => ({ year, count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* evaluation distribution bar chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Responses by Impact Level</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evaluationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* question averages line chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Average Scores by Question</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={questionData.filter(q => q.name !== 'Q8')}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* improvisational systems text responses */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Improvisational Systems and Shortcomings</h2>
        <div className="space-y-4">
          {data.rawData.map((response, index) => (
            response.q8 && (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium mb-2">Response #{index + 1}</p>
                <p className="text-gray-600 whitespace-pre-wrap">{response.q8}</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
} 