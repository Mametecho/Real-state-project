import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-100 dark:bg-gray-900 transition-colors">
      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-emerald-600 to-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Home
          </h1>
          <p className="text-lg md:text-xl mb-8 text-slate-100">
            Rent or buy houses, apartments, and land easily
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/search")}
              className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-200"
            >
              🔍 Search Listings
            </button>

            {currentUser && (
              <button
                onClick={() => navigate("/create-listing")}
                className="bg-black/20 border border-white px-8 py-3 rounded-xl font-semibold hover:bg-black/30"
              >
                ➕ Create Listing
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
            Featured Listings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample card – replace with real data */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold dark:text-white">
                    Modern Apartment
                  </h3>
                  <p className="text-slate-500 dark:text-slate-300">
                    Addis Ababa
                  </p>

                  <div className="flex justify-between mt-3">
                    <span>🛏 3</span>
                    <span>🛁 2</span>
                    <span className="font-bold text-emerald-600">$1200</span>
                  </div>

                  <button
                    onClick={() => navigate("/search")}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white dark:bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl shadow dark:bg-slate-700">
              <h3 className="text-xl font-bold mb-3 dark:text-white">
                🏡 Verified Listings
              </h3>
              <p className="text-slate-500 dark:text-slate-300">
                All properties are reviewed for quality and accuracy.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow dark:bg-slate-700">
              <h3 className="text-xl font-bold mb-3 dark:text-white">
                ⚡ Fast & Easy
              </h3>
              <p className="text-slate-500 dark:text-slate-300">
                Post or find a home in minutes.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow dark:bg-slate-700">
              <h3 className="text-xl font-bold mb-3 dark:text-white">
                🔒 Secure
              </h3>
              <p className="text-slate-500 dark:text-slate-300">
                Your data and listings are protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          Ready to list your property?
        </h2>
        <button
          onClick={() => navigate("/create-listing")}
          className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-emerald-700"
        >
          ➕ Create a Listing
        </button>
      </section>
    </div>
  );
};

export default Home;
