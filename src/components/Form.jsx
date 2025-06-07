import { useState } from "react";
import { useNavigate } from "react-router-dom";

const countriesWithCities = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  UK: ["London", "Manchester", "Birmingham"]
};

export default function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First Name is required.";
    if (!formData.lastName.trim()) errs.lastName = "Last Name is required.";
    if (!formData.username.trim()) errs.username = "Username is required.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errs.email = "Valid email is required.";
    if (!formData.password.trim()) errs.password = "Password is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/)) errs.phoneNumber = "10-digit phone number required.";
    if (!formData.country) errs.country = "Country is required.";
    if (!formData.city) errs.city = "City is required.";
    if (!formData.pan.match(/^[A-Z]{5}\d{4}[A-Z]{1}$/)) errs.pan = "Invalid PAN number (e.g., ABCDE1234F).";
    if (!formData.aadhar.match(/^\d{12}$/)) errs.aadhar = "12-digit Aadhar number required.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" ? { city: "" } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Registration Form</h1>

      {[
        ["First Name", "firstName"],
        ["Last Name", "lastName"],
        ["Username", "username"],
        ["E-mail", "email"],
        ["Phone Number", "phoneNumber"],
        ["PAN Number", "pan"],
        ["Aadhar Number", "aadhar"]
      ].map(([label, name]) => (
        <div key={name} className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">{label}:</label>
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="off"
          />
          {errors[name] && <p className="mt-1 text-red-600 text-sm">{errors[name]}</p>}
        </div>
      ))}

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Password:</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          autoComplete="new-password"
        />
        <label className="mt-2 inline-flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span>Show Password</span>
        </label>
        {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Country</option>
          {Object.keys(countriesWithCities).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <p className="mt-1 text-red-600 text-sm">{errors.country}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.country}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.city ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select City</option>
          {(countriesWithCities[formData.country] || []).map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="mt-1 text-red-600 text-sm">{errors.city}</p>}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full p-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
}
