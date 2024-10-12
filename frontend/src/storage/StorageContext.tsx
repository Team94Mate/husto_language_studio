export interface Review {
  id: number;
  name: string;
  age: string;
  image: string;
  comment: string;
}

interface TeachersProp {
  name: string;
  role: string;
  exp: string;
  spec: string;
  img: string;
  comments: string[] | string;
}

interface Props {
  showForm: boolean;
  setShowForm: (someData: boolean) => void;
  showBurger: boolean;
  setBurger: (someData: boolean) => void;
  reviewsData: Review[];
  teachers: TeachersProp[];
  setPageHeight: (pageHeight: number) => void;
  pageHeight: number;
}

import React, { useMemo, useState } from 'react';

export const StorageContext = React.createContext<Props>({
  showForm: false,
  setShowForm: () => {},
  showBurger: false,
  setBurger: () => {},
  reviewsData: [],
  teachers: [],
  setPageHeight: () => {},
  pageHeight: 0,
});

type Prop = {
  children: React.ReactNode;
};

const teachers: TeachersProp[] = [
  {
    name: 'Ольга',
    role: 'Cпівзасновниця школи',
    exp: '14 років',
    spec: 'Корпоративна англійська',
    img: 'images/Photo(1).png',
    comments: `${'Кожне навчання зі мною'}
    ${'відкриватиме нові горизонтиу вивченні мови та надихатиме на досягнення'}`,
  },
  {
    name: 'Софія',
    role: 'Майстер практичних знань',
    exp: '3 роки',
    spec: 'Рівень англійської С1',
    img: 'images/Photo(2).png',
    comments: [
      'Використовує автентичні матеріали та ресурси',
      'Захоплюється вивченням мов',
    ],
  },
  {
    name: 'Анастасія',
    role: 'Cпівзасновниця школи',
    exp: '12 років',
    spec: 'Англійська для IT',
    img: 'images/Photo(3).png',
    comments: `${'Навчання зі мною'} 
      ${'перетворюється на шлях до саморозвитку впевненості т нових можливостей'}`,
  },
  {
    name: 'Юлія',
    role: 'Майстер практичних занять',
    exp: '2 роки',
    spec: 'Рівень англійської В2',
    img: 'images/Photo(4).png',
    comments: [
      'Участь у програмі EnGin',
      `${'Застосовує різноманітні'} 
      ${'платформи для глибокого занурення у навчальний процес'}`,
    ],
  },
  {
    name: 'Соломія',
    role: 'Майстер практичних занять',
    exp: '3 роки',
    spec: 'Рівень англійської С1',
    img: 'images/Photo(5).png',
    comments: [
      'Вища філологічна освіта',
      'Викладання Marketing English',
      'Викладання в УКУ Military English',
      'Розмовні клуби General and Business English',
    ],
  },
];

const reviewsData: Review[] = [
  {
    id: 1,
    name: 'Марія',
    age: '33 роки',
    image: 'images/Ellipse-229.png',
    comment:
      'Викладачі справжні професіонали. Їх досвід помітний ' +
      'з першого заняття. Вони добре володіють англійською і передають. ' +
      'знання зрозуміло' +
      'Завдяки їм я подолала мовні бар’єри і почала впевнено спілкуватися.',
  },
  {
    id: 2,
    name: 'Ольга',
    age: '45 років',
    image: 'images/Ellipse229.png',
    comment:
      'Мій син почав з нульового рівня, і я вражена його прогресом. ' +
      'Вчителі створили підтримуюче середовище. Він швидко засвоїв основи ' +
      'і тепер впевнено спілкується. Дуже вдячна за професійний підхід!',
  },
  {
    id: 3,
    name: 'Олександра',
    age: '26 років',
    image: 'images/Ellipse229 (1).png',
    comment:
      'Мій рівень англійської був майже нульовим. Завдяки якісному підходу ' +
      'я швидко прогресувала. Кожен урок допомагає вдосконалюватись. ' +
      'Тепер я можу впевнено спілкуватися у повсякденних ситуаціях.',
  },
  {
    id: 4,
    name: 'Іван',
    age: '23 роки',
    image: 'images/Ellipse229(3).png',
    comment:
      'Інтерактивні платформи та сучасні методики роблять навчання цікавим. ' +
      'З нетерпінням чекаю нових завдань, які допомагають краще  ' +
      'засвоїти матеріал і підтримують високу мотивацію.',
  },
  {
    id: 5,
    name: 'Святослав',
    age: '21 рік',
    image: 'images/Ellipse229(4).png',
    comment:
      'Гнучкий навчальний графік — велика перевага. Він легко' +
      ' підлаштовується під мій насичений розклад. Це значно спрощує ' +
      'навчання і дозволяє планувати заняття відповідно до мого дня.',
  },
  {
    id: 6,
    name: 'Олена',
    age: '29 років',
    image: 'images/Ellipse229(5).png',
    comment:
      'Я думала, що навчання англійської буде нудним, але Husto змінили це. ' +
      'Кожен урок адаптований під мої інтереси, що робить його захоплюючим. ' +
      'Я відчуваю реальну підтримку у навчанні.',
  },
];

export const StorageProvider: React.FC<Prop> = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [showBurger, setBurger] = useState(false);
  const [pageHeight, setPageHeight] = useState(100);

  const value = useMemo(
    () => ({
      showForm,
      setShowForm,
      showBurger,
      setBurger,
      reviewsData,
      teachers,
      pageHeight,
      setPageHeight,
    }),
    [showForm, showBurger, pageHeight],
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
