import React from "react";

const AboutUs = () => {
  return (
    <section className=" max-w-6xl mx-auto px-4 py-12 my-5">
      
      {/* Heading & Description */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          About Us
        </h2>
        <p className="text-gray-500 max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-bordered mb-6">
        <a role="tab" className="tab tab-active font-medium">
          Story
        </a>
        <a role="tab" className="tab">
          Mission
        </a>
        <a role="tab" className="tab">
          Success
        </a>
        <a role="tab" className="tab">
          Team & Others
        </a>
      </div>

      {/* Content */}
      <div className="space-y-4 text-gray-500 leading-relaxed">
        <p>
          We started with a simple promise — to make parcel delivery fast, reliable,
          and stress-free. Over the years, our commitment to real-time tracking,
          efficient logistics, and customer-first service has made us a trusted
          partner for thousands.
        </p>

        <p>
          Whether it’s a personal gift or a time-sensitive business delivery,
          we ensure it reaches its destination — on time, every time.
        </p>

        <p>
          Our growing network, dedicated team, and modern technology allow us
          to continuously improve and deliver excellence across every shipment.
        </p>
      </div>

    </section>
  );
};

export default AboutUs;
