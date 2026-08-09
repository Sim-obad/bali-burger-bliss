import type { ReactElement } from "react";
import { type LucideIcon } from "lucide-react";

import { BurgerIcon } from "@/components/icons/BurgerIcon";
import { BeerIcon } from "@/components/icons/BeerIcon";
import { FriesIcon } from "@/components/icons/FriesIcon";
import { SundaeIcon } from "@/components/icons/SundaeIcon";
import { BaconIcon, CheeseIcon, JalapenoIcon, SauceIcon } from "@/components/icons/AddonIcons";

export type MenuIcon = LucideIcon | ((props: { className?: string; strokeWidth?: number }) => ReactElement);

export type MenuItem = {
  name: string;
  description?: string;
  /** Optional sub-section heading (Beer, Smoothies, Sundae...) */
  group?: string;
  /** Description shown once under the group heading */
  groupDescription?: string;
  /** Small handwritten note next to the name (on tap, M / L, 4 pcs / 8 pcs...) */
  note?: string;
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
  /** Small note displayed at the bottom of the card */
  footnote?: string;
};

/**
 * Single place to edit the menu content.
 * Add / remove items freely — the UI adapts.
 */
export const menuCategories: MenuCategory[] = [
  {
    id: "burgers",
    title: "Burgers",
    icon: BurgerIcon,
    tagline: "Smash beef or chicken, all on our potato buns.",
    priceColumns: ["Single", "Double"],
    items: [
      {
        group: "Smash Burgers",
        name: "Hamburger",
        description: "Beef patty, grilled onions, pickles, ketchup & yellow mustard",
        prices: ["95K", "125K"],
      },
      {
        group: "Smash Burgers",
        name: "Cheeseburger",
        description: "Beef patty, cheddar, pickles, house sauce",
        prices: ["95K", "125K"],
      },
      {
        group: "Smash Burgers",
        name: "Hot Honey",
        description: "Beef patty, grilled onions, pickles, ketchup & yellow mustard",
        prices: ["95K", "125K"],
      },
      {
        group: "Smash Burgers",
        name: "Bacon & Cheese",
        description: "Beef patty, cheddar, crispy bacon, grilled onions, smoky sauce",
        prices: ["95K", "125K"],
      },
      {
        group: "Chicken Burgers",
        name: "Crispy",
        description: "Crispy breaded chicken, lettuce, pickles, ranch sauce",
        price: "95K",
      },
      {
        group: "Chicken Burgers",
        name: "Spicy",
        description: "Marinated grilled chicken, cheddar, onions, jalapeño, spicy mayo",
        price: "95K",
      },
    ],
    extras: {
      title: "Extras",
      items: [
        { name: "Jalapeño", price: "+15k", icon: JalapenoIcon },
        { name: "Cheese", price: "+15k", icon: CheeseIcon },
        { name: "Bacon", price: "+15k", icon: BaconIcon },
      ],
    },
    footnote: "Prices include tax and service",
  },
  {
    id: "sides",
    title: "Sides",
    icon: FriesIcon,
    tagline: "Fries, loaded fries, tenders and chili cheese.",
    items: [
      { name: "Fries", note: "M / L", prices: ["95K", "125K"] },
      {
        name: "Loaded Fries",
        description: "Fries topped with melted cheddar, house sauce and crispy onions",
        price: "125K",
      },
      { name: "Chicken Tenders", note: "4 pcs / 8 pcs", prices: ["95K", "125K"] },
      { name: "Chili Cheese", note: "4 pcs / 8 pcs", prices: ["95K", "125K"] },
      { name: "Onion Rings", note: "M / L", prices: ["95K", "125K"] },
    ],
    extras: {
      title: "Sauce",
      items: [
        { name: "TPBC", price: "+15k", icon: SauceIcon },
        { name: "Ranch", price: "+15k", icon: SauceIcon },
        { name: "BBQ", price: "+15k", icon: SauceIcon },
        { name: "Spicy Mayo", price: "+15k", icon: SauceIcon },
      ],
    },
    footnote: "Prices include tax and service",
  },
  {
    id: "drinks",
    title: "Drinks",
    icon: BeerIcon,
    tagline: "Beers, Santai, fresh drinks, sodas and smoothies.",
    items: [
      {
        group: "Beer",
        name: "Kura Kura Lager",
        description: "Pilsner with crisp and dry notes of bread and honey — brewed fresh in Bali",
        note: "on tap · half / pint",
        prices: ["40K", "40K"],
      },
      {
        group: "Beer",
        name: "Kura Kura Island Ale",
        description: "Pale Ale with fruity & tropical hop aromas",
        note: "on tap · half / pint",
        prices: ["40K", "40K"],
      },
      { group: "Beer", name: "Singaraja", note: "small bottle", price: "40K" },
      {
        group: "Santai",
        name: "Lemon & Lime",
        description: "Sparkling alcoholic water, 4.5% ABV · low calorie · GF",
        price: "40K",
      },
      {
        group: "Santai",
        name: "Passion Fruit & Guava",
        description: "Sparkling alcoholic water, 4.5% ABV · low calorie · GF",
        price: "40K",
      },
      {
        group: "Fresh Drinks",
        name: "Iced Tea",
        description: "Homemade iced tea — no sugar added, sugar on request",
        price: "40K",
      },
      {
        group: "Fresh Drinks",
        name: "Iced Lemon Tea",
        description: "Homemade iced tea with fresh lemon",
        price: "40K",
      },
      {
        group: "Smoothies",
        name: "Pitaya Club",
        description: "Dragon fruit, banana, lime — blended with ice, no sugar added",
        price: "40K",
      },
      {
        group: "Smoothies",
        name: "Watermelon Wave",
        description: "Watermelon, dragon fruit, lime",
        price: "40K",
      },
      {
        group: "Smoothies",
        name: "Mango Heat",
        description: "Mango, passion fruit, lime",
        price: "40K",
      },
      { group: "Soft Drinks", name: "Coke", price: "40K" },
      { group: "Soft Drinks", name: "Coke Zero", price: "40K" },
      { group: "Soft Drinks", name: "Sprite", price: "40K" },
      { group: "Soft Drinks", name: "Sparkling Water", price: "40K" },
      { group: "Soft Drinks", name: "Still Water", price: "40K" },
    ],
    footnote: "Prices include tax and service",
  },

  {
    id: "desserts",
    title: "Sweets",
    icon: SundaeIcon,
    tagline: "Milkshakes, cookies, brownies and sundaes.",
    items: [
      {
        group: "Milkshakes",
        name: "Vanilla",
        groupDescription: "Made with ice cream and milk",
        price: "40K",
      },
      { group: "Milkshakes", name: "Chocolate", price: "40K" },
      { group: "Milkshakes", name: "Salted Caramel", price: "40K" },
      { group: "Milkshakes", name: "Strawberry", price: "40K" },
      { group: "Desserts", name: "Cookies", price: "40K" },
      { group: "Desserts", name: "Chocolate Brownie", price: "40K" },
      {
        group: "Sundae*",
        name: "Salted Caramel",
        description: "With peanuts on top",
        price: "40K",
      },
      { group: "Sundae", name: "Chocolate", description: "With peanuts on top", price: "40K" },
    ],
    extras: {
      title: "Add vanilla ice cream",
      items: [{ name: "On any dessert", price: "+40k" }],
    },
    footnote: "Prices include tax and service",
    footnote: "*Not available on Delivery",
  },
];
