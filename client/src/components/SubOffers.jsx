import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubOffers.css';

import subOfferImg from '../assets/edu.jpg';
import Footer from './Footer';

// import bikeRentalDiscountImg from '../assets/images/bike-rental-discount.jpg';
// import bookPurchaseOfferImg from '../assets/images/book-purchase-offer.jpg';
// import cafeVoucherImg from '../assets/images/cafe-voucher.jpg';
// import carMaintenanceDealImg from '../assets/images/car-maintenance-deal.jpg';
// import carRentalDiscountImg from '../assets/images/car-rental-discount.jpg';
// import charityDonationDiscountImg from '../assets/images/charity-donation-discount.jpg';
// import concertTicketOfferImg from '../assets/images/concert-ticket-offer.jpg';
// import dentalCareDealImg from '../assets/images/dental-care-deal.jpg';
// import electricityBillDiscountImg from '../assets/images/electricity-bill-discount.jpg';
// import electronicsDiscountImg from '../assets/images/electronics-discount.jpg';
// import eventTicketDiscountImg from '../assets/images/event-ticket-discount.jpg';
// import examPrepOfferImg from '../assets/images/exam-prep-offer.jpg';
// import eyeCheckupOfferImg from '../assets/images/eye-checkup-offer.jpg';
// import fashionSaleImg from '../assets/images/fashion-sale.jpg';
// import fastFoodComboOfferImg from '../assets/images/fast-food-combo-offer.jpg';
// import foodDeliveryOfferImg from '../assets/images/food-delivery-offer.jpg';
// import fuelCashbackImg from '../assets/images/fuel-cashback.jpg';
// import gamingSubscriptionDealImg from '../assets/images/gaming-subscription-deal.jpg';
// import gasBillCashbackImg from '../assets/images/gas-bill-cashback.jpg';
// import giftCardOfferImg from '../assets/images/gift-card-offer.jpg';
// import groceryCashbackImg from '../assets/images/grocery-cashback.jpg';
// import gymMembershipDiscountImg from '../assets/images/gym-membership-discount.jpg';
// import healthCheckupDiscountImg from '../assets/images/health-checkup-discount.jpg';
// import homeCleaningServiceImg from '../assets/images/home-cleaning-service.jpg';
// import insurancePremiumOfferImg from '../assets/images/insurance-premium-offer.jpg';
// import internetPlanDealImg from '../assets/images/internet-plan-deal.jpg';
// import languageCourseDealImg from '../assets/images/language-course-deal.jpg';
// import mealSubscriptionDealImg from '../assets/images/meal-subscription-deal.jpg';
// import miscellaneousCashbackImg from '../assets/images/miscellaneous-cashback.jpg';
// import movieTicketDiscountImg from '../assets/images/movie-ticket-discount.jpg';
// import onlineCourseDiscountImg from '../assets/images/online-course-discount.jpg';
// import pharmacyCashbackImg from '../assets/images/pharmacy-cashback.jpg';
// import plumbingServiceDiscountImg from '../assets/images/plumbing-service-discount.jpg';
// import publicTransportPassImg from '../assets/images/public-transport-pass.jpg';
// import restaurantDiscountImg from '../assets/images/restaurant-discount.jpg';
// import shoppingVoucherImg from '../assets/images/shopping-voucher.jpg';
// import stationeryDiscountImg from '../assets/images/stationery-discount.jpg';
// import subscriptionServiceOfferImg from '../assets/images/subscription-service-offer.jpg';
// import taxiRideOfferImg from '../assets/images/taxi-ride-offer.jpg';
// import travelPackageDealImg from '../assets/images/travel-package-deal.jpg';
// import tuitionFeeCashbackImg from '../assets/images/tuition-fee-cashback.jpg';
// import waterBillOfferImg from '../assets/images/water-bill-offer.jpg';

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
// const subOfferImages = {
//   'Electricity Bill Discount': electricityBillDiscountImg,
//   'Water Bill Offer': waterBillOfferImg,
//   'Internet Plan Deal': internetPlanDealImg,
//   'Gas Bill Cashback': gasBillCashbackImg,
//   'Home Cleaning Service': homeCleaningServiceImg,
//   'Plumbing Service Discount': plumbingServiceDiscountImg,
//   'Car Rental Discount': carRentalDiscountImg ,
//   'Public Transport Pass': publicTransportPassImg,
//   'Taxi Ride Offer': taxiRideOfferImg,
//   'Car Maintenance Deal': carMaintenanceDealImg,
//   'Bike Rental Discount': bikeRentalDiscountImg,
//   'Restaurant Discount': restaurantDiscountImg,
//   'Food Delivery Offer': foodDeliveryOfferImg,
//   'Grocery Cashback': groceryCashbackImg,
//   'Cafe Voucher': cafeVoucherImg,
//   'Meal Subscription Deal': mealSubscriptionDealImg,
//   'Fast Food Combo Offer': fastFoodComboOfferImg,
//   'Health Checkup Discount': healthCheckupDiscountImg,
//   'Insurance Premium Offer': insurancePremiumOfferImg,
//   'Pharmacy Cashback': pharmacyCashbackImg,
//   'Dental Care Deal': dentalCareDealImg,
//   'Eye Checkup Offer': eyeCheckupOfferImg ,
//   'Gym Membership Discount': gymMembershipDiscountImg,
//   'Movie Ticket Discount': movieTicketDiscountImg ,
//   'Shopping Voucher': shoppingVoucherImg,
//   'Concert Ticket Offer': concertTicketOfferImg,
//   'Gaming Subscription Deal': gamingSubscriptionDealImg,
//   'Fashion Sale': fashionSaleImg,
//   'Electronics Discount': electronicsDiscountImg,
//   'Online Course Discount': onlineCourseDiscountImg,
//   'Book Purchase Offer': bookPurchaseOfferImg,
//   'Tuition Fee Cashback': tuitionFeeCashbackImg,
//   'Stationery Discount': stationeryDiscountImg,
//   'Language Course Deal': languageCourseDealImg,
//   'Exam Prep Offer': examPrepOfferImg,
//   'Gift Card Offer': giftCardOfferImg,
//   'Charity Donation Discount': charityDonationDiscountImg,
//   'Travel Package Deal': travelPackageDealImg,
//   'Event Ticket Discount': eventTicketDiscountImg,
//   'Subscription Service Offer': subscriptionServiceOfferImg,
//   'Miscellaneous Cashback': miscellaneousCashbackImg
// };

