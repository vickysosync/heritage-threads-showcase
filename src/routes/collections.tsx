import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { PageHeader } from "../components/PageHeader";
import { BannerRail, CollectionSection, ReviewsSection } from "../components/home/Sections";
import { SectionHeading } from "../components/ui";
import { sectionImages } from "../data/images";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections & Customer Reviews | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "Browse every Bombay Cloth Center collection — Bridal Edit, Maharashtrian Wedding, Festive Fashion, Men's Wedding Edit, Bombay Kids and Lagna Basta — plus customer reviews.",
      },
      { property: "og:title", content: "Collections | Bombay Cloth Center" },
      {
        property: "og:description",
        content:
          "Every seasonal edit from Gadhinglaj's heritage textile showroom, with reviews from local families.",
      },
    ],
  }),
  component: CollectionsPage,
});

const collectionOrder = [
  {
    name: "Bridal Edit",
    intro: "Lehengas and silks for the bride, chosen for weight, fall and finish.",
  },
  {
    name: "Maharashtrian Wedding",
    intro: "Paithani weaves and Nauvari-inspired festive styles.",
  },
  { name: "Festive Fashion", intro: "Sarees, kurtas, sharara sets and dress materials." },
  { name: "Men's Wedding Edit", intro: "Sherwanis, kurta sets, Nehru jackets and fabrics." },
  { name: "Bombay Kids", intro: "Little styles, big smiles — for ages 2 to 12." },
  { name: "Lagna Basta", intro: "Traditional Maharashtrian wedding gifting sets." },
  { name: "Family Wedding Wear", intro: "Coordinated looks for every relative." },
];

function CollectionsPage() {
  const { products } = useStore();
  const active = products.filter((p) => p.status === "Active");

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Curated Edits"
        title="Collections"
        intro="Every season we build a handful of edits around the celebrations our customers are shopping for. Here they all are."
        trail={[{ label: "Home", to: "/" }, { label: "Collections" }]}
      />

      <section>
        <img
          src={sectionImages.collectionsHero}
          alt="Rolls of silk and embroidered fabric arranged across the Bombay Cloth Center showroom counter"
          width={1600}
          height={800}
          className="h-[34vh] min-h-52 w-full object-cover sm:h-[46vh]"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <SectionHeading
          eyebrow="Index"
          title="Jump To A Collection"
          intro="Seven edits, refreshed with every wedding and festive season."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {collectionOrder.map((c) => (
            <a
              key={c.name}
              href={`#${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="border border-primary/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary hover:bg-primary/5"
            >
              {c.name}
            </a>
          ))}
        </div>
      </section>

      <BannerRail />

      {collectionOrder.map((c, i) => (
        <div key={c.name} id={c.name.toLowerCase().replace(/[^a-z]+/g, "-")}>
          <CollectionSection
            eyebrow="Collection"
            title={c.name}
            intro={c.intro}
            items={active.filter((p) => p.collections.includes(c.name))}
            ctaLabel="Shop All"
            ctaTo="/shop"
            tone={i % 2 === 1 ? "cream" : "default"}
          />
        </div>
      ))}

      <ReviewsSection />

      <section className="mx-auto max-w-3xl px-4 pb-20 text-center sm:px-6">
        <p className="text-sm text-muted-foreground">
          Looking for something you can't find here?{" "}
          <Link to="/contact" className="text-primary underline underline-offset-4">
            Ask the showroom
          </Link>{" "}
          — most requests are already in stock.
        </p>
      </section>
    </SiteLayout>
  );
}
