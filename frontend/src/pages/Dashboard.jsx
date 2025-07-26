import api from '../services/api';
import { useState } from 'react';
import AttendanceLog from './AttendanceLog';

function Dashboard() {
  const [message, setMessage] = useState('');

  const handleCheckIn = async () => {
  try {
    const res = await api.post('/attendance/checkin');
    setMessage("Check-in successful!");
  } catch (err) {
    console.error('Check-in error:', err.response?.data || err.message);
    setMessage(err.response?.data?.message || "Check-in failed.");
  }
};

const handleCheckOut = async () => {
  try {
    const res = await api.post('/attendance/checkout');
    setMessage("Check-out successful!"); // Success message
  } catch (err) {
    console.error("Check-out failed:", err.response?.data || err.message);
    setMessage(err.response?.data?.message || "Check-out failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative p-8">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-10 blur-2xl"></div>
        <div className="absolute w-24 h-24 rounded-full top-20 right-10 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 blur-2xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
              Employee Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-500">Manage your attendance with ease</p>
          </div>

          {/* Main Dashboard Card */}
          <div className="p-8 mb-8 border shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/20">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-gray-800">Attendance Management</h2>
              <p className="text-gray-600">Clock in and out to track your work hours</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:flex-row">
              <button 
                className="btn group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-blue-300 min-w-[140px]" 
                onClick={handleCheckIn}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Check In
                </span>
              </button>
              
              <button 
                className="btn group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-purple-300 min-w-[140px]" 
                onClick={handleCheckOut}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Check Out
                </span>
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className="relative">
                <div className="p-6 border border-green-200 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <div className="flex items-center justify-center">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-lg font-medium text-green-700">{message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 border shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl border-white/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Quick Access</h3>
                  <p className="text-sm text-gray-600">Track your daily attendance</p>
                </div>
              </div>
            </div>

            <div className="p-6 border shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl border-white/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Real-time Updates</h3>
                  <p className="text-sm text-gray-600">Instant attendance confirmation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer indicator */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Dashboard Active</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
      <AttendanceLog />
    </div>
  );
}

export default Dashboard;