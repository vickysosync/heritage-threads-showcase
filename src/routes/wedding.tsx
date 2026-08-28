import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { PageHeader } from "../components/PageHeader";
import {
  CollectionSection,
  EditorialSplit,
  LagnaBastaSection,
} from "../components/home/Sections";
import { Button, SectionHeading } from "../components/ui";
import { sectionImages } from "../data/images";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/wedding")({
  head: () => ({
    meta: [
      { title: "Wedding Collection | Bridal, Groom & Lagna Basta | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "Plan your entire wedding shopping in one showroom — bridal lehengas, wedding sarees, groom sherwanis, family wear and Lagna Basta sets in Gadhinglaj.",
      },
      { property: "og:title", content: "Wedding Collection | Bombay Cloth Center" },
      {
        property: "og:description",
        content:
          "Bridal, groom, family wedding fashion and Maharashtra's traditional Lagna Basta, curated since 1965.",
      },
    ],
  }),
  component: WeddingPage,
});

function WeddingPage() {
  const { products, homepage, settings } = useStore();
  const active = products.filter((p) => p.status === "Active");
  const byCollection = (name: string) =>
    active.filter((p) => p.collections.includes(name));
  const byCategory = (name: string) => active.filter((p) => p.category === name);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Wedding Season 2026"
        title={homepage.weddingHeading}
        intro={homepage.weddingBody}
        trail={[{ label: "Home", to: "/" }, { label: "Wedding" }]}
      />

      <section className="relative">
        <img
          src={sectionImages.weddingHero}
          alt="Maharashtrian wedding couple in traditional silk wedding attire"
          width={1600}
          height={800}
          className="h-[44vh] min-h-64 w-full object-cover sm:h-[56vh]"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
            <p className="eyebrow text-gold">The Wedding Edit</p>
            <h2 className="mt-3 max-w-xl text-2xl leading-tight text-primary-foreground sm:text-4xl">
              One Showroom. Every Ceremony. Every Relative.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${settings.phoneDigits}?text=${encodeURIComponent(
                  "Hello Bombay Cloth Center, I would like to plan my wedding shopping.",
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="gold" size="lg">
                  Plan Your Wedding Shopping
                </Button>
              </a>
              <Link to="/lagna-basta">
                <Button variant="outline" size="lg" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Lagna Basta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CollectionSection
        eyebrow="For The Bride"
        title="Bridal Collection"
        intro="Lehengas and silk sarees chosen for weight, fall and the way they photograph under mandap lighting."
        items={[...byCollection("Bridal Collection"), ...byCollection("Bridal Edit")].filter(
          (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i,
        )}
        ctaLabel="Shop Bridal"
        ctaTo="/category/bridal-collection"
      />

      <CollectionSection
        eyebrow="For The Groom"
        title="Groom Collection"
        intro="Sherwanis, kurta sets and Nehru jackets with in-house alteration before the muhurat."
        items={[...byCollection("Groom Collection"), ...byCollection("Men's Wedding Edit")].filter(
          (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i,
        )}
        ctaLabel="Shop Groom"
        ctaTo="/category/groom-collection"
        tone="cream"
      />

      <EditorialSplit
        image={sectionImages.weddingFamily}
        alt="Extended Indian family in coordinated wedding outfits at a reception"
        eyebrow="For Everyone Else"
        title="Family Wedding Fashion"
        body="Aunts, uncles, cousins and grandparents — coordinate the whole family's palette in a single visit, with sarees, kurtas and suiting fabrics stocked in matching tones."
        ctaLabel="Shop Family Wear"
        ctaTo="/category/family-wedding-wear"
      />

      <LagnaBastaSection />

      <CollectionSection
        eyebrow="Silks"
        title="Wedding Sarees"
        intro="Paithani, Banarasi and Kanchipuram weaves for the ceremony and the receptions after it."
        items={[...byCategory("Wedding Sarees"), ...byCategory("Bridal Sarees"), ...byCategory("Silk Sarees")].filter(
          (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i,
        )}
        ctaLabel="Shop Sarees"
        ctaTo="/category/wedding-sarees"
      />

      <CollectionSection
        eyebrow="Grand Entrances"
        title="Wedding Lehengas"
        items={[...byCategory("Lehengas"), ...byCategory("Wedding Lehengas")].filter(
          (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i,
        )}
        ctaLabel="Shop Lehengas"
        ctaTo="/category/wedding-lehengas"
        tone="cream"
      />

      <CollectionSection
        eyebrow="Menswear"
        title="Sherwanis"
        items={byCategory("Sherwanis")}
        ctaLabel="Shop Sherwanis"
        ctaTo="/category/sherwanis"
      />

      <EditorialSplit
        image={sectionImages.weddingEditorial}
        alt="Editorial portrait of festive family looks in gold and maroon ethnic wear"
        eyebrow="Festive Family Looks"
        title="Haldi, Mehndi, Sangeet, Reception"
        body="Four functions need four looks. Our team builds a function-by-function plan for the whole family so nothing is repeated in the photographs."
        ctaLabel="Talk To Our Team"
        ctaTo="/contact"
        reverse
      />

      <section className="bg-cream/50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading
            eyebrow="Book A Consultation"
            title="Plan Your Wedding Shopping"
            intro="Tell us your dates, your functions and your budget. We'll keep the collection ready before you arrive at the showroom."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button size="lg">Contact The Showroom</Button>
            </Link>
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
              <Button variant="outline" size="lg">
                Call {settings.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
