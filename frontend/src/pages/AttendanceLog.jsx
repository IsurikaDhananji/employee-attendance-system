import { useEffect, useState } from 'react';
import api from '../services/api';

function AttendanceLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/attendance/my-attendance').then(res => setLogs(res.data.data.attendance));
  }, []);

  return (
    <div className="relative p-8 mt-12">
      {/* Decorative background elements */}
      <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-gradient-to-br from-blue-400 to-purple-500 opacity-10 blur-xl"></div>
      <div className="absolute rounded-full bottom-10 right-10 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 blur-xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
            My Attendance Logs
          </h2>
          <p className="text-lg text-gray-500">Track your daily attendance records</p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
        </div>

        {/* Main Content Card */}
        <div className="p-8 border shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/20">
          {logs.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">No attendance logs yet</h3>
              <p className="text-gray-500">Start by checking in to see your attendance history</p>
            </div>
          ) : (
            <div className="space-y-4">
              <ul className="space-y-4">
                {logs.map(log => (
                  <li key={log.id} className="group">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 transition-transform duration-200 shadow-md bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-105">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{log.date}</h3>
                            <p className="text-sm text-gray-600">Daily attendance record</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <div className="text-center">
                            <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">Check In</p>
                            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-green-700 border border-green-200 shadow-sm bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                              {log.checkInTime}
                            </span>
                          </div>
                          <div className="text-center">
                            <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">Check Out</p>
                            <span className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl border shadow-sm ${
                              log.checkOutTime 
                                ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200' 
                                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300'
                            }`}>
                              {log.checkOutTime || 'In Progress'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                              Status: 
                              <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                                log.checkOutTime 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {log.checkOutTime ? 'Completed' : 'Active'}
                              </span>
                            </span>
                            {log.checkOutTime && (
                              <span className="text-gray-600">
                                Duration: 
                                <span className="px-3 py-1 ml-2 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                  {(() => {
                                    const checkIn = new Date(`2024-01-01 ${log.checkInTime}`);
                                    const checkOut = new Date(`2024-01-01 ${log.checkOutTime}`);
                                    const diff = (checkOut - checkIn) / (1000 * 60 * 60);
                                    return `${diff.toFixed(1)}h`;
                                  })()}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Summary Statistics */}
          {logs.length > 0 && (
            <div className="pt-6 mt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{logs.length}</p>
                    <p className="text-sm font-medium text-blue-700">Total Logs</p>
                  </div>
                </div>
                <div className="p-4 border border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{logs.filter(log => !log.checkOutTime).length}</p>
                    <p className="text-sm font-medium text-purple-700">Active Sessions</p>
                  </div>
                </div>
                <div className="p-4 border border-green-200 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{logs.filter(log => log.checkOutTime).length}</p>
                    <p className="text-sm font-medium text-green-700">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer indicator */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Attendance Logs</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceLog;