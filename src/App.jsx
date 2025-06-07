import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import SuccessPage from "./components/SuccessPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}
