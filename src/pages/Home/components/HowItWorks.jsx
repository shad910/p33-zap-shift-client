import { FaBoxOpen, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBoxOpen className="text-4xl text-secondary" />,
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "Offer your customers secure and reliable cash on delivery service with fast settlements.",
    icon: <FaMoneyBillWave className="text-4xl text-secondary" />,
  },
  {
    id: 3,
    title: "Delivery Hub",
    description:
      "Centralized delivery hubs ensure faster processing, better tracking, and smooth operations.",
    icon: <FaWarehouse className="text-4xl text-secondary" />,
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "Tailored logistics solutions designed specifically for SMEs and corporate businesses.",
    icon: <FaBuilding className="text-4xl text-secondary" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div
          className="text-center mb-12"
          data-aos="fade-down"
          data-aos-offset="200"
        >
          <h2 className="text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-base text-gray-500">
            Simple, fast, and reliable delivery process
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 120}
              data-aos-offset="200"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
