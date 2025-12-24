import React from "react";

const About = () => {
  return (
    <div className="bg-slate-100 dark:bg-gray-900 min-h-screen transition-colors">
      {/* HEADER */}
      <section className="bg-linear-to-r from-blue-600 to-emerald-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Platform
          </h1>
          <p className="text-lg text-slate-100">
            Making it easy to find, rent, and list properties
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-12">
          {/* WHO WE ARE */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              🏠 Who We Are
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We are a modern real-estate listing platform designed to help
              people easily find houses, apartments, and land for rent or sale.
              Our goal is to connect property owners and seekers through a
              simple, fast, and reliable system.
            </p>
          </div>

          {/* OUR MISSION */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              🎯 Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our mission is to simplify the real-estate experience by providing
              a trusted platform where users can discover verified listings,
              manage properties easily, and make informed decisions with
              confidence.
            </p>
          </div>

          {/* WHY USE US */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              ⭐ Why Use Our Platform?
            </h2>

            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
              <li>✔ Simple and user-friendly interface</li>
              <li>✔ Verified and well-organized listings</li>
              <li>✔ Fast posting and easy editing of properties</li>
              <li>✔ Secure user accounts and data protection</li>
              <li>✔ Accessible on all devices</li>
            </ul>
          </div>

          {/* VISION */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              🚀 Our Vision
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We envision a future where finding a home or listing a property
              takes only a few clicks. By combining modern technology with local
              market needs, we aim to become a trusted digital home for real-
              estate services.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Ready to get started?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Join us today and find your next home or list your property easily.
        </p>
        <a
          href="/"
          className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-emerald-700"
        >
          Go to Home
        </a>
      </section>
    </div>
  );
};

export default About;
