import Image from "next/image";
import { getLocale } from "next-intl/server";

// Real Protecta products, grouped by the situation they are used in, each group
// with the normative sentence that applies. Product photos: Protecta, published
// through Red Birch, the exclusive representative of Protecta in Bulgaria.

const SEAL = "#B45309";

type Product = {
  name: string;
  img: string;
  bg: string;
  en: string;
};

type Group = {
  bg: { t: string; rule: string };
  en: { t: string; rule: string };
  products: Product[];
};

const groups: Group[] = [
  {
    bg: {
      t: "Пластмасови и метални тръби през стена или под",
      rule: "Отворите, през които преминават тръбопроводи, се уплътняват, без да се намалява огнеустойчивостта на преградата.",
    },
    en: {
      t: "Plastic and metal pipes through a wall or floor",
      rule: "Openings through which pipes pass are sealed without reducing the fire resistance of the barrier.",
    },
    products: [
      {
        name: "FR Collar",
        img: "fr-collar.jpg",
        bg: "Пръстен за инсталации, преминаващи през стени и подове",
        en: "Collar for services passing through walls and floors",
      },
      {
        name: "FR Pipe Wrap",
        img: "fr-pipe-wrap.jpg",
        bg: "Обвивка за пластмасови и метални тръби през стени и подове",
        en: "Wrap for plastic and metal pipes through walls and floors",
      },
    ],
  },
  {
    bg: {
      t: "Кабели и кабелни трасета",
      rule: "Отворите, през които преминават кабели и други съоръжения, се уплътняват, без да се намалява огнеустойчивостта на преградата.",
    },
    en: {
      t: "Cables and cable routes",
      rule: "Openings through which cables and other services pass are sealed without reducing the fire resistance of the barrier.",
    },
    products: [
      {
        name: "Service Transit",
        img: "service-transit.png",
        bg: "Преминаване на непрекъснати кабели и пластмасови тръби през стени и подове",
        en: "Continuous cables and plastic pipes through walls and floors",
      },
    ],
  },
  {
    bg: {
      t: "Линейни фуги",
      rule: "Линейните фуги, пресичащи пожарозащитните прегради, се уплътняват, без да се намалява огнеустойчивостта им.",
    },
    en: {
      t: "Linear joints",
      rule: "Linear joints crossing fire barriers are sealed without reducing their fire resistance.",
    },
    products: [
      {
        name: "FR Foam",
        img: "fr-foam.jpg",
        bg: "Пяна за запълване на линейни процепи в гипсокартон, бетон и зидария",
        en: "Foam for filling linear gaps in drywall, concrete and masonry",
      },
      {
        name: "FR Acrylic",
        img: "fr-acrylic.jpg",
        bg: "Уплътнител за фуги и отвори в пожарозащитни стени и подове",
        en: "Sealant for joints and openings in fire-rated walls and floors",
      },
    ],
  },
  {
    bg: {
      t: "Големи отвори с няколко инсталации",
      rule: "Системите за уплътняване са с клас по устойчивост на огън при двустранно огнево въздействие.",
    },
    en: {
      t: "Large openings with several services",
      rule: "Sealing systems have a fire resistance class under two-sided fire exposure.",
    },
    products: [
      {
        name: "FR Board",
        img: "fr-board.jpg",
        bg: "Плоча за отвори в стени и подове с множество инсталации",
        en: "Board for openings in walls and floors with multiple services",
      },
      {
        name: "EX Mortar",
        img: "ex-mortar.jpg",
        bg: "Сух състав на прах за уплътняване",
        en: "Dry powder fire sealing compound",
      },
    ],
  },
  {
    bg: {
      t: "Вентилационни канали",
      rule: "При преминаване през пожарозащитни прегради топлоизолацията на въздухопровода се прекъсва от продукти с клас по реакция на огън не по-нисък от А2.",
    },
    en: {
      t: "Ventilation ducts",
      rule: "Where a duct passes through a fire barrier, its thermal insulation is interrupted with products of reaction-to-fire class not lower than A2.",
    },
    products: [
      {
        name: "FR Damper",
        img: "fr-damper.png",
        bg: "Огнезащита на вентилационни канали през пожарозащитни конструкции",
        en: "Fire protection of ventilation ducts through fire-rated constructions",
      },
    ],
  },
  {
    bg: {
      t: "Контакти и ключове в леки стени",
      rule: "Отворите и съоръженията през пожарозащитни прегради се уплътняват, без да се намалява нормативната огнеустойчивост на преградата.",
    },
    en: {
      t: "Sockets and switches in light walls",
      rule: "Openings and services through fire barriers are sealed without reducing the normative fire resistance of the barrier.",
    },
    products: [
      {
        name: "FR Putty Pad",
        img: "fr-putty-pad.jpg",
        bg: "Негъстяща се подложка за контакти и ключове",
        en: "Non-setting putty pad for sockets and switches",
      },
      {
        name: "FR Graphite Plate",
        img: "fr-graphite-plate.jpg",
        bg: "Интумесцентна плоча за пластмасови кутии в леки стени",
        en: "Intumescent plate for plastic wall boxes in flexible walls",
      },
    ],
  },
];

export async function ProtectaProducts() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const credit =
    lang === "en"
      ? "Product photos: Protecta. Used through our partner Red Birch, which holds the rights to them."
      : "Снимки на продуктите: Protecta. Ползвани чрез партньора ни Red Birch, който има правата за тях.";

  return (
    <figure className="not-prose my-8">
      <ol className="space-y-4">
        {groups.map((g, i) => (
          <li key={g.bg.t} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-900"
                style={{ background: "#FBBF24", border: `1.5px solid ${SEAL}` }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-base font-semibold leading-snug text-slate-900">{g[lang].t}</p>
                <p className="mt-1 text-sm leading-snug text-slate-600">{g[lang].rule}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
              {g.products.map((p) => (
                <div key={p.name} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <Image
                    src={`/blog/protecta/${p.img}`}
                    alt={`Protecta ${p.name}`}
                    width={600}
                    height={600}
                    sizes="(min-width: 640px) 220px, 45vw"
                    className="aspect-square w-full object-contain"
                    style={{ background: "#EDEDED" }}
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-900">Protecta {p.name}</p>
                    <p className="mt-1 text-xs leading-snug text-slate-600">{p[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-xs text-slate-500">{credit}</figcaption>
    </figure>
  );
}
