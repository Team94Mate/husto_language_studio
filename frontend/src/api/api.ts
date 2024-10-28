// eslint-disable-next-line max-len
import { CursProp } from '../Components/ToggleButton/ToggleButton';
import { ContactData } from '../types/ContactData';
import { Review } from '../types/Review';
import { TeacherProp } from '../types/Teachers';
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
