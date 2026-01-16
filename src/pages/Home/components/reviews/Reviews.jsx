import React, { useState, useEffect } from "react";
import customer from "../../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  /* fetch reviews from public folder */
  useEffect(() => {
    axios
      .get("/reviews.json")
      .then((res) => {
        setReviews(res.data);
        setCurrent(Math.floor(res.data.length / 2));
      })
      .catch((err) => console.error("Failed to load reviews:", err));
  }, []);

  /* prevent render before data load */
  if (reviews.length === 0) return null;

  const prevIndex = (current - 1 + reviews.length) % reviews.length;
  const nextIndex = (current + 1) % reviews.length;

  return (
    <section className="py-20 bg-base-200">
      <div className="mx-auto px-4 text-center">
        {/* Header */}
        <img
          src={customer}
          alt="customers"
          className="mx-auto mb-4"
          data-aos="fade-down"
        />

        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
          data-aos="fade-up"
        >
          What our customers are saying
        </h2>

        <p
          className="text-xs sm:text-sm md:text-base text-gray-500 max-w-xl mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Discover how our users improved posture, reduced pain, and moved with
          ease—effortlessly.
        </p>

        {/* Slider */}
        <div className="flex justify-center items-center gap-10">
          {/* Left */}
          <div className="hidden lg:block">
            <ReviewCard item={reviews[prevIndex]} aos="fade-right" />
          </div>

          {/* Active */}
          <ReviewCard item={reviews[current]} active aos="zoom-in" />

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
