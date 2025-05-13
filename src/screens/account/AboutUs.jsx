import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import aboutUsData from '../../data/AboutUsData';
import docit from '../../assets/docit.png';
import back from '../../assets/back.png';

const AboutUs = () => (
  <div className="p-6 max-w-4xl mx-auto text-gray-800">
    <div className="flex items-center gap-4 mb-6">
      <Link
        to="/account"
        className="flex items-center text-[#002D62] hover:underline"
      >
        <img src={back} alt="Back to Account" className="w-5 h-5 mr-2" />
      </Link>
      <h1 className="text-2xl font-bold text-[#002D62]">About Us</h1>
    </div>
    <img src={docit} alt="Doc It" className="w-20 h -20 mr-10 mb-10" />
    {aboutUsData.map((section, index) => (
      <div key={index} className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">{`${
          index + 1
        }. ${section.title}`}</h2>
        <p className="text-base leading-relaxed text-gray-700">
          {section.content}
        </p>
      </div>
    ))}
  </div>
);

export default AboutUs;
