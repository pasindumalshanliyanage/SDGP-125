import {
  Search,
  Mic,
  Upload,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Channel4MeLanding() {
  return (
    <div className="min-h-screen bg-[#F4F6FF] text-slate-900">

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-10 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            +
          </div>
          <span className="text-xl font-bold text-blue-600">Channel4Me</span>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium">
          <a className="border-b-2 border-blue-600">Home</a>
          <a>About Us</a>
          <a>How to use</a>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Log In
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-2 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            <span className="text-blue-500">Your Path to the Right Specialist:</span>
            <br />
            Instant Doctor Match & Booking
          </h1>

          <p className="text-gray-500 max-w-md mb-8">
            Search symptoms. Get an AI-powered condition check.
            Book an appointment with the perfect specialist—all in one place.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mb-8">
            <input
              className="w-full py-4 px-6 rounded-full border shadow-sm"
              placeholder="Search your symptoms (e.g., 'severe headache')"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button className="p-2 text-blue-500">
                <Mic size={18} />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-full">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="flex gap-4">
            {[
              "Doctor Finder",
              "Online Booking",
              "E-Prescription",
              "Appointments",
              "Refund",
            ].map((item) => (
              <div
                key={item}
                className="w-20 h-20 bg-white rounded-xl border shadow-sm flex items-center justify-center text-[10px] font-bold text-blue-500 text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-end relative">
          <div className="absolute w-[450px] h-[350px] bg-blue-200 rounded-full blur-3xl opacity-50 -top-10 -right-10"></div>
          <img
            src="https://via.placeholder.com/450x350"
            alt="AI Doctor"
            className="relative z-10"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-10 py-24 space-y-32">
        <h2 className="text-blue-600 text-sm tracking-widest font-bold">
          FEATURES WE PROVIDE
        </h2>

        {/* Feature 1 */}
        <div className="grid grid-cols-2 items-center gap-20">
          <div>
            <h3 className="text-4xl font-bold mb-6">
              Book Your <span className="text-blue-600">Doctor</span> Instantly
            </h3>
            <p className="text-gray-500 mb-8">
              Get connected to the right doctor in seconds. Choose a specialist,
              view time slots, and confirm your channeling.
            </p>
            <button className="px-10 py-3 bg-blue-600 text-white rounded-lg">
              Book Now
            </button>
          </div>

          <img
            src="https://via.placeholder.com/350x280"
            className="rounded-xl"
          />
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-2 items-center gap-20">
          <div>
            <h3 className="text-4xl font-bold text-red-500 mb-4">
              Blood Report Checker 🩸
            </h3>
            <p className="text-gray-500">
              Upload your blood report and get instant health insights.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-80 bg-white border-2 border-dashed border-blue-300 rounded-3xl flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                <Upload size={28} />
              </div>
              <p className="text-xs text-blue-500 font-medium">
                Upload your files here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-5 gap-10">
          <div>
            <h4 className="font-bold text-blue-600 mb-3">Channel4Me</h4>
            <p className="text-xs text-gray-400 mb-4">
              AI-powered doctor finding and smart health management for Sri Lanka.
            </p>
            <div className="flex gap-3 text-blue-600">
              <Facebook size={16} />
              <Twitter size={16} />
              <Instagram size={16} />
              <Linkedin size={16} />
              <Youtube size={16} />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="text-xs text-gray-500 space-y-2">
              <li>Features</li>
              <li>Pricing</li>
              <li>Reviews</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Channel4Me</h4>
            <ul className="text-xs text-gray-500 space-y-2">
              <li>About</li>
              <li>Careers</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-xs text-gray-500 space-y-2">
              <li>Help center</li>
              <li>Server status</li>
              <li>Report bug</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="text-xs text-gray-500 space-y-2">
              <li>✉️ channel4meofficial.com</li>
              <li>📞 (414) 687-5892</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-[10px] text-gray-400 mt-16">
          All Rights Reserved | Terms & Conditions | Privacy Policy
        </div>
      </footer>
    </div>
  );
}
