import React from "react";

const MarketingView = () => {
  const menuItems = [
    { name: "Liên hệ", icon: "📇" },
    { name: "Campaigns", icon: "📣" },
    { name: "Quản lý các page", icon: "📄" },
    { name: "Order tài nguyên", icon: "📦" },
    { name: "Chat với admin", icon: "💬" },
  ];

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2d2d2d] border-r border-[#4d4d4d] p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#dcdcdc] mb-8">Menu</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button className="w-full flex items-center space-x-3 text-[#dcdcdc] hover:text-[#f48024] transition">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-10 relative">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -left-8 w-96 h-96 bg-[#3b3f41] rounded-full mix-blend-overlay filter blur-2xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-12 right-8 w-96 h-96 bg-[#2d2f31] rounded-full mix-blend-overlay filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Page Header */}
        <header className="relative z-10 w-full max-w-6xl mb-8">
          <h1 className="text-4xl font-bold text-[#dcdcdc]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48024] to-[#ff8a00]">
              Marketing Dashboard
            </span>
          </h1>
          <p className="mt-2 text-[#90999a]">
            Overview of key marketing metrics
          </p>
        </header>

        {/* Metrics Grid */}
        <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Leads", "CTR", "ROI"].map((title) => (
            <div
              key={title}
              className="bg-[#3b3f41]/80 backdrop-blur-md border border-[#4d4d4d] rounded-2xl p-6 flex flex-col"
            >
              <h2 className="text-lg font-medium text-[#dcdcdc] mb-2">
                {title}
              </h2>
              <p className="text-3xl font-bold text-[#f48024]">--</p>
            </div>
          ))}
        </div>

        {/* Placeholder for charts */}
        <div className="relative z-10 w-full max-w-6xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#3b3f41]/80 backdrop-blur-md border border-[#4d4d4d] rounded-2xl h-64 flex items-center justify-center">
            <span className="text-[#90999a]">Chart Component</span>
          </div>
          <div className="bg-[#3b3f41]/80 backdrop-blur-md border border-[#4d4d4d] rounded-2xl h-64 flex items-center justify-center">
            <span className="text-[#90999a]">Chart Component</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingView;
