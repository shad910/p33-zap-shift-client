import React, { useState } from "react";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, our posture corrector is adjustable and designed to fit a wide range of body types and ages comfortably.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Yes, consistent use can help improve posture and reduce minor back pain by encouraging correct alignment.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models include gentle vibration alerts to remind you to straighten your posture.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You will receive email notifications or alerts through your account when the product becomes available.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
              key={index}
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
