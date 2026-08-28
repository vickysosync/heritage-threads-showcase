import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { PageHeader } from "../components/PageHeader";
import { CollectionSection, EditorialSplit } from "../components/home/Sections";
import { Button, SectionHeading } from "../components/ui";
import { sectionImages } from "../data/images";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/lagna-basta")({
  head: () => ({
    meta: [
      { title: "Lagna Basta | Maharashtrian Wedding Trousseau Sets | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "The signature Lagna Basta collection — traditional Maharashtrian wedding gifting sets for the bride's and groom's families, curated in Gadhinglaj since 1965.",
      },
      { property: "og:title", content: "The Signature Lagna Basta Collection" },
      {
        property: "og:description",
        content:
          "Gift-ready saree combinations and textile hampers for Maharashtrian wedding traditions.",
      },
    ],
  }),
  component: LagnaBastaPage,
});

const sets = [
  {
    title: "Traditional Wedding Gifting Sets",
    body: "Ready-to-gift combinations wrapped in the traditional basta cloth, arranged by ceremony.",
  },
  {
    title: "Bride Family Sets",
    body: "Sarees for the mother, aunts and sisters — coordinated in a single palette.",
  },
  {
    title: "Groom Family Sets",
    body: "Kurta sets, shirting and suiting lengths with matching dupattas for the men.",
  },
  {
    title: "Saree Combinations",
    body: "Curated sets of three, five or eleven sarees at a fixed, honest price.",
  },
  {
    title: "Gift-Ready Textile Sets",
    body: "Boxed and labelled so nothing gets mixed up on the wedding morning.",
  },
  {
    title: "Festive Gifting Options",
    body: "Smaller hampers for Diwali, Padwa, Sankranti and haldi-kunku gatherings.",
  },
];

function LagnaBastaPage() {
  const { products, homepage, settings } = useStore();
  const items = products.filter(
    (p) => p.status === "Active" && p.collections.includes("Lagna Basta"),
  );
  const maharashtrian = products.filter(
    (p) => p.status === "Active" && p.collections.includes("Maharashtrian Wedding"),
  );

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Signature Tradition"
        title={homepage.lagnaBastaHeading}
        intro={homepage.lagnaBastaBody}
        trail={[{ label: "Home", to: "/" }, { label: "Lagna Basta" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="What A Basta Includes"
          title="Six Curations, Built Around Your Guest List"
          intro="Tell us the number of relatives on each side and we assemble the basta with you at the counter."
        />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {sets.map((set) => (
            <div key={set.title} className="bg-card p-6">
              <h3 className="text-lg leading-snug">{set.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{set.body}</p>
            </div>
          ))}
        </div>
      </section>

      <EditorialSplit
        image={sectionImages.lagnaBastaDetail}
        alt="Stacked silk sarees and textiles arranged as a traditional Maharashtrian Lagna Basta gifting set"
        eyebrow="How It Works"
        title="Assembled With You, Not Sold To You"
        body="Bring your family list. We lay out the sarees, fabrics and kurta pieces on the counter, adjust the palette until everyone is happy, then pack and label each bundle by name."
        ctaLabel="Visit The Showroom"
        ctaTo="/contact"
      />

      <CollectionSection
        eyebrow="Shop The Collection"
        title="Lagna Basta Sets"
        items={items}
        ctaLabel="See All"
        ctaTo="/category/lagna-basta"
        tone="cream"
      />

      <CollectionSection
        eyebrow="Maharashtrian Wedding"
        title="Paithani, Nauvari & Wedding Silks"
        intro="The weaves that belong in every Maharashtrian wedding basta."
        items={maharashtrian}
        ctaLabel="Shop Silks"
        ctaTo="/category/wedding-sarees"
      />

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold">Ready When You Are</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Explore Lagna Basta</h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            Call ahead and we'll keep the basta options set aside for your visit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${settings.phoneDigits}?text=${encodeURIComponent(
                "Hello Bombay Cloth Center, I would like to know more about Lagna Basta sets.",
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="gold" size="lg">
                Enquire On WhatsApp
              </Button>
            </a>
            <Link to="/shop">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
