import React, { useState } from "react";
import axios from "axios";
import {
  Plane,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Layers,
  TrendingUp,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";

import FloatingSelect from "./components/FloatingSelect";
import FloatingInput from "./components/FloatingInput";
import Info from "./components/Info";

const App = () => {
  const [formData, setFormData] = useState({
    airline: "",
    source_city: "",
    departure_time: "",
    stops: "",
    arrival_time: "",
    destination_city: "",
    class: "",
    departure_date: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (prediction) setPrediction(null);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch {
      setError("Server not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] to-[#2a5298] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/30 overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col justify-between p-10 w-1/3 bg-[#0f1d40]/60 text-white">
          <div>
            <h1 className="text-4xl font-bold">FlySmart</h1>
            <p className="text-blue-200 text-sm">Created by Rudra</p>
          </div>

          <div className="mt-12 space-y-6">
            <Info icon={<TrendingUp size={20} />} text="95% Accuracy" />
            <Info icon={<Clock size={20} />} text="Instant Results" />
            <Info icon={<Layers size={20} />} text="Multi-Airline Model" />
          </div>
        </div>

        <div className="flex-1 p-10 text-white">
          <h2 className="text-xl font-semibold mb-6 md:hidden">
            FlySmart — Created by Rudra
          </h2>

          <div className="flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingSelect
                  label="Airline"
                  icon={<Plane size={16} />}
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                >
                  <option value="">Select Airline</option>
                  <option value="Indigo">Indigo</option>
                  <option value="AirAsia">AirAsia</option>
                  <option value="Vistara">Vistara</option>
                  <option value="GO_FIRST">GO FIRST</option>
                  <option value="SpiceJet">SpiceJet</option>
                  <option value="Air_India">Air India</option>
                </FloatingSelect>

                <FloatingSelect
                  label="From"
                  icon={<PlaneTakeoff size={16} />}
                  name="source_city"
                  value={formData.source_city}
                  onChange={handleChange}
                >
                  <option value="">Source City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </FloatingSelect>

                <FloatingSelect
                  label="To"
                  icon={<PlaneLanding size={16} />}
                  name="destination_city"
                  value={formData.destination_city}
                  onChange={handleChange}
                >
                  <option value="">Destination City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </FloatingSelect>

                <FloatingSelect
                  label="Departure Time"
                  icon={<Clock size={16} />}
                  name="departure_time"
                  value={formData.departure_time}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Early_Morning">Early Morning</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Late_Night">Late Night</option>
                </FloatingSelect>

                <FloatingSelect
                  label="Arrival Time"
                  icon={<Clock size={16} />}
                  name="arrival_time"
                  value={formData.arrival_time}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Early_Morning">Early Morning</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Late_Night">Late Night</option>
                </FloatingSelect>

                <FloatingSelect
                  label="Stops"
                  icon={<MapPin size={16} />}
                  name="stops"
                  value={formData.stops}
                  onChange={handleChange}
                >
                  <option value="">Stops</option>
                  <option value="zero">Non-stop</option>
                  <option value="one">1 Stop</option>
                  <option value="two_or_more">2+ Stops</option>
                </FloatingSelect>

                <FloatingSelect
                  label="Class"
                  icon={<CreditCard size={16} />}
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                >
                  <option value="">Class</option>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                </FloatingSelect>

                <div className="md:col-span-2">
                  <FloatingInput
                    label="Journey Date"
                    icon={<Calendar size={16} />}
                  >
                    <input
                      type="date"
                      name="departure_date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.departure_date}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#101b33] text-white p-2 rounded-lg outline-none"
                    />
                  </FloatingInput>
                </div>
              </div>

              {error && (
                <div className="text-red-300 bg-red-500/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-white/30 hover:bg-white/40 text-white font-semibold transition-all"
              >
                {loading ? "Predicting..." : "Predict Price"}
              </button>
            </form>

            {prediction && (
              <div className="bg-white/20 p-6 rounded-2xl text-center border border-white/30 backdrop-blur-xl">
                <p className="text-green-200 text-sm">Estimated Price</p>
                <h3 className="text-4xl font-bold text-green-300 mt-2">
                  ₹ {prediction.toLocaleString()}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
