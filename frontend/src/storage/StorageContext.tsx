/* eslint-disable max-len */
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
      'Викладачі школи справжні професіонали у своїй справі. Їх досвід помітний з першого заняття. Вони не тільки добре володіють англійською, але й знають, як передати знання зрозуміло і доступно. Завдяки їх професіоналізму я змогла подолати мовні барєри і почати впевнено спілкуватися англійською.',
  },
  {
    id: 2,
    name: 'Ольга',
    age: '45 років',
    image: 'images/Ellipse229.png',
    comment:
      'Мій син розпочав навчання з абсолютно нульового рівня, і я вражена його прогресом. Вчителі створили підтримуюче середовище, яке допомогло йому швидко освоїти основи і почати впевнено спілкуватися. Зараз він демонструє чудові результати. Дуже вдячна за професійний підхід!',
  },
  {
    id: 3,
    name: 'Олександра',
    age: '26 років',
    image: 'images/Ellipse229 (1).png',
    comment:
      'Коли я почала навчання мій рівень англійської був майже нульовим. Але завдяки систематичному підходу і якісному навчальному процесу я змогла швидко прогресувати. Кожен урок допомагає мені вдосконалюватись, і я вже можу впевнено спілкуватися англійською у повсякденних ситуаціях.',
  },
  {
    id: 4,
    name: 'Іван',
    age: '23 роки',
    image: 'images/Ellipse229(3).png',
    comment:
      'Інтерактивні платформи, відео, сучасні методики роблять процес навчання надзвичайно динамічним і цікавим. Кожен урок я з нетерпінням чекаю нових інтерактивних завдань, які допомагають мені краще засвоювати матеріал і підтримують мотивацію на високому рівні.',
  },
  {
    id: 5,
    name: 'Святослав',
    age: '21 рік',
    image: 'images/Ellipse229(4).png',
    comment:
      'Однією з найбільших переваг школи є гнучкість навчального графіка, який легко підлаштовується під мій насичений розклад. Це значно спрощує процес навчання, дозволяючи планувати заняття так, щоб вони відповідали моєму розпорядку дня.',
  },
  {
    id: 6,
    name: 'Олена',
    age: '29 років',
    image: 'images/Ellipse229(5).png',
    comment:
      'Я завжди думала, що навчання англійської може бути нудним і монотонним, але Husto змінили моє уявлення. Кожен урок адаптований під мої особисті інтереси та рівень, що робить навчання дуже ефективним і захоплюючим. Я відчуваю, що отримую справжню підтримку у своєму навчанні.',
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
