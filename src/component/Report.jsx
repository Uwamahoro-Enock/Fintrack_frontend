import React, { useState } from "react";

const Report = () => {
  const [selectedReport, setSelectedReport] = useState("daily");
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = () => {
    // Placeholder for fetching data logic based on selectedReport
    console.log("Fetching Report for:", selectedReport);

    // Simulated report data
    const dummyData = {
      daily: "Daily report data goes here...",
      weekly: "Weekly report data goes here...",
      monthly: "Monthly report data goes here...",
    };

    setReportData(dummyData[selectedReport]);
  };

  return (
    <div className="flex justify-between space-x-6">
      {/* Left Side: Filters */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold text-blue-600">Select Report Type</h2>

        <div className="mt-4">
          <button
            onClick={() => setSelectedReport("daily")}
            className={`py-2 px-4 rounded-lg mr-2 ${
              selectedReport === "daily"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setSelectedReport("weekly")}
            className={`py-2 px-4 rounded-lg mr-2 ${
              selectedReport === "weekly"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelectedReport("monthly")}
            className={`py-2 px-4 rounded-lg ${
              selectedReport === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>

        <button
          onClick={handleGenerateReport}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
        >
          Get Report
        </button>
      </div>

      {/* Right Side: Display Report Data */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-2/3">
        <h2 className="text-xl font-bold text-blue-600">Report Results</h2>
        <div className="mt-4">
          {reportData ? (
            <p>{reportData}</p>
          ) : (
            <p>Select a report type and click "Get Report" to view data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
