// eslint-disable-next-line max-len
import { ContactData } from '../Components/ClientForm/ClientForm';
import { TeacherProp } from '../Components/Pages/Teachers/Teachers';
import { CursProp } from '../Components/ToggleButton/ToggleButton';
import { Review } from '../storage/StorageContext';
import { client } from '../utils/fetchClient';

export const getReviews = () => {
  return client.get<Review[]>(`reviews/`);
};

export const getTeachers = () => {
  return client.get<TeacherProp[]>(`teachers/`);
};

export const addMessageData = async (contactMessageData: ContactData) => {
  return client.post<ContactData>(`contact-messages/`, contactMessageData);
};

export const getCourses = () => {
  return client.get<CursProp[]>(`courses/`);
};
