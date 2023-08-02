import { Link } from "react-router-dom";
import transformation from "../../assets/transformation.jpg";

export default function FirstAnnouncement() {
  return (
    <section className="relative">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="20%"
              y1="0%"
              x2="20%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
            <circle cx="100" cy="100" r="50" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* FirstAnnouncement content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 "
              data-aos="zoom-y-out"
            >
              Make your body{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-teal-400">
                wonderful
              </span>
            </h1>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-orchid-800">
                Fit-Meal Planner
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-white mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Are you ready to transform your body and embrace a healthier
                lifestyle? Look no further! Our Fit Meal Planner is here to
                revolutionize the way you approach meal planning and fitness.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <button
                  type="submit"
                  className="text-white text-lg w-28 ml-4 bg-purple-600 hover:bg-purple-700 mt-4 py-2 rounded-2xl font-bold mb-2"
                >
                  <Link to="/" className="block w-full h-full">
                    Free trial
                  </Link>
                </button>
                <button
                  type="submit"
                  className="text-white block hover:bg-gray-400 mr-2 w-28 bg-gray-500 text-white-800 mt-4 py-2 rounded-2xl font-bold mb-2"
                >
                  <Link to="/" className="block w-full h-full">
                    Home
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <img
            src={transformation}
            alt="Body transformation"
            className="w-full h-auto rounded-lg shadow-xl relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
