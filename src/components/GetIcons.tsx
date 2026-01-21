import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

type AnyIcon = IconType | LucideIcon;

export const getIconComponent = (
  iconName: string,
  library: "lucide" | "fa" = "fa"
): AnyIcon => {
  console.log("🚀iconName --->", iconName);
  if (library === "fa") {
    const name = iconName.startsWith("Fa") ? iconName : `Fa${iconName}`;
    console.log("🚀name --->", name);
    return (FaIcons as any)[name] || FaIcons.FaRegCircle;
  }

  return (LucideIcons as any)[iconName] || LucideIcons.Play;
};
