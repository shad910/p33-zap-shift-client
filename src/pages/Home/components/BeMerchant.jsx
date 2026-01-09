import React from 'react';
import merchant from "../../../assets/location-merchant.png";

const BeMerchant = () => {
    return (
        <section
            data-aos='zoom-in-up'
            className="
                bg-[url('assets/be-a-merchant-bg.png')]
                bg-no-repeat
                bg-[#03373D]
                w-11/12
                rounded-2xl
                mx-auto
                px-3 sm:px-10 md:px-16 lg:px-20
                py-12 md:py-16 lg:py-20
                my-12 md:my-16 lg:my-20
            "
        >
            <div className="hero-content flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-28">
                <div className='text-white text-center lg:text-left'>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                        Merchant and Customer Satisfaction <br className="hidden sm:block" />
                        is Our First Priority
                    </h1>

                    <p className="py-6 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <button className="btn bg-primary md:text-lg lg:text-xl text-black font-bold rounded-full">
                            Become a Merchant
                        </button>
                        <button className="btn btn-primary btn-outline md:text-lg lg:text-xl font-bold rounded-full hover:text-black">
                            Earn with ZapShift Courier
                        </button>
                    </div>
                </div>

                <img
                    src={merchant}
                    className="max-w-55 sm:max-w-xs lg:max-w-sm rounded-lg mx-auto"
                />
            </div>
        </section>
    );
};

export default BeMerchant;
