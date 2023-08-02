import mealplanner from "../../assets/How-To-Meal-Plan.jpg";

export default function SecondSection() {
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
        ></svg>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 flex flex-col md:flex-row">
          <div className="md:w-1/2 pb-12 md:pb-16 flex items-center p-4">
            <div className="max-w-6xl mx-auto">
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Meal planning{" "}
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl text-white mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Effortless Meal Planning: Say hello to stress-free meal
                  planning! Our app takes the guesswork out of what to eat and
                  when. You'll have delicious and nutritious meals at your
                  fingertips, ready to fuel your body for success.
                </p>
              </div>
            </div>
          </div>

     

          <div className="md:w-1/3 pb-12 md:pb-16 flex items-center">
            <div className="border-4 border-purple-600 rounded-lg overflow-hidden">
              <img
                src={mealplanner}
                alt="Body transformation"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
