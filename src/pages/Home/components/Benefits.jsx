import React from "react";
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";
import callCenterSupport from "../../../assets/call-center-support.png";

const benefitsData = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: liveTracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDelivery,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: callCenterSupport,
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl font-bold mb-3">Benefits</h2>
          <p className="text-gray-600">
            Discover the advantages of choosing our reliable delivery services.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-12">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
              data-aos="fade-up"
              data-aos-delay={index * 200}
              data-aos-offset="200"
            >
              {/* Left Side - Image */}
              <div className="shrink-0">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-48 h-48 md:w-48 md:h-48 rounded-lg shadow-lg object-cover"
                />
              </div>

              {/* Divider */}
              <div
                data-aos="zoom-in"
                className="divider md:divider-horizontal mx-0 md:mx-10"
              ></div>

              {/* Right Side - Text */}
              <div className="text-center md:text-left md:w-1/2">
                <h3 className="text-2xl font-medium mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
