export const SubmitButton = ({ isSubmitting }: any) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`bg-[#f48024] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#e06a00] transition-all flex items-center shadow-md ${
      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isSubmitting && (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )}
    {isSubmitting ? "Saving..." : "Save Product"}
  </button>
);
