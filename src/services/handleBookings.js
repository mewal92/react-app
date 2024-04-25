import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleBookEvent = async (id, userId, startDate, endDate) => {
    try {
      const response = await fetch('https://bookingapi-cke324lauq-lm.a.run.app/bookings/book-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, 
          userId,
          startDate, 
          endDate, 
        }),
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log(data); 
        toast.success('Event booked successfully!');
      } else {
        throw new Error('Failed to book event');
      }
    } catch (error) {
      console.error('Error booking event:', error);
      toast.error('Error booking event');
    }
  };
  
  export { handleBookEvent };
  
