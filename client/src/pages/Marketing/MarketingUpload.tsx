import { useState } from "react";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { menuByRole } from "../../components/common/sidebar/SidebarItems";
import { LeadService } from "../../api/LeadService";
import { useAuth } from "../../hooks/useAuth";

const MarketingUpload = () => {
  const [formData, setFormData] = useState({
    assignedBy: "",
    team: "",
    customerName: "",
    phoneNumber: "",
    product: "",
    salesperson: "",
    salesTeam: "",
    address: "",
  });

  const userInfo = useAuth();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(phoneNumber);
    console.log(product);
    console.log(customerName);
    e.preventDefault();
    try {
      const res = await LeadService.uploadNumber(
        customerName,
        phoneNumber,
        product,
        null,
        null
      );
      alert("Upload success");
      return res;
    } catch (err) {
      console.log(phoneNumber);

      console.log(err);
    }
  };
  const salesTeams = [
    "Inside Sales",
    "Field Sales",
    "Enterprise Sales",
    "Channel Partners",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#232629] flex">
      {/* Sidebar */}
      <Sidebar sideBarItems={menuByRole.ROLE_MARKETING} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen lg:ml-0">
        {/* Content */}
        <main className="p-6 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* Card */}
            <div className="bg-[#3b3f41]/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-[#4d4d4d]">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f48024]/80 to-[#f48024] rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#dcdcdc] mb-2">
                  Thông Tin Khách Hàng
                </h2>
                <p className="text-[#90999a] text-sm">
                  Nhập thông tin chi tiết để up số điện thoại
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                      Người lên số
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        disabled
                        value={formData.assignedBy}
                        placeholder={userInfo.user?.username}
                        className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl placeholder-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                      Thuộc team
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <select
                        value={formData.team}
                        onChange={(e) =>
                          handleInputChange("team", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition appearance-none"
                      >
                        <option value="">{userInfo.user?.teamName}</option>
                        {/* {teams.map((team, index) => (
                          <option key={index} value={team}>
                            {team}
                          </option> */}
                        {/* ))} */}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                      Tên khách hàng
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+84 901 234 567"
                        className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                    Sản phẩm
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[#90999a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={product}
                      placeholder="Tên sản phẩm"
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition appearance-none"
                    ></input>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[#90999a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                      Sale
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={formData.salesperson}
                        onChange={(e) =>
                          handleInputChange("salesperson", e.target.value)
                        }
                        placeholder="Trần Thị B"
                        className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                      Team sale
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <select
                        value={formData.salesTeam}
                        onChange={(e) =>
                          handleInputChange("salesTeam", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition appearance-none"
                      >
                        <option value="">Chọn team sale</option>
                        {salesTeams.map((team, index) => (
                          <option key={index} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                    Địa chỉ
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[#90999a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Số 123, Phố ABC, Quận XYZ, Thành phố..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-xl font-semibold text-[#dcdcdc] bg-[#2d2d2d] border border-[#4d4d4d] hover:bg-[#3b3f41] transition transform hover:scale-[1.02]"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#f48024] hover:bg-[#e06a00] transition transform hover:scale-[1.02] shadow-lg"
                  >
                    Up Số
                  </button>
                </div>
              </form>

              {/* Security Badge */}
              <div className="flex items-center justify-center mt-6 text-xs text-[#90999a]">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Dữ liệu được bảo mật 256-bit SSL
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketingUpload;
