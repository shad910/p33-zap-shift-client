import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  /* Fetch FAQ data from public folder */
  useEffect(() => {
    axios
      .get("/faq.json")
      .then((res) => setFaqData(res.data))
      .catch((err) => console.error("Failed to load FAQ data:", err));
  }, []);

  return (
    <section className="py-16  px-4 md:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your
            body with ease!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 150} 
              data-aos-offset="200"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-xs sm:text-sm md:text-base font-medium">{item.question}</span>
                <span className="text-xl">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 text-xs sm:text-sm md:text-base text-gray-700 bg-gray-50">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
