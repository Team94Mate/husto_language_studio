import { TeacherProp } from '../types/Teachers';
import { CursProp } from '../Components/ToggleButton/ToggleButton';

export interface ReviewItem {
  id: number;
  name: string;
  description: string;
}

const TEACHERS_EN: Record<
  number,
  Pick<
    TeacherProp,
    'name' | 'specialization' | 'teacher_level' | 'description_lines'
  >
> = {
  1: {
    name: 'Olha',
    specialization: 'Co-founder of the school',
    teacher_level: 'Corporate English',
    description_lines: [
      'Every lesson with me will open new horizons in language learning and inspire you to achieve your goals.',
    ],
  },
  2: {
    name: 'Yulianna',
    specialization: 'Master of practical knowledge',
    teacher_level: 'English level C2',
    description_lines: [
      'Higher education in philology and translation',
      'Language practice in an American English environment',
      'Knowledge of conversational structures and linguistic nuances',
    ],
  },
  3: {
    name: 'Anastasiia',
    specialization: 'Co-founder of the school',
    teacher_level: 'English for IT',
    description_lines: [
      'Learning with me becomes a path to self-development, confidence, and new opportunities.',
    ],
  },
  4: {
    name: 'Yuliia',
    specialization: 'Master of practical classes',
    teacher_level: 'English level B2',
    description_lines: [
      'Participation in the EnGin program',
      'Uses various platforms for deep immersion in the learning process',
    ],
  },
  5: {
    name: 'Liza',
    specialization: 'Master of practical classes',
    teacher_level: 'English level C2',
    description_lines: [
      'Higher philological education',
      'Experience in intercultural communication',
      'Focus on the specifics of American conversational English',
    ],
  },
};

const COURSES_EN: Record<
  number,
  Pick<
    CursProp,
    'title' | 'course_type' | 'classes' | 'number_of_classes' | 'trial_info'
  >
> = {
  2: {
    title: 'SplitDual',
    course_type: 'Paired',
    classes: '2 times a week',
    number_of_classes: '8 per month',
    trial_info: 'Free trial lesson*',
  },
  3: {
    title: 'SoloPro',
    course_type: 'Individual',
    classes: '2 times a week',
    number_of_classes: '8 per month',
    trial_info: 'Free trial lesson*',
  },
  4: {
    title: 'TeamUp',
    course_type: 'Group up to 4 people',
    classes: '2 times a week',
    number_of_classes: '8 per month',
    trial_info: 'Free trial lesson*',
  },
  5: {
    title: 'SplitDual',
    course_type: 'Paired',
    classes: '2 times a week',
    number_of_classes: '8 per month',
    trial_info: 'Free trial lesson*',
  },
  6: {
    title: 'SoloPro',
    course_type: 'Individual',
    classes: '2 times a week',
    number_of_classes: '8 per month',
    trial_info: 'Free trial lesson*',
  },
  7: {
    title: 'TeamUp',
    course_type: 'Group up to 4 people',
    classes: '2 times a week',
    number_of_classes: '8 per month',
    trial_info: 'Free trial lesson*',
  },
};

const REVIEWS_EN: Record<number, Pick<ReviewItem, 'name' | 'description'>> = {
  1: {
    name: 'Mariia',
    description:
      'The school teachers are true professionals in their field. Their experience is noticeable from the very first lesson. They not only have a great command of English, but also know how to explain things clearly and accessibly. Thanks to their professionalism, I was able to overcome language barriers and start speaking English confidently.',
  },
  2: {
    name: 'Olha',
    description:
      'My son started learning from an absolute beginner level, and I am amazed by his progress. The teachers created a supportive environment that helped him quickly master the basics and start speaking confidently. Now he shows wonderful results. Very grateful for the professional approach!',
  },
  3: {
    name: 'Oleksandra',
    description:
      'When I started studying, my English level was almost zero. But thanks to a systematic approach and high-quality learning process, I was able to progress quickly. Every lesson helps me improve, and I can already communicate confidently in English in everyday situations.',
  },
  4: {
    name: 'Ivan',
    description:
      'Interactive platforms, videos, and modern teaching methods make the learning process extremely dynamic and engaging. Before every lesson, I look forward to new interactive tasks that help me absorb the material better and keep my motivation high.',
  },
  5: {
    name: 'Sviatoslav',
    description:
      'One of the biggest advantages of the school is the flexibility of the schedule, which easily adapts to my busy routine. This greatly simplifies the learning process, allowing me to plan lessons so they fit my daily schedule.',
  },
  6: {
    name: 'Olena',
    description:
      'I always thought learning English could be boring and monotonous, but Husto changed my mind. Every lesson is tailored to my personal interests and level, making learning very effective and exciting. I feel that I receive genuine support in my studies.',
  },
};

export function localizeTeacher(
  teacher: TeacherProp,
  lang: string,
): TeacherProp {
  if (lang !== 'en' || !TEACHERS_EN[teacher.id]) {
    return teacher;
  }

  return { ...teacher, ...TEACHERS_EN[teacher.id] };
}

export function localizeCourse(course: CursProp, lang: string): CursProp {
  if (lang !== 'en' || !COURSES_EN[course.id]) {
    return course;
  }

  return { ...course, ...COURSES_EN[course.id] };
}

export function localizeReview<T extends ReviewItem>(
  review: T,
  lang: string,
): T {
  if (lang !== 'en' || !REVIEWS_EN[review.id]) {
    return review;
  }

  return { ...review, ...REVIEWS_EN[review.id] };
}
