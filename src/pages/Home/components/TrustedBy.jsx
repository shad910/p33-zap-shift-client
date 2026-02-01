import Marquee from "react-fast-marquee";

import google from "../../../assets/brands/google.png";
import amazon from "../../../assets/brands/amazon.png";
import star from "../../../assets/brands/star.png";
import star_people from "../../../assets/brands/start_people.png";
import casio from "../../../assets/brands/casio.png";
import moon_star from "../../../assets/brands/moon_star.png";
import randstad from "../../../assets/brands/randstad.png";

const brands = [
  google,
  amazon,
  star,
  star_people,
  casio,
  moon_star,
  randstad,
];

const TrustedBrands = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-offset="200"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            We've helped thousands of sales teams
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            Trusted by leading brands across industries
          </p>
        </div>

        {/* Marquee */}
        <Marquee
          speed={50}
          direction="left"
          pauseOnHover={true}
          gradient={false}
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="mx-20 flex items-center"
            >
              <img
                src={brand}
                alt="Brand Logo"
                className="h-6 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedBrands;
