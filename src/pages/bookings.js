import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../services/bookingService.js';
import './bookings.css';
import { useAuth } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import {handleBookEvent} from '../services/handleBookings.js';


const BookingsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();



 
  useEffect(() => {
    const fetchBookings = async () => {
      const fetchedBookings = await getAllBookings();
      setBookings(fetchedBookings || []);
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
  selectedCategory === "" ? true : booking.category === selectedCategory
);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  

  const handleConfirmBooking = async (startDate, endDate) => {
    if (selectedBooking) {
      const id = selectedBooking.id;
      const userId = currentUser.uid;
      const userEmail = currentUser.email;
      const formattedStartDate = startDate ? startDate.toISOString() : undefined;
      const formattedEndDate = endDate ? endDate.toISOString() : undefined;

      await handleBookEvent(id, userId, userEmail, formattedStartDate, formattedEndDate);
      setIsModalOpen(false);
      navigate('/profile');
    }
  };

  const isBookedByCurrentUser = (booking) => booking.userId === currentUser.uid;

  return (
  <div className='all'>
    <h2 className='bookings-title'>Available events</h2>
    <div className="categories-row">
    <button onClick={() => handleCategoryChange("")} className={selectedCategory === "" ? "active" : ""}>Show All Categories</button>
  <button onClick={() => handleCategoryChange("vacation")} className={selectedCategory === "vacation" ? "active" : ""}>Vacations</button>
  <button onClick={() => handleCategoryChange("beautyandhealth")} className={selectedCategory === "beautyandhealth" ? "active" : ""}>Beauty and Health</button>
  <button onClick={() => handleCategoryChange("entertainment")} className={selectedCategory === "entertainment" ? "active" : ""}>Entertainment</button>
  <button onClick={() => handleCategoryChange("cars")} className={selectedCategory === "cars" ? "active" : ""}>Car rentals</button>
  <button onClick={() => handleCategoryChange("other")} className={selectedCategory === "other" ? "active" : ""}>Other</button>
    </div>
    <div className="booking-grid">
      {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
        <div key={booking.id} className='booking-card'>
          <div className="card-image-container">
            <img src={booking.imageUrl} alt="Event" className="card-image" />
          </div>
          <div className="card-content">
            <h5 className="card-title">{booking.bookingName}</h5>
            <p className="card-detail"> <img src={require('../images/location-pin.png')} className="icon" alt="Location" /> {booking.bookingArea}</p>
            <p className="card-detail"><img src={require('../images/schedule.png')} className="icon" alt="Date" /> {booking.bookingDate && new Date(booking.bookingDate.seconds * 1000).toLocaleDateString("sv-SE")}</p>
        
            <p className="card-price"><b>Pris:</b> {booking.bookingPrice} kr</p>
            <div className="card-actions">
              <button
                className="book-event-btn"
                onClick={() => !isBookedByCurrentUser(booking) ? handleOpenModal(booking) : null}
                disabled={isBookedByCurrentUser(booking)}
              >
                {isBookedByCurrentUser(booking) ? 'Booked' : 'Book Event'}
              </button>
            </div>
          </div>
        </div>
      )) : <p className="no-bookings">No bookings available.</p>}
    </div>
    {isModalOpen && selectedBooking && (
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
        booking={selectedBooking}
      />
    )}
  </div>
)};


export default BookingsPage;

const BookingModal = ({ isOpen, onClose, onConfirm, booking }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  useEffect(() => {

    if (!booking.bookingDate) {
      const oneWeekLater = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      setEndDate(oneWeekLater);
    }
  }, [startDate, booking.bookingDate]);

  if (!isOpen || !booking) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content-booking">
        <div className="booking-item-modal">
          <p className="booking-name-modal">{booking.bookingName}</p>
          <img src={booking.imageUrl} alt="Event" className='booking-image-modal'/>
          <p className='booking-details-modal'><b>Info: </b> {booking.bookingDetails}< br/>
          {booking.bookingArea}
          </p>
        </div>
        {!booking.bookingDate ? (
          <>
            <h2>Select a date for your booking</h2>
            <div>
              <label>Start date:</label>
              <DatePicker selected={startDate} onChange={setStartDate} minDate={new Date()} />
            </div>
            <div>
              <label>End date:</label>
              <DatePicker selected={endDate} disabled />
            </div>
          </>
        ) : (
          <p className='confirm'>Confirm your booking for <b>{new Date(booking.bookingDate.seconds * 1000).toLocaleDateString("sv-SE")}</b>?</p>
        )}
        <div className="price">Total price: {booking.bookingPrice}</div>
        <div className='modalButtons'>
          <button className='book-event-btn' onClick={() => onConfirm(startDate, endDate)}>Confirm Booking</button>
          <button className='close-btn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
