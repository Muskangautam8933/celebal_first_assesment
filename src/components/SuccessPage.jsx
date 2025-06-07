import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  // Redirect to form if no data (refresh or direct URL visit)
  if (!data) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Submission Successful!</h2>

      <div className="space-y-4 text-gray-800">
        {Object.entries(data).map(([key, value]) => {
          if (key === "password" || key === "showPassword") return null;
          return (
            <div key={key} className="flex justify-between border-b pb-2">
              <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              <span>{value}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Back to Form
      </button>
    </div>
  );
}
