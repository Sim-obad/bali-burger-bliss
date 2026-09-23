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
    /** Force a 3-per-row centered layout in the extras block */
    columns?: number;
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
    tagline: "Smash beef or chicken, all on our Potato Buns.",
    priceColumns: ["Single", "Double"],
    items: [
      {
        group: "Smash Burgers",
        name: "Hamburger",
        description: "Wagyu beef patty, onions, pickles, ketchup,mayo & yellow mustard",
        prices: ["98K", "+50K"],
      },
      {
        group: "Smash Burgers",
        name: "Cheeseburger",
        description: "Wagyu beef patty, cheddar,onions, pickles & TPBC sauce",
        prices: ["118K", "+57K"],
      },
      {
        group: "Smash Burgers",
        name: "The Spicy",
        description: "Wagyu beef patty,onions, pickles jalapeños,green chili Lombok, spicy mayo",
        prices: ["128K", "+57K"],
      },
      {
        group: "Smash Burgers",
        name: "Bacon & Cheese",
        description: "Wagyu beef patty, cheddar, crispy bacon, caramelized onions & smoky sauce",
        prices: ["138K", "+57K"],
      },
      {
        group: "Chicken Burgers",
        name: "Crispy Chicken",
        description: "Crispy breaded chicken, lettuce, pickles, ranch sauce",
        price: "95K",
      },
      {
        group: "Chicken Burgers",
        name: "Spicy Chicken",
        description: "Grilled chicken, cheddar, onions, jalapeño, lettuce & spicy mayo",
        price: "105K",
      },
    ],
    extras: {
      title: "Extras",
      columns: 3,
      items: [
        { name: "Jalapeño", price: "8K", icon: JalapenoIcon },
        { name: "Cheese", price: "20K", icon: CheeseIcon },
        { name: "Bacon", price: "30K", icon: BaconIcon },
        { name: "Onions", price: "6K", icon: BaconIcon },
        { name: "Pickles", price: "8K", icon: BaconIcon },
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
      { name: "Fries", note: "M / L", prices: ["35K", "48K"], description: "served with ketchup sauce" },
      {
        name: "Bacon Loaded Fries",
        description: "Fries, cheddar sauce, crispy bacon, onions, pickles jalapeños & spicy mayo - GFO",
        price: "87K",
      },
      {
        name: "Chicken Loaded Fries",
        description: "Fries, cheddar sauce, chicken tenders, pickles & ranch sauce - GFO",
        price: "89K",
      },
      { name: "Chicken Tenders", note: "3 pcs - GF", price: "58K" },
      { name: "Chili Cheese", note: "Coming soon", price: "-" },
    ],
    extras: {
      title: "Sauce",
      items: [
        { name: "TPBC", price: "15K", icon: SauceIcon },
        { name: "Ranch", price: "15K", icon: SauceIcon },
        { name: "BBQ", price: "15K", icon: SauceIcon },
        { name: "Spicy Mayo", price: "15K", icon: SauceIcon },
      ],
    },
    footnote: "Prices include tax and service",
  },
  {
    id: "drinks",
    title: "Drinks",
    icon: BeerIcon,
    tagline: "Beers, Santai, fresh drinks,soda and sparkling water.",
    items: [
      {
        group: "Beer",
        name: "Kura Kura Lager",
        description: "Pilsner with crisp and dry notes of bread and honey — brewed fresh in Bali",
        note: "on tap · small / large",
        prices: ["57K", "89K"],
      },
      {
        group: "Beer",
        name: "Kura Kura Island Ale",
        description: "Pale Ale with fruity & tropical hop aromas",
        note: "on tap · small / large",
        prices: ["68K", "99K"],
      },
      {
        group: "Santai",
        name: "Lemon & Lime",
        description: "Sparkling alcoholic water, 4.5% ABV · low cal · GF",
        price: "57K",
      },
      {
        group: "Santai",
        name: "Passion Fruit & Guava",
        description: "Sparkling alcoholic water, 4.5% ABV · low cal · GF",
        price: "57K",
      },
      {
        group: "Fresh Drinks",
        groupDescription: "No sugar added, sugar on request",
        name: "Iced Tea",
        description: "Homemade iced tea",
        price: "30K",
      },
      {
        group: "Fresh Drinks",
        name: "Iced Lemon Tea",
        description: "Homemade iced tea with fresh lemon",
        price: "30K",
      },

      { group: "Soft Drinks", name: "Coke", price: "25K" },
      { group: "Soft Drinks", name: "Coke Zero", price: "25K" },
      { group: "Soft Drinks", name: "Sprite", price: "25K" },
      { group: "Soft Drinks", name: "Sparkling Water", price: "25K" },
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
        price: "65K",
      },
      { group: "Milkshakes", name: "Chocolate", price: "68K" },
      { group: "Milkshakes", name: "Salted Caramel", price: "68K" },
      { group: "Desserts", name: "Cookies", price: "38K" },
      { group: "Desserts", name: "Brownie", price: "38K" },
      {
        group: "Sundae*",
        groupDescription: "Made with Soft Serve Vanilla Ice cream",
        name: "Plain",
        description: "",
        price: "38K",
      },
      { group: "Sundae*", name: "Caramel", description: "", price: "45K" },
      { group: "Sundae*", name: "Chocolate", description: "", price: "45K" },
    ],
    extras: {
      title: "Add vanilla ice cream",
      items: [{ name: "On any dessert", price: "20K" }],
    },
    footnote: "*Not available on Delivery · Prices include tax and service",
  },
];
