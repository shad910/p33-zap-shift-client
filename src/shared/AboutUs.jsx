import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import {
  FaBookOpen,
  FaBullseye,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import "react-tabs/style/react-tabs.css";

const AboutUs = () => {
  return (
    <section
      data-aos="fade-up"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-5"
    >
      {/* Heading */}
      <div
        className="mb-10 text-center md:text-left"
        data-aos="fade-right"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          About Us
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto md:mx-0">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <Tabs>
        {/* Tab List */}
        <TabList className="flex flex-wrap gap-2 border-b pb-2 mb-8 justify-center md:justify-start">
          <Tab
            selectedClassName="bg-primary text-black"
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium hover:bg-base-200 transition text-sm sm:text-base"
          >
            <FaBookOpen />
            Story
          </Tab>

          <Tab
            selectedClassName="bg-primary text-black"
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium hover:bg-base-200 transition text-sm sm:text-base"
          >
            <FaBullseye />
            Mission
          </Tab>

          <Tab
            selectedClassName="bg-primary text-black"
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium hover:bg-base-200 transition text-sm sm:text-base"
          >
            <FaChartLine />
            Success
          </Tab>

          <Tab
            selectedClassName="bg-primary text-black"
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium hover:bg-base-200 transition text-sm sm:text-base"
          >
            <FaUsers />
            Team & Others
          </Tab>
        </TabList>

        {/* Story Panel */}
        <TabPanel>
          <div data-aos="fade-up" className="space-y-6 text-gray-600 leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Story</h3>
              <p className="text-sm text-gray-500">
                How we started and how we became a trusted nationwide delivery partner.
              </p>
            </div>

            <div className="space-y-4">
              <p>Our journey began with a simple yet powerful vision — to transform parcel delivery into a seamless and stress-free experience. At a time when logistics services were inconsistent and slow, we identified the need for a smarter, technology-driven solution. With a small but passionate team, we launched our operations in a limited area, focusing on quality over quantity.</p>
              <p>Every delivery was treated as a promise. We invested in route optimization, real-time tracking systems, and customer support excellence. Gradually, customer trust grew, and so did our network. What started as a local service evolved into a nationwide logistics solution.</p>
              <p>Today, we proudly handle thousands of parcels daily while maintaining the same dedication and reliability that defined our early days. Our story is built on persistence, innovation, and customer trust.</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
              <li>Founded with a customer-first vision</li>
              <li>Started with a small local team</li>
              <li>Focused on technology-driven logistics</li>
              <li>Introduced real-time parcel tracking</li>
              <li>Expanded nationwide coverage</li>
              <li>Built strong warehouse network</li>
              <li>Partnered with trusted delivery agents</li>
              <li>Maintained high delivery success rate</li>
              <li>Continuous service improvement</li>
              <li>Trusted by thousands of customers</li>
            </ul>
          </div>
        </TabPanel>

        {/* Mission Panel */}
        <TabPanel>
          <div data-aos="fade-up" className="space-y-6 text-gray-600 leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm text-gray-500">
                Delivering reliability, speed, and trust across every shipment.
              </p>
            </div>

            <div className="space-y-4">
              <p>Our mission is to simplify logistics through innovation and dedication. We aim to bridge the gap between senders and receivers by ensuring that every parcel reaches its destination safely and on time.</p>
              <p>We focus on operational excellence, transparent pricing, and advanced tracking technology. By continuously improving our infrastructure and processes, we ensure that individuals and businesses experience hassle-free shipping solutions.</p>
              <p>Sustainability and efficiency are also at the core of our mission. We aim to reduce delivery delays, optimize routes, and provide exceptional support throughout the shipping journey.</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
              <li>Fast and reliable deliveries</li>
              <li>Real-time parcel tracking</li>
              <li>Affordable pricing structure</li>
              <li>Customer-first service approach</li>
              <li>Nationwide coverage expansion</li>
              <li>Technology-driven operations</li>
              <li>Secure parcel handling</li>
              <li>Transparent communication</li>
              <li>Efficient route management</li>
              <li>Continuous innovation</li>
            </ul>
          </div>
        </TabPanel>

        {/* Success Panel */}
        <TabPanel>
          <div data-aos="fade-up" className="space-y-6 text-gray-600 leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Success</h3>
              <p className="text-sm text-gray-500">
                Milestones and achievements that define our growth.
              </p>
            </div>

            <div className="space-y-4">
              <p>Our success is measured not only by numbers but by the trust we earn every day. Over the years, we have delivered millions of parcels across cities and rural areas alike.</p>
              <p>We have built strategic partnerships with businesses, e-commerce platforms, and corporate clients. Our strong logistics network and streamlined operations allow us to maintain high on-time delivery rates.</p>
              <p>Continuous innovation, customer satisfaction, and operational discipline remain the foundation of our achievements.</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
              <li>Millions of parcels delivered</li>
              <li>High customer satisfaction rate</li>
              <li>Strong nationwide presence</li>
              <li>Corporate partnerships</li>
              <li>Efficient warehouse system</li>
              <li>Optimized logistics chain</li>
              <li>Advanced tracking solutions</li>
              <li>Low damage rate</li>
              <li>Rapid service expansion</li>
              <li>Recognized logistics provider</li>
            </ul>
          </div>
        </TabPanel>

        {/* Team Panel */}
        <TabPanel>
          <div data-aos="fade-up" className="space-y-6 text-gray-600 leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Team</h3>
              <p className="text-sm text-gray-500">
                The people behind our reliable delivery network.
              </p>
            </div>

            <div className="space-y-4">
              <p>Our team is the backbone of our organization. From logistics managers to delivery agents, every member plays a crucial role in ensuring smooth parcel movement.</p>
              <p>We foster a culture of responsibility, teamwork, and innovation. Continuous training and performance monitoring ensure that our service standards remain exceptional.</p>
              <p>Together, we strive to exceed customer expectations and set new benchmarks in the logistics industry.</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
              <li>Skilled logistics professionals</li>
              <li>Experienced delivery agents</li>
              <li>Dedicated support team</li>
              <li>24/7 customer assistance</li>
              <li>Continuous staff training</li>
              <li>Performance-driven culture</li>
              <li>Strong leadership team</li>
              <li>Technology experts</li>
              <li>Warehouse specialists</li>
              <li>Commitment to excellence</li>
            </ul>
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default AboutUs;
