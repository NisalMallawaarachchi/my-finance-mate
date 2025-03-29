import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubOffers.css';

//import subOfferImg from '../assets/edu.jpg';
import Footer from './Footer';

 import bikeRentalDiscountImg from '../assets/edu.jpg';
 import bookPurchaseOfferImg from '../assets/edu.jpg';
 import carMaintenanceDealImg from '../assets/edu.jpg';
 import carRentalDiscountImg from '../assets/edu.jpg';
 import charityDonationDiscountImg from '../assets/edu.jpg';
 import concertTicketOfferImg from '../assets/edu.jpg';
 import dentalCareDealImg from '../assets/edu.jpg';
 import electricityBillDiscountImg from '../assets/edu.jpg';
 import electronicsDiscountImg from '../assets/edu.jpg';
 import eventTicketDiscountImg from '../assets/edu.jpg';
 import examPrepOfferImg from '../assets/edu.jpg';
 import eyeCheckupOfferImg from '../assets/edu.jpg';
 import fashionSaleImg from '../assets/edu.jpg';
 import fuelCashbackImg from '../assets/edu.jpg';
 import gamingSubscriptionDealImg from '../assets/edu.jpg';
 import gasBillCashbackImg from '../assets/edu.jpg';
 import giftCardOfferImg from '../assets/edu.jpg';
 import gymMembershipDiscountImg from '../assets/edu.jpg';
 import healthCheckupDiscountImg from '../assets/edu.jpg';
 import homeCleaningServiceImg from '../assets/edu.jpg';
 import insurancePremiumOfferImg from '../assets/edu.jpg';
 import internetPlanDealImg from '../assets/edu.jpg';
 import languageCourseDealImg from '../assets/edu.jpg';
 import miscellaneousCashbackImg from '../assets/edu.jpg';
 import movieTicketDiscountImg from '../assets/edu.jpg';
 import onlineCourseDiscountImg from '../assets/edu.jpg';
 import pharmacyCashbackImg from '../assets/edu.jpg';
 import plumbingServiceDiscountImg from '../assets/edu.jpg';
 import publicTransportPassImg from '../assets/edu.jpg';
 import restaurantDiscountImg from '../assets/foodadd1.png';
 import foodDeliveryOfferImg from '../assets/foodadd2.png';
 import groceryCashbackImg from '../assets/foodadd3.png';
 import cafeVoucherImg from '../assets/foodadd4.png';
 import mealSubscriptionDealImg from '../assets/foodadd5.png';
 import fastFoodComboOfferImg from '../assets/foodadd6.png';
 import shoppingVoucherImg from '../assets/edu.jpg';
 import stationeryDiscountImg from '../assets/edu.jpg';
 import subscriptionServiceOfferImg from '../assets/edu.jpg';
 import taxiRideOfferImg from '../assets/edu.jpg';
 import travelPackageDealImg from '../assets/edu.jpg';
 import tuitionFeeCashbackImg from '../assets/edu.jpg';
 import waterBillOfferImg from '../assets/edu.jpg';

// Placeholder sub-offers data
const subOffersData = {
  'home-utilities': [
    'Electricity Bill Discount',
    'Water Bill Offer',
    'Internet Plan Deal',
    'Gas Bill Cashback',
    'Home Cleaning Service',
    'Plumbing Service Discount',
  ],
  'transportation': [
    'Car Rental Discount',
    'Fuel Cashback',
    'Public Transport Pass',
    'Taxi Ride Offer',
    'Car Maintenance Deal',
    'Bike Rental Discount',
  ],
  'food-dining': [
    'Restaurant Discount',
    'Food Delivery Offer',
    'Grocery Cashback',
    'Cafe Voucher',
    'Meal Subscription Deal',
    'Fast Food Combo Offer',
  ],
  'health-insurance': [
    'Health Checkup Discount',
    'Insurance Premium Offer',
    'Pharmacy Cashback',
    'Dental Care Deal',
    'Eye Checkup Offer',
    'Gym Membership Discount',
  ],
  'shopping-entertainment': [
    'Movie Ticket Discount',
    'Shopping Voucher',
    'Concert Ticket Offer',
    'Gaming Subscription Deal',
    'Fashion Sale',
    'Electronics Discount',
  ],
  'education': [
    'Online Course Discount',
    'Book Purchase Offer',
    'Tuition Fee Cashback',
    'Stationery Discount',
    'Language Course Deal',
    'Exam Prep Offer',
  ],
  'other': [
    'Gift Card Offer',
    'Charity Donation Discount',
    'Travel Package Deal',
    'Event Ticket Discount',
    'Subscription Service Offer',
    'Miscellaneous Cashback',
  ],
};

