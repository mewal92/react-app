
import './profile.css';
import React, { useEffect, useState } from 'react';
import { getUserBookings, handleCancelBooking } from '../services/bookingService.js';
import { useAuth } from '../services/auth.js'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  function Profile() {
    const [bookings, setBookings] = useState([]);
    const { currentUser } = useAuth();
  
    useEffect(() => {
      const fetchUserBookings = async () => {
        if (currentUser?.uid) {
          console.log("user id: " +currentUser.uid);
          const userBookings = await getUserBookings(currentUser.uid);
console.log(userBookings);
  getUserBookings(currentUser.uid).then(userBookings => {
    console.log("Bookings fetched:", userBookings); 
    setBookings(userBookings);
          setBookings(userBookings);
    });}
      };
    
      fetchUserBookings();
    }, [currentUser]);
  

    const cancelBookingAndUpdateState = async (id) => {
      handleCancelBooking(id, () => {

          const updatedBookings = bookings.filter(booking => booking.id !== id);
          setBookings(updatedBookings);

      });
    }
    return (
      <div className='all'>
        <h4>Upcoming events</h4>
        <div className='booking-grid'>
          {bookings?.map((booking, index) => (
            <div key={index} className='booking-card'>
              <div className="card-image-container">
                <img src={booking.imageUrl} alt="Event" className="card-image" />
              </div>
              <div className="card-content">
                <h5 className="card-title">{booking.bookingName}</h5>
                <p className="card-detail">
                  <img src={require('../images/location-pin.png')} className="icon" alt="Location" />
                  {booking.bookingArea}
                </p>
                <p className="card-detail">
                  <img src={require('../images/schedule.png')} className="icon" alt="Date" />
                  {booking.bookingDate ? (
          new Date(booking.bookingDate.seconds * 1000).toLocaleDateString("sv-SE")
        ) : booking.fromDate && booking.toDate ? (
          `${new Date(booking.fromDate.seconds * 1000).toLocaleDateString("sv-SE")} - 
           ${new Date(booking.toDate.seconds * 1000).toLocaleDateString("sv-SE")}`
        ) : 'Date not set'}
      </p>
                <p className="card-price"><b>{booking.bookingPrice} kr</b></p>
              </div>
              <div className="card-actions">
                <button
                  className="cancel-event-btn"
                  onClick={() => handleCancelBooking(booking.id, () => {
                    const updatedBookings = bookings.filter(b => b.id !== booking.id);
                    toast.error('Event was cancelled.');
                    setBookings(updatedBookings);
                  })}
                >
                  Cancel event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


export default Profile;
