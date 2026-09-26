"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  PawPrint,
  Search,
  X,
} from "lucide-react";
import { cats as sampleCats, type Cat } from "./cats";

type Filter = "All cats" | "Kittens" | "Adults" | "Favorites";

function CatCard({
  cat,
  isFavorite,
  onFavorite,
  onOpen,
}: {
  cat: Cat;
  isFavorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="cat-card">
      <button
        className="cat-card__photo"
        onClick={onOpen}
        aria-label={`Meet ${cat.name}`}
      >
        <Image
          src={cat.image}
          alt={`${cat.name}, a ${cat.breed}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
          unoptimized
        />
        {cat.featured && <span className="photo-label">A little favorite</span>}
      </button>
      <div className="cat-card__body">
        <div className="cat-card__heading">
          <div>
            <h3>{cat.name}</h3>
            <p>{cat.breed}</p>
          </div>
          <button
            className={`icon-button favorite-button${isFavorite ? " is-active" : ""}`}
            onClick={onFavorite}
            aria-label={isFavorite ? `Remove ${cat.name} from favorites` : `Add ${cat.name} to favorites`}
            aria-pressed={isFavorite}
          >
            <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="cat-card__meta">
          <span>{cat.age}</span>
          <span className="meta-dot" aria-hidden="true" />
          <span>{cat.gender}</span>
        </div>
        <p className="cat-card__description">{cat.description}</p>
        <div className="cat-card__footer">
          <span className="cat-location">
            <MapPin size={14} /> {cat.location}
          </span>
          <button className="text-button" onClick={onOpen}>
            Meet {cat.name} <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CatExplorer({
  catList = sampleCats,
}: {
  catList?: Cat[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All cats");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  const visibleCats = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return catList.filter((cat) => {
      const matchesQuery = [
        cat.name,
        cat.breed,
        cat.location,
        ...cat.traits,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
      const age = Number.parseInt(cat.age, 10);
      const isKitten = cat.age.includes("month") || age < 1;
      const matchesFilter =
        filter === "All cats" ||
        (filter === "Kittens" && isKitten) ||
        (filter === "Adults" && !isKitten) ||
        (filter === "Favorites" && favorites.includes(cat.id));

      return matchesQuery && matchesFilter;
    });
  }, [catList, favorites, filter, query]);

  function toggleFavorite(catId: string) {
    setFavorites((current) =>
      current.includes(catId)
        ? current.filter((favoriteId) => favoriteId !== catId)
        : [...current, catId],
    );
  }

  return (
    <main className="shelter-page">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Little Paws home">
          <span className="wordmark__mark"><PawPrint size={18} /></span>
          <span>little paws<span className="wordmark__period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="main-nav__active" href="#cats">Find a cat</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <a className="header-cta" href="mailto:hello@littlepaws.example">
          Say hello <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="intro" id="top">
        <div className="intro__copy">
          <p className="eyebrow"><span /> GOOD CATS, GOOD HOMES</p>
          <h1>Find your<br /><em>kind of</em> cat.</h1>
          <p className="intro__description">
            Small introductions, big love. Meet the cats looking for a place to call home.
          </p>
          <a className="intro__link" href="#cats">
            See who&apos;s waiting <ArrowRight size={16} />
          </a>
        </div>
        <div className="intro__art" aria-label="Miso, a cat available for adoption">
          <Image
            src={(catList[0] ?? sampleCats[0]).image}
            alt="A curious cat looking into the camera"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 46vw"
            unoptimized
          />
          <div className="intro__note">
            <span className="intro__note-label">THIS WEEK&apos;S HELLO</span>
            <span className="intro__note-name">Miso, 2 years</span>
            <span className="intro__note-caption">Soft heart. Excellent lap manners.</span>
          </div>
          <span className="intro__stamp">MEOW<br />&nbsp;THERE</span>
        </div>
        <div className="intro__side-note">A little more purring, a little less scrolling.</div>
      </section>

      <section className="catalog" id="cats">
        <div className="catalog__topline">
          <div>
            <p className="eyebrow">THE INTRODUCTION LIST</p>
            <h2>Someone is waiting.</h2>
          </div>
          <p className="catalog__count"><strong>{visibleCats.length.toString().padStart(2, "0")}</strong> cats to meet</p>
        </div>

        <div className="catalog__tools">
          <div className="filter-tabs" role="group" aria-label="Filter cats">
            {(["All cats", "Kittens", "Adults", "Favorites"] as Filter[]).map((item) => (
              <button
                key={item}
                className={`filter-tab${filter === item ? " is-selected" : ""}`}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}{item === "Favorites" && favorites.length > 0 ? ` (${favorites.length})` : ""}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search cats</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, breed, or personality"
            />
            <kbd>/</kbd>
          </label>
        </div>

        {visibleCats.length > 0 ? (
          <div className="cat-grid">
            {visibleCats.map((cat) => (
              <CatCard
                key={cat.id}
                cat={cat}
                isFavorite={favorites.includes(cat.id)}
                onFavorite={() => toggleFavorite(cat.id)}
                onOpen={() => setSelectedCat(cat)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <PawPrint size={28} />
            <h3>No cats found just yet.</h3>
            <p>Try another name, personality, or filter.</p>
            <button onClick={() => { setFilter("All cats"); setQuery(""); }}>
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="how-it-works" id="how-it-works">
        <span className="how-it-works__number">01 / A GOOD START</span>
        <p>Every cat is more than a photo. We&apos;ll help you meet, ask the right questions, and find a match that feels like yours.</p>
        <a href="mailto:hello@littlepaws.example">Get to know us <ArrowUpRight size={16} /></a>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#top"><span className="wordmark__mark"><PawPrint size={16} /></span><span>little paws<span className="wordmark__period">.</span></span></a>
        <span>Made for the ones who make a house a home.</span>
        <span>NYC & nearby <span aria-hidden="true">♥</span></span>
      </footer>

      {selectedCat && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedCat(null);
        }}>
          <section className="cat-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="icon-button cat-modal__close" onClick={() => setSelectedCat(null)} aria-label="Close details">
              <X size={20} />
            </button>
            <div className="cat-modal__photo">
              <Image src={selectedCat.image} alt={`${selectedCat.name}, a ${selectedCat.breed}`} fill sizes="(max-width: 700px) 90vw, 430px" unoptimized />
            </div>
            <div className="cat-modal__content">
              <p className="eyebrow">YOUR NEXT LITTLE HELLO</p>
              <h2 id="modal-title">Meet {selectedCat.name}.</h2>
              <p className="cat-modal__meta">{selectedCat.age} <span>·</span> {selectedCat.gender} <span>·</span> {selectedCat.breed}</p>
              <p className="cat-modal__description">{selectedCat.description}</p>
              <div className="trait-list">
                {selectedCat.traits.map((trait) => <span key={trait}>{trait}</span>)}
              </div>
              <p className="cat-modal__location"><MapPin size={15} /> {selectedCat.location}</p>
              <a className="modal-cta" href={`mailto:hello@littlepaws.example?subject=${encodeURIComponent(`I'd love to meet ${selectedCat.name}`)}`}>
                Ask about {selectedCat.name} <ArrowRight size={17} />
              </a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}