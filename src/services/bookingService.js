
import { useAuth } from '../services/auth.js';

export const getAllBookings = async () => {
  try {
    const response = await fetch('https://bookingapi.europe-central2.run.internal/bookings/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const bookings = await response.json();
    return bookings;
  } catch (error) {
    console.error("An error occured:", error);
  }
};



export const getUserBookings = async (userId) => {
  try {
    console.log("testing user id in bookingservice: " + userId);
    const response = await fetch(`https://bookingapi.europe-central2.run.internal/bookings/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const bookings = await response.json();
    return bookings || []; 
  } catch (error) {
    console.error("An error occured:", error);
    return []; 
  }
};

export const handleCancelBooking = async (id, onSuccess) => {
  try {
      const response = await fetch(`https://bookingapi.europe-central2.run.internal/bookings/cancel/${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {

          onSuccess(); 
      } else {
          throw new Error('Failed to cancel event');
      }
  } catch (error) {
      console.error('Error cancelling event:', error);
      alert('Error cancelling event');
  }
};
