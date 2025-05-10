import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubOffers.css';

// Importing images
import Footer from './Footer';

import h1_Img from '../assets/1-h/h1.png';
import h2_Img from '../assets/1-h/h2.png';
import h3_Img from '../assets/f1.png';
import h4_Img from '../assets/f1.png';
import h5_Img from '../assets/f1.png';
import h6_Img from '../assets/f1.png';

import t1_Img from '../assets/f1.png';
import t2_Img from '../assets/f1.png';
import t3_Img from '../assets/f1.png';
import t4_Img from '../assets/f1.png';
import t5_Img from '../assets/f1.png';
import t6_Img from '../assets/f1.png';

import f1_Img from '../assets/f1.png';
import f2_Img from '../assets/foodadd2.png';
import f3_Img from '../assets/foodadd3.png';
import f4_Img from '../assets/foodadd4.png';
import f5_Img from '../assets/foodadd5.png';
import f6_Img from '../assets/foodadd6.png';

import hi1_Img from '../assets/f1.png';
import hi2_Img from '../assets/f1.png';
import hi3_Img from '../assets/f1.png';
import hi4_Img from '../assets/f1.png';
import hi5_Img from '../assets/f1.png';
import hi6_Img from '../assets/f1.png';

import se1_Img from '../assets/f1.png';
import se2_Img from '../assets/f1.png';
import se3_Img from '../assets/f1.png';
import se4_Img from '../assets/f1.png';
import se5_Img from '../assets/f1.png';
import se6_Img from '../assets/f1.png';

import e1_Img from '../assets/f1.png';
import e2_Img from '../assets/f1.png';
import e3_Img from '../assets/f1.png';
import e4_Img from '../assets/f1.png';
import e5_Img from '../assets/f1.png';
import e6_Img from '../assets/f1.png';

import o1_Img from '../assets/f1.png';
import o2_Img from '../assets/f1.png';
import o3_Img from '../assets/f1.png';
import o4_Img from '../assets/f1.png';
import o5_Img from '../assets/f1.png';
import o6_Img from '../assets/f1.png';

// Placeholder sub-offers data with links
const subOffersData = {
  'home-utilities': [
    { name: 'h1', link: 'https://www.genie.lk/promotions/pay-via-genie-using-any-mastercard-and-get-up-to-25-discount-on-ceb-leco-water-bill-payments/#:~:text=Pay%20via%20genie%20using%20any,Any%20other%20Mastercard%20:%2015%25%20Discount' },
    { name: 'h2', link: 'https://web.facebook.com/hayleyssolar/photos/now-its-easier-to-switch-to-solar-energywith-hayleys-solar-you-can-now-upgrade-t/997453124049693/?_rdc=1&_rdr#' },
    { name: 'h3', link: 'https://example.com/home-utilities/h3' },
    { name: 'h4', link: 'https://example.com/home-utilities/h4' },
    { name: 'h5', link: 'https://example.com/home-utilities/h5' },
    { name: 'h6', link: 'https://example.com/home-utilities/h6' }
  ],
  'transportation': [
    { name: 't1', link: 'https://example.com/transportation/t1' },
    { name: 't2', link: 'https://example.com/transportation/t2' },
    { name: 't3', link: 'https://example.com/transportation/t3' },
    { name: 't4', link: 'https://example.com/transportation/t4' },
    { name: 't5', link: 'https://example.com/transportation/t5' },
    { name: 't6', link: 'https://example.com/transportation/t6' }
  ],

  'food-dining': [
  { name: 'f1', link: 'https://example.com/food-dining/f1' },
  { name: 'f2', link: 'https://example.com/food-dining/f2' },
  { name: 'f3', link: 'https://example.com/food-dining/f3' },
  { name: 'f4', link: 'https://example.com/food-dining/f4' },
  { name: 'f5', link: 'https://example.com/food-dining/f5' },
  { name: 'f6', link: 'https://example.com/food-dining/f6' }
],

  'health-insurance': [
  { name: 'hi1', link: 'https://example.com/health-insurance/hi1' },
  { name: 'hi2', link: 'https://example.com/health-insurance/hi2' },
  { name: 'hi3', link: 'https://example.com/health-insurance/hi3' },
  { name: 'hi4', link: 'https://example.com/health-insurance/hi4' },
  { name: 'hi5', link: 'https://example.com/health-insurance/hi5' },
  { name: 'hi6', link: 'https://example.com/health-insurance/hi6' }
],

  'shopping-entertainment': [
  { name: 'se1', link: 'https://example.com/shopping-entertainment/se1' },
  { name: 'se2', link: 'https://example.com/shopping-entertainment/se2' },
  { name: 'se3', link: 'https://example.com/shopping-entertainment/se3' },
  { name: 'se4', link: 'https://example.com/shopping-entertainment/se4' },
  { name: 'se5', link: 'https://example.com/shopping-entertainment/se5' },
  { name: 'se6', link: 'https://example.com/shopping-entertainment/se6' }
],

  'education': [
  { name: 'e1', link: 'https://example.com/education/e1' },
  { name: 'e2', link: 'https://example.com/education/e2' },
  { name: 'e3', link: 'https://example.com/education/e3' },
  { name: 'e4', link: 'https://example.com/education/e4' },
  { name: 'e5', link: 'https://example.com/education/e5' },
  { name: 'e6', link: 'https://example.com/education/e6' }
],

  'other': [
  { name: 'o1', link: 'https://example.com/other/o1' },
  { name: 'o2', link: 'https://example.com/other/o2' },
  { name: 'o3', link: 'https://example.com/other/o3' },
  { name: 'o4', link: 'https://example.com/other/o4' },
  { name: 'o5', link: 'https://example.com/other/o5' },
  { name: 'o6', link: 'https://example.com/other/o6' }
],


  
  // Add more categories similarly...
};

