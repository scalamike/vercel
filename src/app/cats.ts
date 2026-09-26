export type Cat = {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: "Female" | "Male";
  location: string;
  image: string;
  description: string;
  traits: string[];
  featured?: boolean;
};

export const cats: Cat[] = [
  {
    id: "miso",
    name: "Miso",
    breed: "Domestic shorthair",
    age: "2 years",
    gender: "Female",
    location: "Brooklyn, NY",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85",
    description:
      "A soft-hearted window watcher who believes every lap is an invitation.",
    traits: ["Gentle", "Lap cat", "Good with cats"],
    featured: true,
  },
  {
    id: "fig",
    name: "Fig",
    breed: "Tabby mix",
    age: "8 months",
    gender: "Male",
    location: "Queens, NY",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=85",
    description:
      "Equal parts curious explorer and enthusiastic toy-chaser. Fig makes an ordinary day feel like a little adventure.",
    traits: ["Playful", "Curious", "Good with kids"],
  },
  {
    id: "olive",
    name: "Olive",
    breed: "Tortoiseshell",
    age: "4 years",
    gender: "Female",
    location: "Brooklyn, NY",
    image:
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1000&q=85",
    description:
      "A quietly confident companion with a fondness for sunny spots and unhurried afternoons.",
    traits: ["Calm", "Independent", "Indoor only"],
  },
  {
    id: "mochi",
    name: "Mochi",
    breed: "Domestic longhair",
    age: "1 year",
    gender: "Male",
    location: "Jersey City, NJ",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85",
    description:
      "A friendly fluffball who greets new people with a slow blink and a hopeful purr.",
    traits: ["Affectionate", "Social", "Good with cats"],
  },
];