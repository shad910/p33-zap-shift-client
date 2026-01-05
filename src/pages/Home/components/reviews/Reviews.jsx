import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import customer from "../../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    id: "1",
    userName: "John Doe",
    review: "Smooth delivery and polite staff.",
    user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "2",
    userName: "Jane Smith",
    review: "Took a bit longer than expected, but okay overall.",
    user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: "3",
    userName: "Alex Brown",
    review: "Excellent service! Fast and secure.",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: "4",
    userName: "Lisa White",
    review: "Very responsive and professional.",
    user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: "5",
    userName: "Nina Khan",
    review: "Superb experience! Highly recommended.",
    user_photoURL: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const prevIndex = (current - 1 + reviews.length) % reviews.length;
  const nextIndex = (current + 1) % reviews.length;

  return (
    <section className="py-20 bg-base-200">
      <div className=" mx-auto px-4 text-center">
        {/* Header */}
        <img
          src={customer}
          alt="customers"
          className="mx-auto mb-4"
          data-aos="fade-down"
        />

        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          data-aos="fade-up"
        >
          What our customers are saying
        </h2>

        <p
          className="text-gray-500 max-w-xl mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Discover how our users improved posture, reduced pain, and moved with ease—effortlessly.
        </p>

        {/* Slider */}
        <div className="flex justify-center items-center gap-10">
          {/* Left */}
          <div className="hidden lg:block">
            <ReviewCard item={reviews[prevIndex]} aos="fade-right" />
          </div>

          {/* Active */}
          <ReviewCard
            item={reviews[current]}
            active
            aos="zoom-in"
          />

          {/* Right */}
          <div className="hidden lg:block">
            <ReviewCard item={reviews[nextIndex]} aos="fade-left" />
          </div>
        </div>

        {/* Controls */}
        <div
          className="flex justify-center items-center gap-4 mt-10"
          data-aos="fade-up"
        >
          <button
            onClick={() => setCurrent(prevIndex)}
            className="btn btn-circle btn-outline btn-sm"
          >
            ❮
          </button>

          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full ${idx === current ? "bg-primary" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent(nextIndex)}
            className="btn btn-circle btn-primary btn-sm text-black"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
