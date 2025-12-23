import React from "react";
import { Mail } from "lucide-react";
import { DotIcon } from "lucide-react";
import { Check } from "lucide-react";
import { ReactNode } from "react";

/** Refined color palette inspired by modern design systems */
const pastelBg = {
  Danger: "#FEE2E2",
  Success: "#D1FAE5",
  Warning: "#FEF3C7",
  Info: "#DBEAFE",
  Teal: "#CCFBF1",
  Purple: "#EDE9FE",
  Blue: "#DBEAFE",
  Default: "#E8E8E8",
  Orange: "#FFEDD5",
};

const pastelSolid = {
  Danger: "#DC2626",
  Success: "#10B981",
  Warning: "#F59E0B",
  Info: "#3B82F6",
  Teal: "#14B8A6",
  Purple: "#8B5CF6",
  Blue: "#3B82F6",
  Default: "#6B7280",
  Orange: "#F97316",
};

const pastelText = {
  Danger: "#991B1B",
  Success: "#065F46",
  Warning: "#92400E",
  Info: "#1E40AF",
  Teal: "#115E59",
  Purple: "#5B21B6",
  Blue: "#1E40AF",
  Default: "#374151",
  Orange: "#9A3412",
};

type ColorKey = keyof typeof pastelText;

type Props = {
  type: string;
  content: string;
  isFilled: boolean;
  isBordered: boolean;
  trailingIcon: React.ReactNode;
  leadingIcon: React.ReactNode;
  color: ColorKey;
  colorType?: "light" | "solid";
  glare: boolean;
};

const TagsComponent = (props: Props) => {
  const {
    content,
    isFilled,
    isBordered,
    trailingIcon,
    leadingIcon,
    color,
    colorType = "light",
    glare = false,
  } = props;

  const baseClasses =
    "inline-flex cursor-pointer items-center gap-1.5 px-3 py-2 font-medium rounded-full text-sm transition-all duration-150 ease-out hover:shadow-md active:scale-[0.98] cursor-default select-none";

  let backgroundColor = "transparent";
  let textColor = pastelText[color] || pastelText.Default;
  let boxShadow = "none";

  if (isFilled) {
    if (colorType === "light") {
      backgroundColor = pastelBg[color] || pastelBg.Default;
      boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    } else {
      backgroundColor = pastelSolid[color] || pastelSolid.Default;
      textColor = "white";
      boxShadow =
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
    }
  }

  const borderColor = isBordered
    ? pastelText[color] || pastelText.Default
    : "transparent";

  const tagStyle = {
    backgroundColor,
    color: textColor,
    border: isBordered ? `1.5px dashed ${borderColor}` : "none",
    boxShadow: boxShadow,
  };

  return (
    <div className={`${baseClasses}`} style={tagStyle}>
      {leadingIcon && (
        <span
          className="w-4 h-4 flex items-center justify-center flex-shrink-0"
          style={{ strokeWidth: 2.5 }}
        >
          {leadingIcon}
        </span>
      )}
      <span className="font-medium whitespace-nowrap">{content}</span>
      {trailingIcon && (
        <span
          className="w-4 h-4 flex items-center justify-center flex-shrink-0"
          style={{ strokeWidth: 2.5 }}
        >
          {trailingIcon}
        </span>
      )}
    </div>
  );
};

export default TagsComponent;

type StatusType =
  | "pending"
  | "paused"
  | "success"
  | "favourite"
  | "at-risk"
  | "archived";

interface SkeuomorphicTagProps {
  children: ReactNode;
  status: StatusType;
  icon?: ReactNode;
}

export function SkeuomorphicTag({
  children,
  status,
  icon,
}: SkeuomorphicTagProps) {
  const getStatusStyles = () => {
    return getGlassyStatusStyles(status);
  };

  return (
    <div className="inline-block relative">
      <div
        className={`h-1 w-16 mx-auto left-1/2 -translate-x-1/2 absolute top-0 blur-12 z-10 bg-green-400`}
      />
      <div className={`relative ${getStatusStyles()} flex items-center gap-3`}>
        {icon && <span className="relative z-10">{icon}</span>}
        <span className="relative z-10">{children}</span>
      </div>
    </div>
  );
}

function getGlassyStatusStyles(status: StatusType): string {
  const baseStyles =
    "px-6 py-3.5 rounded-full backdrop-blur-xl border relative overflow-hidden shadow-lg";

  const statusMap = {
    pending:
      "bg-gradient-to-br from-amber-500/20 via-amber-600/15 to-amber-700/10 border-amber-500/30 text-gray-200 shadow-amber-500/20",
    paused:
      "bg-gradient-to-br from-gray-600/20 via-gray-700/15 to-gray-800/10 border-gray-500/30 text-gray-300 shadow-gray-500/20",
    success:
      "bg-gradient-to-br from-emerald-500/20 via-emerald-600/15 to-emerald-700/10 border-emerald-400/30 text-gray-200 shadow-emerald-500/20",
    favourite:
      "bg-gradient-to-br from-pink-500/20 via-pink-600/15 to-rose-700/10 border-pink-400/30 text-gray-200 shadow-pink-500/20",
    "at-risk":
      "bg-gradient-to-br from-red-500/20 via-red-600/15 to-red-700/10 border-red-400/30 text-gray-300 shadow-red-500/20",
    archived:
      "bg-gradient-to-br from-slate-600/20 via-slate-700/15 to-slate-800/10 border-slate-500/30 text-gray-300 shadow-slate-500/20",
  };

  const shimmerEffect =
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000";

  return `${baseStyles} ${statusMap[status]} ${shimmerEffect}`;
}