// Map sub-offers to their respective images with a fallback
 const subOfferImages = {
   'Electricity Bill Discount': electricityBillDiscountImg,
   'Water Bill Offer': waterBillOfferImg,
   'Internet Plan Deal': internetPlanDealImg,
   'Gas Bill Cashback': gasBillCashbackImg,
   'Plumbing Service Discount': plumbingServiceDiscountImg,
   'Car Rental Discount': carRentalDiscountImg ,
   'Public Transport Pass': publicTransportPassImg,
   'Taxi Ride Offer': taxiRideOfferImg,
   'Car Maintenance Deal': carMaintenanceDealImg,
   'Bike Rental Discount': bikeRentalDiscountImg,
   'Restaurant Discount': restaurantDiscountImg,
   'Food Delivery Offer': foodDeliveryOfferImg,
   'Grocery Cashback': groceryCashbackImg,
   'Cafe Voucher': cafeVoucherImg,
   'Meal Subscription Deal': mealSubscriptionDealImg,
   'Fast Food Combo Offer': fastFoodComboOfferImg,
   'Health Checkup Discount': healthCheckupDiscountImg,
   'Insurance Premium Offer': insurancePremiumOfferImg,
   'Pharmacy Cashback': pharmacyCashbackImg,
   'Dental Care Deal': dentalCareDealImg,
   'Eye Checkup Offer': eyeCheckupOfferImg ,
   'Gym Membership Discount': gymMembershipDiscountImg,
   'Movie Ticket Discount': movieTicketDiscountImg ,
   'Shopping Voucher': shoppingVoucherImg,
   'Concert Ticket Offer': concertTicketOfferImg,
   'Gaming Subscription Deal': gamingSubscriptionDealImg,
   'Fashion Sale': fashionSaleImg,
   'Electronics Discount': electronicsDiscountImg,
   'Online Course Discount': onlineCourseDiscountImg,
   'Book Purchase Offer': bookPurchaseOfferImg,
   'Tuition Fee Cashback': tuitionFeeCashbackImg,
   'Stationery Discount': stationeryDiscountImg,
   'Language Course Deal': languageCourseDealImg,
   'Exam Prep Offer': examPrepOfferImg,
   'Gift Card Offer': giftCardOfferImg,
   'Charity Donation Discount': charityDonationDiscountImg,
   'Travel Package Deal': travelPackageDealImg,
   'Event Ticket Discount': eventTicketDiscountImg,
   'Subscription Service Offer': subscriptionServiceOfferImg,
   'Miscellaneous Cashback': miscellaneousCashbackImg,
 };



const SubOffers = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const subOffers = subOffersData[category] || [];

  const handleSubOfferClick = (subOffer) => {
    navigate(`/offers/${category}/${subOffer.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="sub-offers-container">
      <h2 className="sub-offers-title">{category.replace(/-/g, ' ').toUpperCase()} Offers</h2>
      <div className="sub-offers-grid">
        {subOffers.map((subOffer) => (
          <div
            key={subOffer}
            className="sub-offer-card"
            onClick={() => handleSubOfferClick(subOffer)}
          >
            <img src={subOfferImages[subOffer]} alt={subOffer} className="sub-offer-image" />
            <h3 className="sub-offer-name">{subOffer}</h3>
          </div>
        ))}
       
        {Array.from({ length: 9 - subOffers.length }).map((_, index) => (
          <div key={`empty-${index}`} className="sub-offer-card empty"></div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default SubOffers;