const subOfferImages = {
    'Electricity Bill Discount': subOfferImg,
    'Water Bill Offer': subOfferImg,
    'Internet Plan Deal': subOfferImg,
    'Gas Bill Cashback': subOfferImg,
    'Home Cleaning Service': subOfferImg,
    'Plumbing Service Discount': subOfferImg,
    'Car Rental Discount': subOfferImg,
    'Fuel Cashback': subOfferImg,
    'Public Transport Pass': subOfferImg,
    'Taxi Ride Offer': subOfferImg,
    'Car Maintenance Deal': subOfferImg,
    'Bike Rental Discount': subOfferImg,
    'Restaurant Discount': subOfferImg,
    'Food Delivery Offer': subOfferImg,
    'Grocery Cashback': subOfferImg,
    'Cafe Voucher': subOfferImg,
    'Meal Subscription Deal': subOfferImg,
    'Fast Food Combo Offer': subOfferImg,
    'Health Checkup Discount': subOfferImg,
    'Insurance Premium Offer': subOfferImg,
    'Pharmacy Cashback': subOfferImg,
    'Dental Care Deal': subOfferImg,
    'Eye Checkup Offer': subOfferImg,
    'Gym Membership Discount': subOfferImg,
    'Movie Ticket Discount': subOfferImg,
    'Shopping Voucher': subOfferImg,
    'Concert Ticket Offer': subOfferImg,
    'Gaming Subscription Deal': subOfferImg,
    'Fashion Sale': subOfferImg,
    'Electronics Discount': subOfferImg,
    'Online Course Discount': subOfferImg,
    'Book Purchase Offer': subOfferImg,
    'Tuition Fee Cashback': subOfferImg,
    'Stationery Discount': subOfferImg,
    'Language Course Deal': subOfferImg,
    'Exam Prep Offer': subOfferImg,
    'Gift Card Offer': subOfferImg,
    'Charity Donation Discount': subOfferImg,
    'Travel Package Deal': subOfferImg,
    'Event Ticket Discount': subOfferImg,
    'Subscription Service Offer': subOfferImg,
    'Miscellaneous Cashback': subOfferImg,
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