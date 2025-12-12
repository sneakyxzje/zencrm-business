import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { useFindLead } from "@features/shared/find-lead/model/useFindLead";
import { createPortal } from "react-dom";
import { time } from "@shared/lib/time";

export const SearchPopup = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [searchPhone, setSearchPhone] = useState<string>("");
  const { leads, isLoading, isError } = useFindLead({
    phoneNumber: searchPhone,
  });

  const handleSearch = () => {
    setSearchPhone(phoneNumber);
  };

  if (!open) return;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2
                       bg-[#2a2c2e] rounded-3xl shadow-2xl border border-[#3f4245]
                       overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative px-8 py-6 bg-[#27292b] text-[#dcdcdc]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3f4245] flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Tra cứu nâng cao</h2>
                    <p className="text-[#a8aaac] text-sm mt-1">
                      Tìm kiếm thông tin lead một cách nhanh chóng
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="w-10 h-10 rounded-full bg-[#3f4245] hover:bg-[#4a4d51] 
                           flex items-center cursor-pointer justify-center transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3f4245]/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#3f4245]/20 rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="p-8 bg-[#2a2c2e]"
            >
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#dcdcdc] mb-3">
                  Thông tin tìm kiếm
                </label>
                <div className="relative">
                  <input
                    placeholder="Nhập số điện thoại / tên / team…"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-4 pl-12 rounded-2xl border-2 border-[#3f4245] 
                             focus:border-[#f48024] focus:ring-4 focus:ring-[#f48024]/20 
                             transition-all duration-200 text-[#dcdcdc] placeholder-[#a8aaac]
                             bg-[#27292b]"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-[#a8aaac]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {isLoading && (
                <div
                  className="flex items-center justify-center gap-3 py-4 mb-6 
                               bg-[#27292b] rounded-xl border border-[#3f4245]"
                >
                  <div className="w-5 h-5 border-2 border-[#f48024] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[#f48024] font-medium">
                    Đang tìm kiếm...
                  </span>
                </div>
              )}

              {isError && (
                <div
                  className="mb-6 p-4 bg-[#3d2323] border border-[#5a3838] 
                               rounded-xl flex items-center gap-3"
                >
                  <svg
                    className="w-5 h-5 text-[#ff6b6b] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-[#ff6b6b] font-medium">{isError}</p>
                </div>
              )}

              {leads.length > 0 && (
                <div className="mb-6 space-y-4">
                  <h3 className="text-lg font-semibold text-[#dcdcdc] flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#4caf50]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Kết quả tìm kiếm ({leads.length})
                  </h3>

                  <div className="max-h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {leads.map((r, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-5 bg-[#27292b] rounded-xl 
                                 border border-[#3f4245] 
                                 hover:bg-[#2f3133] hover:shadow-md transition-all duration-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold text-[#f48024] 
                                             bg-[#f48024]/10 border border-[#f48024]/20 px-2 py-1 rounded-full"
                              >
                                NGƯỜI TẠO
                              </span>
                              <span className="text-[#dcdcdc] font-medium">
                                {r.createdByName}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold text-[#f48024] 
                                             bg-[#f48024]/10 border border-[#f48024]/20 px-2 py-1 rounded-full"
                              >
                                TEAM
                              </span>
                              <span className="text-[#dcdcdc] font-medium">
                                {r.createdByTeam}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold text-[#f48024] 
                                             bg-[#f48024]/10 border border-[#f48024]/20 px-2 py-1 rounded-full"
                              >
                                ASSIGNEE
                              </span>
                              <span className="text-[#dcdcdc] font-medium">
                                {r.assignee}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold text-[#f48024] 
                                             bg-[#f48024]/10 border border-[#f48024]/20 px-2 py-1 rounded-full"
                              >
                                TRẠNG THÁI
                              </span>
                              <span className="text-[#dcdcdc] font-medium">
                                {r.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-[#3f4245]">
                          <div className="flex items-center gap-2 text-sm text-[#a8aaac]">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Tạo lúc: {time(r.createdAt)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-6 py-3 rounded-xl border-2 border-[#3f4245] 
                           text-[#dcdcdc] cursor-pointer font-semibold hover:bg-[#27292b] 
                           transition-all duration-200"
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  disabled={!phoneNumber.trim() || isLoading}
                  className="px-8 py-3 rounded-xl bg-[#f48024] 
                           text-white font-semibold shadow-lg hover:shadow-xl 
                           hover:bg-[#e06a00] 
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-all cursor-pointer duration-200 transform hover:scale-105 active:scale-95"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang tìm...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Tìm kiếm
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #3f4245;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #4a4d51;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
