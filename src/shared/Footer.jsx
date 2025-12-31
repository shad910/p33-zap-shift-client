import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import ZapShiftLogo from "./ZapShiftLogo";
import { NavLink } from "react-router";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

      const FootLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/services'>Services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/about-us'>About Us</NavLink></li>
        <li><NavLink to='/Pricing'>Pricing</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
    </>

  return (
    <footer className="bg-linear-to-b from-black to-neutral-900 text-white rounded-4xl">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">

        {/* Logo / Brand */}
        <div className="flex justify-center mb-4">
            <ZapShiftLogo/>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-400 max-w-xl mx-auto mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and safe
          hands. From personal packages to business shipments — we deliver on time,
          every time.
        </p>

        {/* Navigation */}
        <ul className="flex justify-center gap-6 mb-10 text-sm">
          {FootLinks}
        </ul>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <a className="btn btn-circle btn-outline btn-sm text-white">
            <FaFacebookF />
          </a>
          <a className="btn btn-circle btn-outline btn-sm text-white">
            <FaXTwitter />
          </a>
          <a className="btn btn-circle btn-outline btn-sm text-white">
            <FaLinkedinIn />
          </a>
          <a className="btn btn-circle btn-outline btn-sm text-white">
            <FaYoutube />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
