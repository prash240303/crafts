import React from 'react';
import { Mail } from 'lucide-react';
import { DotIcon } from "lucide-react";
import { Check } from "lucide-react";

/** Pastel‑tuned colors */
const pastelBg = {
  Danger: '#FDE8E8',
  Success: '#E3F8E0',
  Warning: '#FFF6DA',
  Info: '#E6F4FF',
  Teal: '#D7F8F7',
  Purple: '#F0E9FF',
  Blue: '#E4F1FF',
  Default: '#F3F4F6'
};

const pastelSolid = {
  Danger: '#E86A6A',
  Success: '#4CAF50',
  Warning: '#F2C94C',
  Info: '#2D9CDB',
  Teal: '#2BC5B4',
  Purple: '#8B5CF6',
  Blue: '#3B82F6',
  Default: '#6B7280'
};

const pastelText = {
  Danger: '#B94A48',
  Success: '#2F7A38',
  Warning: '#A17700',
  Info: '#1C6FAF',
  Teal: '#1C7F77',
  Purple: '#5B3FA4',
  Blue: '#1E4F91',
  Default: '#111827'
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
  colorType?: 'light' | 'solid';
};

const TagsComponent = (props: Props) => {
  const {
    content,
    isFilled,
    isBordered,
    trailingIcon,
    leadingIcon,
    color,
    colorType = 'light'
  } = props;

  const baseClasses = 'inline-flex items-center px-2 py-1.5 font-semibold rounded-lg text-sm';
  const leadingIconMargin = leadingIcon ? 'mr-1' : '';
  const trailingIconMargin = trailingIcon ? 'ml-2' : '';

  let backgroundColor = 'transparent';
  let textColor = pastelText[color] || pastelText.Default;

  if (isFilled) {
    if (colorType === 'light') {
      backgroundColor = pastelBg[color] || pastelBg.Default;
    } else {
      backgroundColor = pastelSolid[color] || pastelSolid.Default;
      textColor = 'white';
    }
  }

  const borderColor = pastelBg[color] || pastelBg.Default;

  const tagStyle = {
    backgroundColor,
    color: textColor,
    display: 'flex',
    border: isBordered ? `1px solid ${borderColor}` : 'none',
  };

  return (
    <div className={`${baseClasses}`} style={tagStyle}>
      {leadingIcon && (
        <span className={`w-4 h-4 flex items-center justify-center ${leadingIconMargin}`}>
          {leadingIcon}
        </span>
      )}
      <span>{content}</span>
      {trailingIcon && (
        <span className={`w-4 h-4 flex items-center justify-center ${trailingIconMargin}`}>
          {trailingIcon}
        </span>
      )}
    </div>
  );
};

export default TagsComponent;
