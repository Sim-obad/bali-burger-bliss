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
    tagline: "Smash beef or chicken, all on our Potato Buns.",
    priceColumns: ["Single", "Double"],
    items: [
      {
        group: "Smash Burgers",
        name: "Hamburger",
        description: "Beef patty, onions, pickles, ketchup,mayo & yellow mustard",
        prices: ["-", "-"],
      },
      {
        group: "Smash Burgers",
        name: "Cheeseburger",
        description: "Beef patty, cheddar,onions, pickles, TPBC sauce",
        prices: ["-", "-"],
      },
      {
        group: "Smash Burgers",
        name: "The Spicy",
        description: "Beef patty,onions, pickles jalapeños,green chili Lombok, spicy mayo",
        prices: ["-", "-"],
      },
      {
        group: "Smash Burgers",
        name: "Bacon & Cheese",
        description: "Beef patty, cheddar, crispy bacon, caramelized onions, lettuce & smoky sauce",
        prices: ["-", "-"],
      },
      {
        group: "Chicken Burgers",
        name: "Crispy Chicken",
        description: "Crispy breaded chicken, lettuce, pickles, ranch sauce",
        price: "-",
      },
      {
        group: "Chicken Burgers",
        name: "Spicy",
        description: "Marinated grilled chicken, cheddar, onions, jalapeño, lettuce & spicy mayo",
        price: "-",
      },
    ],
    extras: {
      title: "Extras",
      items: [
        { name: "Jalapeño", price: "+-", icon: JalapenoIcon },
        { name: "Cheese", price: "-", icon: CheeseIcon },
        { name: "Bacon", price: "-", icon: BaconIcon },
        { name: "Onions", price: "-", icon: BaconIcon },
        { name: "Pickles", price: "-", icon: BaconIcon },
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
      { name: "Fries", note: "M / L", prices: ["-", "-"] },
      {
        name: "Bacon Loaded Fries",
        description: "Fries topped with melted cheddar, bacon, onions, pickles jalapeños & spicy mayo",
        price: "-",
      },
      {
        name: "Chicken Loaded Fries",
        description: "Fries topped with melted cheddar, chicken tenders, pickles, spring onion & ranch sauce",
        price: "-",
      },
      { name: "Chicken Tenders", note: "3 pcs / 5 pcs", prices: ["-", "-"] },
      { name: "Chili Cheese", note: "3 pcs / 5 pcs", prices: ["-", "-"] },
    ],
    extras: {
      title: "Sauce",
      items: [
        { name: "TPBC", price: "-", icon: SauceIcon },
        { name: "Ranch", price: "-", icon: SauceIcon },
        { name: "BBQ", price: "-", icon: SauceIcon },
        { name: "Spicy Mayo", price: "-", icon: SauceIcon },
      ],
    },
    footnote: "Prices include tax and service",
  },
  {
    id: "drinks",
    title: "Drinks",
    icon: BeerIcon,
    tagline: "Beers, Santai, fresh drinks, smoothies, soda and water.",
    items: [
      {
        group: "Beer",
        name: "Kura Kura Lager",
        description: "Pilsner with crisp and dry notes of bread and honey — brewed fresh in Bali",
        note: "on tap · small / large",
        prices: ["-", "-"],
      },
      {
        group: "Beer",
        name: "Kura Kura Island Ale",
        description: "Pale Ale with fruity & tropical hop aromas",
        note: "on tap · small / large",
        prices: ["-", "-"],
      },
      {
        group: "Santai",
        name: "Lemon & Lime",
        description: "Sparkling alcoholic water, 4.5% ABV · low calorie · GF",
        price: "-",
      },
      {
        group: "Santai",
        name: "Passion Fruit & Guava",
        description: "Sparkling alcoholic water, 4.5% ABV · low calorie · GF",
        price: "-",
      },
      {
        group: "Fresh Drinks",
        groupDescription: "No sugar added, sugar on request",
        name: "Iced Tea",
        description: "Homemade iced tea",
        price: "-",
      },
      {
        group: "Fresh Drinks",
        name: "Iced Lemon Tea",
        description: "Homemade iced tea with fresh lemon",
        price: "-",
      },
      {
        group: "Smoothies",
        name: "Dragon Club",
        description: "Dragon fruit, banana, lime — blended with ice, no sugar added",
        price: "-",
      },
      {
        group: "Smoothies",
        name: "Watermelon Club",
        description: "Watermelon, dragon fruit, lime",
        price: "-",
      },
      {
        group: "Smoothies",
        name: "Mango Club",
        description: "Mango, passion fruit, lime",
        price: "-",
      },
      { group: "Soft Drinks", name: "Coke", price: "-" },
      { group: "Soft Drinks", name: "Coke Zero", price: "-" },
      { group: "Soft Drinks", name: "Sprite", price: "-" },
      { group: "Soft Drinks", name: "Sparkling Water", price: "-" },
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
        price: "-",
      },
      { group: "Milkshakes", name: "Chocolate", price: "-" },
      { group: "Milkshakes", name: "Salted Caramel", price: "-" },
      { group: "Desserts", name: "Cookies", price: "-" },
      { group: "Desserts", name: "Chocolate Cake", price: "-" },
      {
        group: "Sundae*",
        name: "Salted Caramel",
        description: "",
        price: "-",
      },
      { group: "Sundae*", name: "Chocolate", description: "", price: "-" },
    ],
    extras: {
      title: "Add vanilla ice cream",
      items: [{ name: "On any dessert", price: "-" }],
    },
    footnote: "*Not available on Delivery · Prices include tax and service",
  },
];
