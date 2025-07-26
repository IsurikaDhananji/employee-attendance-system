import { useEffect, useState } from "react";
import api from "../services/api";

function AdminPanel() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    // Fetch all attendance records when the component loads
    api.get("/attendance/all")
      .then((res) => {
        // Update state with the attendance data
        setRecords(res.data.data.attendance);
      })
      .catch((err) => {
        console.error("Failed to fetch attendance records:", err);
      });
  }, []);
  
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white drop-shadow-lg">
            Admin Panel
          </h1>
          <p className="text-lg text-blue-100">All Attendance Records</p>
        </div>
        
        <div className="overflow-hidden border shadow-2xl rounded-xl bg-white/10 backdrop-blur-md border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-white/20">
                  <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
                    User
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
                    Check In
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
                    Check Out
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {records.map((rec, index) => (
                  <tr 
                    key={index} 
                    className="transition-colors duration-200 hover:bg-white/5 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 transition-transform duration-200 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-110">
                          <span className="text-sm font-semibold text-white">
                            {rec.employee?.name?.charAt(0).toUpperCase() ?? "?"}
                          </span>
                        </div>
                        <span className="font-medium text-white">{rec.userEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-100 border rounded-full bg-blue-500/20 border-blue-400/30">
                        {rec.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-100 border rounded-full bg-green-500/20 border-green-400/30">
                        {rec.checkInTime || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-orange-100 border rounded-full bg-orange-500/20 border-orange-400/30">
                        {rec.checkOutTime || 'Still working'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-100">
            Total Records: <span className="font-semibold text-white">{records.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default AdminPanel;
