import type { ReactElement } from "react";
import {
  CupSoda,
  Drumstick,
  IceCreamCone,
  Sandwich,
  TreePalm,
  type LucideIcon,
} from "lucide-react";

import { FriesIcon } from "@/components/icons/FriesIcon";

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  icon: LucideIcon | ((props: { className?: string; strokeWidth?: number }) => ReactElement);
  tagline: string;
  items: MenuItem[];
};

/**
 * Single place to edit the menu content.
 * Add / remove items freely — the UI adapts.
 */
export const menuCategories: MenuCategory[] = [
  {
    id: "smash-burgers",
    title: "Smash burgers",
    icon: Sandwich,
    tagline: "Hand-pressed patties, crispy edges, juicy inside.",
    items: [
      { name: "The Classic", description: "Beef patty, cheddar, pickles, house sauce", price: "—" },
      { name: "Double Smash", description: "Two patties, double cheese, onions", price: "—" },
      { name: "Bacon Club", description: "Beef, crispy bacon, cheddar, smoky mayo", price: "—" },
    ],
  },
  {
    id: "chicken-burgers",
    title: "Chicken burgers",
    icon: Drumstick,
    tagline: "Crispy or grilled chicken, bold flavors, made fresh.",
    items: [
      { name: "Crispy Chick", description: "Buttermilk fried chicken, slaw, mayo", price: "—" },
      { name: "Hot Honey", description: "Fried chicken, hot honey, pickles", price: "—" },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    icon: FriesIcon,
    tagline: "Fries, loaded fries, tenders, onion rings and more.",
    items: [
      { name: "Fries", price: "—" },
      { name: "Loaded Fries", description: "Cheese sauce, bacon bits, spring onion", price: "—" },
      { name: "Onion Rings", price: "—" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    icon: CupSoda,
    tagline: "Iced teas, sodas, beers & waters to keep it refreshing.",
    items: [
      { name: "Bintang", price: "—" },
      { name: "Iced Tea", price: "—" },
      { name: "Soft Drinks", price: "—" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    icon: IceCreamCone,
    tagline: "Cookies, brownies, sundaes and daily sweet treats.",
    items: [
      { name: "Brownie", price: "—" },
      { name: "Cookie", price: "—" },
    ],
  },
  {
    id: "merch",
    title: "Merch",
    icon: TreePalm,
    tagline: "T-shirts, caps, stickers and more from the club.",
    items: [
      { name: "T-shirt", price: "—" },
      { name: "Cap", price: "—" },
      { name: "Stickers", price: "—" },
    ],
  },
];