const subOfferImages = {
  'h1': h1_Img, 'h2': h2_Img, 'h3': h3_Img, 'h4': h4_Img, 'h5': h5_Img, 'h6': h6_Img,
  't1': t1_Img, 't2': t2_Img, 't3': t3_Img, 't4': t4_Img, 't5': t5_Img, 't6': t6_Img,
  'f1': f1_Img, 'f2': f2_Img, 'f3': f3_Img, 'f4': f4_Img, 'f5': f5_Img, 'f6': f6_Img,
  'hi1': hi1_Img, 'hi2': hi2_Img, 'hi3': hi3_Img, 'hi4': hi4_Img, 'hi5': hi5_Img, 'hi6': hi6_Img,
  's1': se1_Img, 's2': se2_Img, 's3': se3_Img, 's4': se4_Img, 's5': se5_Img, 's6': se6_Img,
  'e1': e1_Img, 'e2': e2_Img, 'e3': e3_Img, 'e4': e4_Img, 'e5': e5_Img, 'e6': e6_Img,
  'o1': o1_Img, 'o2': o2_Img, 'o3': o3_Img, 'o4': o4_Img, 'o5': o5_Img, 'o6': o6_Img,
};

const SubOffers = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const subOffers = subOffersData[category] || [];

  const handleSubOfferClick = (subOfferLink) => {
    window.open(subOfferLink, '_blank'); // Open the link in a new tab
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="sub-offers-container">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <h2 className="sub-offers-title">{category.replace(/-/g, ' ').toUpperCase()} Offers</h2>
      <div className="sub-offers-grid">
        {subOffers.map(({ name, link }) => (
          <div
            key={name}
            className="sub-offer-card"
            onClick={() => handleSubOfferClick(link)}
          >
            <img src={subOfferImages[name]} alt={name} className="sub-offer-image" />
            <h3 className="sub-offer-name">{name}</h3>
          </div>
        ))}
        {Array.from({ length: 9 - subOffers.length }).map((_, index) => (
          <div key={`empty-${index}`} className="sub-offer-card empty"></div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SubOffers;
