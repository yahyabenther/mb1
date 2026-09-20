import { Car, ShoppingBag, BarChart3, Briefcase, LayoutGrid, Smartphone } from "lucide-react";
import type { IconKey } from "../types/firestore";

export const iconMap: Record<IconKey, typeof Car> = {
  car: Car,
  "shopping-bag": ShoppingBag,
  "bar-chart": BarChart3,
  briefcase: Briefcase,
  "layout-grid": LayoutGrid,
  smartphone: Smartphone,
};