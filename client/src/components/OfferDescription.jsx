import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './OfferDescription.css';

// Import a single image for all offer descriptions
import offerDescriptionImg from '../assets/edu.jpg';
import Footer from './Footer';

// Placeholder descriptions (replace with actual data)
const offerDescriptions = {
  'electricity-bill-discount': {
    title: 'Electricity Bill Discount',
    description: 'Get a 20% discount on your electricity bill this month! Pay through our partner app and save more on your utilities.',
    image: offerDescriptionImg,
  },
  'water-bill-offer': {
    title: 'Water Bill Offer',
    description: 'Save 15% on your water bill by paying online. Limited time offer!',
    image: offerDescriptionImg,
  },
  'internet-plan-deal': {
    title: 'Internet Plan Deal',
    description: 'Upgrade your internet plan and get 1 month free with our exclusive deal.',
    image: offerDescriptionImg,
  },
  'gas-bill-cashback': {
    title: 'Gas Bill Cashback',
    description: 'Pay your gas bill through our app and get 10% cashback instantly.',
    image: offerDescriptionImg,
  },
  'home-cleaning-service': {
    title: 'Home Cleaning Service',
    description: 'Book a home cleaning service and get 25% off your first booking.',
    image: offerDescriptionImg,
  },
  'plumbing-service-discount': {
    title: 'Plumbing Service Discount',
    description: 'Get 30% off on plumbing services this month. Book now!',
    image: offerDescriptionImg,
  },
  'car-rental-discount': {
    title: 'Car Rental Discount',
    description: 'Rent a car for your next trip and save 20% with our special offer.',
    image: offerDescriptionImg,
  },
  'fuel-cashback': {
    title: 'Fuel Cashback',
    description: 'Get 5% cashback on fuel purchases at partner stations.',
    image: offerDescriptionImg,
  },
  'public-transport-pass': {
    title: 'Public Transport Pass',
    description: 'Buy a monthly public transport pass and get 10% off.',
    image: offerDescriptionImg,
  },
  'taxi-ride-offer': {
    title: 'Taxi Ride Offer',
    description: 'Enjoy 15% off your next taxi ride with our partner app.',
    image: offerDescriptionImg,
  },
  'car-maintenance-deal': {
    title: 'Car Maintenance Deal',
    description: 'Get a full car maintenance package at 25% off this month.',
    image: offerDescriptionImg,
  },
  'bike-rental-discount': {
    title: 'Bike Rental Discount',
    description: 'Rent a bike for the day and save 20% with this offer.',
    image: offerDescriptionImg,
  },
  'restaurant-discount': {
    title: 'Restaurant Discount',
    description: 'Dine at partner restaurants and get 20% off your bill.',
    image: offerDescriptionImg,
  },
  'food-delivery-offer': {
    title: 'Food Delivery Offer',
    description: 'Order food online and get free delivery on your first order.',
    image: offerDescriptionImg,
  },
  'grocery-cashback': {
    title: 'Grocery Cashback',
    description: 'Shop for groceries online and get 10% cashback.',
    image: offerDescriptionImg,
  },
  'cafe-voucher': {
    title: 'Cafe Voucher',
    description: 'Get a free coffee with any purchase at our partner cafes.',
    image: offerDescriptionImg,
  },
  'meal-subscription-deal': {
    title: 'Meal Subscription Deal',
    description: 'Subscribe to a meal plan and get 1 week free.',
    image: offerDescriptionImg,
  },
  'fast-food-combo-offer': {
    title: 'Fast Food Combo Offer',
    description: 'Buy a combo meal and get a free dessert at partner fast food chains.',
    image: offerDescriptionImg,
  },
  'health-checkup-discount': {
    title: 'Health Checkup Discount',
    description: 'Get a comprehensive health checkup at 30% off.',
    image: offerDescriptionImg,
  },
  'insurance-premium-offer': {
    title: 'Insurance Premium Offer',
    description: 'Save 10% on your health insurance premium with our partner.',
    image: offerDescriptionImg,
  },
  'pharmacy-cashback': {
    title: 'Pharmacy Cashback',
    description: 'Get 15% cashback on pharmacy purchases at partner stores.',
    image: offerDescriptionImg,
  },
  'dental-care-deal': {
    title: 'Dental Care Deal',
    description: 'Book a dental checkup and get 20% off.',
    image: offerDescriptionImg,
  },
  'eye-checkup-offer': {
    title: 'Eye Checkup Offer',
    description: 'Free eye checkup with any purchase of glasses at partner stores.',
    image: offerDescriptionImg,
  },
  'gym-membership-discount': {
    title: 'Gym Membership Discount',
    description: 'Join a gym with a 25% discount on your first month.',
    image: offerDescriptionImg,
  },
  'movie-ticket-discount': {
    title: 'Movie Ticket Discount',
    description: 'Buy movie tickets and get 20% off at partner theaters.',
    image: offerDescriptionImg,
  },
  'shopping-voucher': {
    title: 'Shopping Voucher',
    description: 'Get a $10 voucher for your next shopping trip.',
    image: offerDescriptionImg,
  },
  'concert-ticket-offer': {
    title: 'Concert Ticket Offer',
    description: 'Save 15% on concert tickets for upcoming events.',
    image: offerDescriptionImg,
  },
  'gaming-subscription-deal': {
    title: 'Gaming Subscription Deal',
    description: 'Get 1 month free with a gaming subscription.',
    image: offerDescriptionImg,
  },
  'fashion-sale': {
    title: 'Fashion Sale',
    description: 'Up to 50% off on fashion items at partner stores.',
    image: offerDescriptionImg,
  },
  'electronics-discount': {
    title: 'Electronics Discount',
    description: 'Save 20% on electronics at partner retailers.',
    image: offerDescriptionImg,
  },
  'online-course-discount': {
    title: 'Online Course Discount',
    description: 'Get 30% off on online courses with our partner platforms.',
    image: offerDescriptionImg,
  },
  'book-purchase-offer': {
    title: 'Book Purchase Offer',
    description: 'Buy 2 books and get 1 free at partner bookstores.',
    image: offerDescriptionImg,
  },
  'tuition-fee-cashback': {
    title: 'Tuition Fee Cashback',
    description: 'Get 10% cashback on tuition fees with our partner schools.',
    image: offerDescriptionImg,
  },
  'stationery-discount': {
    title: 'Stationery Discount',
    description: 'Save 20% on stationery items at partner stores.',
    image: offerDescriptionImg,
  },
  'language-course-deal': {
    title: 'Language Course Deal',
    description: 'Enroll in a language course and get 25% off.',
    image: offerDescriptionImg,
  },
  'exam-prep-offer': {
    title: 'Exam Prep Offer',
    description: 'Get 15% off on exam preparation materials.',
    image: offerDescriptionImg,
  },
  'gift-card-offer': {
    title: 'Gift Card Offer',
    description: 'Buy a $50 gift card and get $10 extra free.',
    image: offerDescriptionImg,
  },
  'charity-donation-discount': {
    title: 'Charity Donation Discount',
    description: 'Donate to a charity and get a 10% discount on your next purchase.',
    image: offerDescriptionImg,
  },
  'travel-package-deal': {
    title: 'Travel Package Deal',
    description: 'Book a travel package and save 20% with our partner agency.',
    image: offerDescriptionImg,
  },
  'event-ticket-discount': {
    title: 'Event Ticket Discount',
    description: 'Get 15% off on event tickets for local events.',
    image: offerDescriptionImg,
  },
  'subscription-service-offer': {
    title: 'Subscription Service Offer',
    description: 'Subscribe to a service and get 1 month free.',
    image: offerDescriptionImg,
  },
  'miscellaneous-cashback': {
    title: 'Miscellaneous Cashback',
    description: 'Get 5% cashback on miscellaneous purchases.',
    image: offerDescriptionImg,
  },
};

const OfferDescription = () => {
  const { category, subOffer } = useParams();
  const navigate = useNavigate();

  const offer = offerDescriptions[subOffer] || {
    title: 'Offer Not Found',
    description: 'Sorry, this offer is not available.',
    image: offerDescriptionImg,
  };


  const handleBackClick = () => {
    if (category) {
      navigate(`/offers/${category}`);
    } else {
      navigate('/offers');
    }
  };

  return (
    <>
      <div className="offer-description-container">
        <button className="back-btn" onClick={handleBackClick} aria-label="Back to Sub Offers">
          <FaArrowLeft /> Back to Sub Offers
        </button>
        <div className="offer-description-content">
          <img
            src={offer.image}
            alt={`${offer.title} offer illustration`}
            className="offer-description-image"
          />
          <div className="offer-description-text">
            <h2 className="offer-description-title">{offer.title}</h2>
            <p className="offer-description-text">{offer.description}</p>
            <button
              className="claim-offer-btn"
              onClick={() => alert('Offer claimed!')}
              aria-label={`Claim ${offer.title} offer`}
            >
              Claim Offer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OfferDescription;