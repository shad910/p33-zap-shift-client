import { useEffect, useState } from "react";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";


const iconMap = {
  FaShippingFast,
  FaGlobeAsia,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
};

const OurServices = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  return (
    <section className="py-20 bg-[rgba(3,55,61,1)]">
      <div className="w-11/12 mx-auto px-4">

        {/* Section Header */}
        <div
          className="text-center mb-14"
          data-aos="fade-down"
          data-aos-offset="200"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4">
            Our Services
          </h2>
          <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-gray-400">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero
            hassle. From personal packages to business shipments — we deliver on
            time, every time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            
            const Icon = iconMap[service.icon];

            return (
              <div
                key={service.id}
                data-aos={service.animation}
                data-aos-delay={index * 100}
                data-aos-offset="200"
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl"
              >
                <div className="card-body items-center text-center hover:bg-[#CAEB66] hover:rounded-3xl">
                  <div className="mb-4">
                    {Icon && <Icon className="text-4xl text-secondary" />}
                  </div>
                  <h3 className="text-sm md:text-base lg:text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
