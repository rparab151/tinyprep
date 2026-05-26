import type { Cuisine } from "../domain/models";

export const cuisineLabels: Record<Cuisine, string> = {
  indian: "Indian",
  mexican: "Mexican",
  japanese: "Japanese",
  chinese: "Chinese",
  american: "American",
  mediterranean: "Mediterranean"
};

export const cuisineOptions: { id: Cuisine; label: string; description: string }[] = [
  {
    id: "indian",
    label: "Indian",
    description: "Soft dals, rice, mild veggie bites, yogurt, and gentle spices."
  },
  {
    id: "mexican",
    label: "Mexican",
    description: "Beans, tortillas, avocado, rice, squash, and soft family-style flavors."
  },
  {
    id: "japanese",
    label: "Japanese",
    description: "Rice bowls, tamago, tofu, miso-style vegetables, and easy finger foods."
  },
  {
    id: "chinese",
    label: "Chinese",
    description: "Congee, steamed eggs, dumpling bowls, soft noodles, and gentle aromatics."
  },
  {
    id: "american",
    label: "American",
    description: "Oats, muffins, turkey, sweet potatoes, yogurt, and freezer-friendly basics."
  },
  {
    id: "mediterranean",
    label: "Mediterranean",
    description: "Chickpeas, lentils, couscous, yogurt, olive oil, and soft vegetables."
  }
];
