
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';


export interface BookingData {
    id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  createdAt: Timestamp;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface ContactData {
    id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'replied';
}

export const saveBooking = async (bookingData: Omit<BookingData, 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: Timestamp.now(),
      status: 'pending'
    });
    console.log('Booking saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving booking: ', error);
    throw error;
  }
};

export const saveContactForm = async (contactData: Omit<ContactData, 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    console.log('Contact form saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact form: ', error);
    throw error;
  }
};
export const getAllBookings = async (): Promise<BookingData[]> => {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    const bookings: BookingData[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      } as BookingData);
    });
    
    console.log('Fetched bookings:', bookings);
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings: ', error);
    throw error;
  }
};

export const getAllContacts = async (): Promise<ContactData[]> => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    const contacts: ContactData[] = [];
    
    querySnapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data()
      } as ContactData);
    });
    
    console.log('Fetched contacts:', contacts);
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts: ', error);
    throw error;
  }
};
