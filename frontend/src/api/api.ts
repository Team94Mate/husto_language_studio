import { ContactData } from '../Components/ClientForm/ClientForm';
import { Review, TeachersProp } from '../storage/StorageContext';
import { client } from '../utils/fetchClient';

export const getReviews = () => {
  return client.get<Review>(`/api/reviews/`);
};

export const getTeachers = () => {
  return client.get<TeachersProp>(`/api/contact-messages/`);
};

export const addMessageData = async (contactMessageData: ContactData) => {
  return client.post<ContactData>(`contact-messages/`, contactMessageData);
};

// export const addMessageData = (contactData: ContactData) => {
//   return client
//     .post<ContactData>('contact-messages/', contactData)
//     .then(response => {
//       // Optionally return a more specific response if needed
//       return response; // The actual response from the server
//     })
//     .catch(error => {
//       console.error('Error adding message data:', error);
//       throw error; // Rethrow the error to be handled by the caller
//     });
// };

export const getCourses = () => {
  return client.get(`/api/courses/`);
};
