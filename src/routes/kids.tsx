import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { PageHeader } from "../components/PageHeader";
import { ShopBrowser } from "../components/ShopBrowser";
import { CategoryTiles, EditorialSplit } from "../components/home/Sections";
import { SectionHeading } from "../components/ui";
import { sectionImages } from "../data/images";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/kids")({
  head: () => ({
    meta: [
      { title: "Bombay Kids | Kids Ethnic & Party Wear | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "Bombay Kids — little styles, big smiles. Party wear, ethnic wear, wedding looks and casuals for boys and girls in Gadhinglaj.",
      },
      { property: "og:title", content: "Bombay Kids | Little Styles. Big Smiles." },
      {
        property: "og:description",
        content:
          "Kidswear for weddings, festivals and everyday — an in-house collection from Bombay Cloth Center.",
      },
    ],
  }),
  component: KidsPage,
});

const edits = [
  { label: "Party Wear", detail: "Anarkalis, gowns and glitter for birthdays." },
  { label: "Ethnic Wear", detail: "Kurta sets, lehengas and dhoti sets." },
  { label: "Casual Wear", detail: "Soft cottons for school days and outings." },
  { label: "Boys", detail: "Sherwanis, Nehru jackets and kurta sets." },
  { label: "Girls", detail: "Lehengas, silk frocks and festive sets." },
  { label: "Wedding Looks", detail: "Complete family-function outfits." },
];

function KidsPage() {
  const { products, categories } = useStore();
  const pool = products.filter((p) => p.group === "Kids" && p.status === "Active");
  const slugs = categories
    .filter((c) => c.group === "Kids" && c.enabled)
    .map((c) => c.slug);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="An In-House Label"
        title="Bombay Kids"
        intro="Little Styles. Big Smiles. Wedding-ready ethnic wear, party dresses and everyday comfort for ages 2 to 12."
        trail={[{ label: "Home", to: "/" }, { label: "Bombay Kids" }]}
      />

      <section className="relative">
        <img
          src={sectionImages.kidsHero}
          alt="Children dressed in festive Indian ethnic wear from the Bombay Kids collection"
          width={1600}
          height={800}
          className="h-[42vh] min-h-64 w-full object-cover sm:h-[52vh]"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <p className="eyebrow text-gold">Bombay Kids</p>
            <p className="mt-3 max-w-md font-[family-name:var(--font-display)] text-2xl leading-tight text-primary-foreground sm:text-4xl">
              Little Styles. Big Smiles.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="What's Inside"
          title="Six Ways To Dress The Little Ones"
          intro="Every piece is chosen for how it feels after two hours of running around a wedding hall."
        />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {edits.map((edit) => (
            <div key={edit.label} className="bg-card p-6">
              <h3 className="text-lg">{edit.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {edit.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <EditorialSplit
        image={sectionImages.kidsGirls}
        alt="Young girl wearing an embroidered festive lehenga from Bombay Kids"
        eyebrow="For Girls"
        title="Twirl-Tested Festive Lehengas"
        body="Silk frocks, layered lehengas and Anarkali party dresses with soft linings, adjustable backs and embroidery that won't scratch."
        ctaLabel="Shop Girls"
        ctaTo="/category/girls-party-wear"
      />
      <EditorialSplit
        image={sectionImages.kidsBoys}
        alt="Young boy wearing an ivory kurta set with a Nehru jacket from Bombay Kids"
        eyebrow="For Boys"
        title="Small Sherwanis, Serious Style"
        body="Kurta sets, Nehru jackets and mini sherwanis cut from breathable fabrics — tailored in-store so sleeves are never too long."
        ctaLabel="Shop Boys"
        ctaTo="/category/boys-ethnic-wear"
        reverse
      />

      <CategoryTiles eyebrow="Departments" title="Browse Bombay Kids" slugs={slugs} />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <ShopBrowser pool={pool} lockGroup="Kids" />
      </div>
    </SiteLayout>
  );
}
