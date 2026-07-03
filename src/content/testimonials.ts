export interface Testimonial {
  bg: { quote: string; attribution: string };
  en: { quote: string; attribution: string };
}

// ILLUSTRATIVE TESTIMONIALS — reflect the kind of feedback the business
// typically gets, but are not attributed to a specific named person or
// company (deliberately, to avoid misrepresenting them as verified quotes).
// Replace with real, permissioned client quotes as they become available —
// named where the client agrees, anonymized by role/sector otherwise.
export const testimonials: Testimonial[] = [
  {
    bg: {
      quote:
        "Изготвиха цялата документация за обекта ни без забавяне и бяхме напълно готови за проверка от инспектората.",
      attribution: "Управител, производствено предприятие",
    },
    en: {
      quote:
        "They prepared the full documentation for our site without delay, and we were completely ready for the inspection.",
      attribution: "Facility manager, manufacturing company",
    },
  },
  {
    bg: {
      quote:
        "Направиха оценка на риска на място и предложиха решение, съобразено с бюджета ни, без компромис с безопасността.",
      attribution: "Технически директор, търговска верига",
    },
    en: {
      quote:
        "They assessed the risk on-site and proposed a solution that fit our budget without compromising on safety.",
      attribution: "Technical director, retail chain",
    },
  },
  {
    bg: {
      quote:
        "Дойдоха до обекта ни извън София без проблем и оттогава поддържат системите ни абонаментно.",
      attribution: "Собственик, хотел",
    },
    en: {
      quote:
        "They came out to our site outside Sofia without any issue, and have maintained our systems on subscription ever since.",
      attribution: "Owner, hotel",
    },
  },
];
