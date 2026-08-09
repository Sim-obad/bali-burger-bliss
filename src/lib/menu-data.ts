import type { ReactElement } from "react";
import { CupSoda, Drumstick, type LucideIcon } from "lucide-react";

import { BurgerIcon } from "@/components/icons/BurgerIcon";
import { BeerIcon } from "@/components/icons/BeerIcon";
import { FriesIcon } from "@/components/icons/FriesIcon";
import { SundaeIcon } from "@/components/icons/SundaeIcon";
import { BaconIcon, CheeseIcon, JalapenoIcon, SauceIcon } from "@/components/icons/AddonIcons";

export type MenuIcon =
  | LucideIcon
  | ((props: { className?: string; strokeWidth?: number }) => ReactElement);

export type MenuItem = {
  name: string;
  description?: string;
  /** Single price column */
  price?: string;
  /** Multi-column prices, matching `priceColumns` order */
  prices?: string[];
};

export type MenuExtra = {
  name: string;
  price?: string;
  icon?: MenuIcon;
};

export type MenuCategory = {
  id: string;
  title: string;
  icon: MenuIcon;
  tagline: string;
  /** Handwritten column headers shown top-right above the prices */
  priceColumns?: string[];
  items: MenuItem[];
  /** Navy footer block (add-ons, sauces...) */
  extras?: {
    title: string;
    items: MenuExtra[];
  };
};

const burgerAddons = {
  title: "Add ons",
  items: [
    { name: "Bacon", icon: BaconIcon },
    { name: "Jalapeño", icon: JalapenoIcon },
    { name: "Cheese", icon: CheeseIcon },
  ],
} as const;

/**
 * Single place to edit the menu content.
 * Add / remove items freely — the UI adapts.
 */
export const menuCategories: MenuCategory[] = [
  {
    id: "smash-burgers",
    title: "Smash burgers",
    icon: BurgerIcon,
    tagline: "Hand-pressed patties, crispy edges, juicy inside.",
    priceColumns: ["Single", "Double"],
    items: [
      {
        name: "The Classic",
        description: "Beef patty, cheddar, pickles, house sauce",
        prices: ["—", "—"],
      },
      { name: "Double Smash", description: "Double cheese, onions", prices: ["—", "—"] },
      { name: "Bacon Club", description: "Crispy bacon, cheddar, smoky mayo", prices: ["—", "—"] },
    ],
    extras: { ...burgerAddons, items: [...burgerAddons.items] },
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
    extras: { ...burgerAddons, items: [...burgerAddons.items] },
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
    extras: {
      title: "Extra sauces",
      items: [
        { name: "Sauce 1", price: "—", icon: SauceIcon },
        { name: "Sauce 2", price: "—", icon: SauceIcon },
        { name: "Sauce 3", price: "—", icon: SauceIcon },
        { name: "Sauce 4", price: "—", icon: SauceIcon },
      ],
    },
  },
  {
    id: "drinks",
    title: "Soft drinks",
    icon: CupSoda,
    tagline: "Iced teas, sodas and waters to keep it refreshing.",
    items: [
      { name: "Iced Tea", price: "—" },
      { name: "Soft Drinks", price: "—" },
      { name: "Mineral Water", price: "—" },
    ],
  },
  {
    id: "alcoholic-drinks",
    title: "Alcoholic drinks",
    icon: BeerIcon,
    tagline: "Cold beers, cocktails and spirits for good times.",
    items: [
      { name: "Bintang", price: "—" },
      { name: "Cocktail of the day", price: "—" },
      { name: "Spirits", price: "—" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    icon: SundaeIcon,
    tagline: "Cookies, brownies, sundaes and daily sweet treats.",
    items: [
      { name: "Sundae", price: "—" },
      { name: "Brownie", price: "—" },
      { name: "Cookie", price: "—" },
    ],
  },
];
