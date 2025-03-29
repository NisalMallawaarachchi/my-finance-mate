import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';

// Import images from the assets directory
 import educationImg from '../assets/edu.jpg'; 
 import foodDiningImg from '../assets/food.png';
 import healthInsuranceImg from '../assets/health.png';
 import homeUtilitiesImg from '../assets/home.png';
 import otherImg from '../assets/other.png'; 
 import shoppingEntertainmentImg from '../assets/enter.png';
 import transportationImg from '../assets/trans.png';
//import { default as educationImg, default as foodDiningImg, default as healthInsuranceImg, default as homeUtilitiesImg, default as otherImg, default as shoppingEntertainmentImg, default as transportationImg } from '../assets/edu.jpg'; // Matches "Education"
import Footer from './Footer';

// Map offer categories to their respective images
const offerImages = {
  'Home & Utilities': homeUtilitiesImg,
  'Transportation': transportationImg,
  'Food & Dining': foodDiningImg,
  'Health & Insurance': healthInsuranceImg,
  'Shopping & Entertainment': shoppingEntertainmentImg,
  'Education': educationImg,
  'Other': otherImg,
};

const offerCategories = [
  'Home & Utilities',
  'Transportation',
  'Food & Dining',
  'Health & Insurance',
  'Shopping & Entertainment',
  'Education',
  'Other',
];

const Offers = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/offers/${category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`);
  };

  return (
    <div className="offers-container">
      <h2 className="offers-title">Offers</h2>
      <div className="offers-grid">
        {offerCategories.map((category) => (
          <div
            key={category}
            className="offer-card"
            onClick={() => handleCategoryClick(category)}
          >
            <img src={offerImages[category]} alt={category} className="offer-image" />
            <h3 className="offer-name">{category}</h3>
          </div>
        ))}
        {/* Fill remaining grid slots with empty divs if needed */}
        {Array.from({ length: 9 - offerCategories.length }).map((_, index) => (
          <div key={`empty-${index}`} className="offer-card empty"></div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Offers;