import {
    FaShippingFast,
    FaGlobeAsia,
    FaBoxes,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt,
} from "react-icons/fa";

const services = [
    {
        id: 1,
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaShippingFast className="text-4xl text-primary" />,
        animation: "fade-up",
    },
    {
        id: 2,
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FaGlobeAsia className="text-4xl text-primary" />,
        animation: "fade-up",
    },
    {
        id: 3,
        title: "Fulfillment Solution",
        description:
            "Customized services including inventory management, online order processing, packaging, and after-sales support.",
        icon: <FaBoxes className="text-4xl text-primary" />,
        animation: "fade-up",
    },
    {
        id: 4,
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaMoneyBillWave className="text-4xl text-primary" />,
        animation: "fade-up",
    },
    {
        id: 5,
        title: "Corporate Service / Contract in Logistics",
        description:
            "Customized corporate logistics services including warehouse and inventory management support.",
        icon: <FaBuilding className="text-4xl text-primary" />,
        animation: "fade-up",
    },
    {
        id: 6,
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility, customers can return or exchange products easily with online merchants.",
        icon: <FaUndoAlt className="text-4xl text-primary" />,
        animation: "fade-up",
    },
];

const OurServices = () => {
    return (
        <section className="py-20 bg-[rgba(3,55,61,1)]">
            <div className="w-11/12 mx-auto px-4">
                {/* Section Header */}
                <div
                    className="text-center mb-14"
                    data-aos="fade-down"
                    data-aos-offset="200"
                >
                    <h2 className="text-4xl text-white font-bold mb-4">Our Services</h2>
                    <p className="max-w-3xl mx-auto text-gray-400">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero
                        hassle. From personal packages to business shipments — we deliver on
                        time, every time.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            data-aos={service.animation}
                            data-aos-delay={index * 100}
                            data-aos-offset="200"
                            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl"
                        >
                            <div className="card-body items-center text-center hover:bg-[#CAEB66] hover:rounded-3xl">
                                <div className="mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
