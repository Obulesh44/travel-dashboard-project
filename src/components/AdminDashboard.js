import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Define color palette for Pie Chart segments
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B565A7", "#E15D44"];

// Admin Dashboard Component
function AdminDashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect to fetch admin dashboard data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Access token missing. Redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        // Fetching admin dashboard data with Bearer token authorization
        const response = await axios.get("http://localhost:8000/api/admin-dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Flatten nested data (users with multiple travel entries)
        const flattened = response.data.flatMap(user =>
          user.travel_entries.map(entry => ({
            username: user.username,
            source: entry.start_location,
            destination: entry.end_location,
            distance: entry.distance,
            petrol_consumed: entry.petrol_consumed,
          }))
        );

        setData(flattened);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Session expired or unauthorized. Please login again.");
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Group petrol usage for Pie Chart
  const chartData = Object.values(
    data.reduce((acc, entry) => {
      if (!acc[entry.username]) {
        acc[entry.username] = { name: entry.username, value: 0 };
      }
      acc[entry.username].value += entry.petrol_consumed;
      return acc;
    }, {})
  );

  // Summary Stats
  const totalUsers = [...new Set(data.map(entry => entry.username))].length;
  const totalDistance = data.reduce((sum, entry) => sum + entry.distance, 0);
  const totalPetrol = data.reduce((sum, entry) => sum + entry.petrol_consumed, 0);

  function Card({ title, value }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Admin Dashboard</h1>
      {error && <p style={styles.error}>{error}</p>}

      {data.length === 0 ? (
        <p>No travel submissions yet.</p>
      ) : (
        <>
          {/* Summary Cards */}
         <div style={styles.summaryContainer}>
            {[ 
              { title: "Total Users", value: totalUsers },
              { title: "Total Distance", value: `${totalDistance} km` },
              { title: "Total Petrol", value: `${totalPetrol} L` }
            ].map((item, i) => (
              <Card key={i} title={item.title} value={item.value} />
            ))}
          </div>


          {/* Travel Table */}
          <div style={styles.section}>
            <h1>📄 Travel Submissions</h1>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>User</th>
                    <th style={styles.th}>Source</th>
                    <th style={styles.th}>Destination</th>
                    <th style={styles.th}>Distance (km)</th>
                    <th style={styles.th}>Petrol (L)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{entry.username}</td>
                      <td style={styles.td}>{entry.source}</td>
                      <td style={styles.td}>{entry.destination}</td>
                      <td style={styles.td}>{entry.distance}</td>
                      <td style={styles.td}>{entry.petrol_consumed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Chart */}
          <div style={styles.section}>
            <h1>📈 Petrol Usage per User</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={700} height={500}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={230}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
  summaryContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
card: {
  flex: "1",
  minWidth: "180px",
  background: "linear-gradient(135deg, #2457e2ff, #546ac2ff)",  
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.2rem",
  backdropFilter: "blur(10px)",  
  border: "1px solid rgba(255, 255, 255, 0.25)",
},
cardHover: {
  transform: "translateY(-5px)",
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
},

  section: {
    marginBottom: "3rem",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  th: {
     backgroundColor: "#007acc", 
     color: "white",             
     padding: "0.75rem",
     fontWeight: "bold",
     borderBottom: "1px solid #ddd",
     textAlign: "center", 
  },
  td: {
    border: "1px solid #ddd",
    padding: "0.5rem",
    textAlign: "center",
  },
};

export default AdminDashboard;
