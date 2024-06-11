import React from 'react';
import { Mail } from 'lucide-react';
import { DotIcon } from "lucide-react";
import { Check } from "lucide-react";

type Props = {
  type: string;
  content: string;
  isFilled: boolean;
  isBordered: boolean;
  trailingIcon: React.ReactNode;
  leadingIcon: React.ReactNode;
  color: string;
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
    colorType = 'light', // Default to 'light' if not provided
  } = props;

  const BgColors: { [key: string]: string } = {
    Danger: '#FEE2E1',
    Success: '#DCFCE7',
    Warning: '#FEF9C2',
    Info: '#E0F2FE',
    Teal: '#C5F6FB',
    Purple: '#EDEAFF',
    Blue: '#E0F2FE',
    Default: '#F1F4F9',
  };

  const SolidColors: { [key: string]: string } = {
    Purple: '#6D28D9',
    Danger: '#BA1C1D',
    Success: '#28a745',
    Warning: '#ffc107',
    Info: '#17a2b8',
    Teal: '#20c997',
    Default: '#6c757d',
  };

  const DarkTextColors: { [key: string]: string } = {
    Danger: '#C5302A',
    Success: '#1D7300',
    Warning: '#BA1D1C',
    Info: '#1C6E96',
    Teal: '#1A8577',
    Default: '#000  ',
  };

  const baseClasses = 'inline-flex items-center px-2 py-1.5 font-semibold rounded-lg text-sm';
  const leadingIconMargin = leadingIcon ? 'mr-1' : '';
  const trailingIconMargin = trailingIcon ? 'ml-2' : '';

  let backgroundColor = 'transparent';  
  let textColor = 'gray';

  if (isFilled) {
    if (colorType === 'light') {
      backgroundColor = BgColors[color] || 'black';
      textColor = DarkTextColors[color] || 'black';
    } else if (colorType === 'solid') {
      backgroundColor = SolidColors[color] || 'black';
      textColor = 'white';
    }
  }

  const borderColor = BgColors[color] || 'gray';

  const tagStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    display: 'flex',
    border: isBordered ? `1px solid ${borderColor}` : 'none',
  };

  return (
    <div className={`${baseClasses}`} style={tagStyle}>
      {leadingIcon && <span  className={`w-4 h-4 flex items-center justify-center  ${leadingIconMargin}`}>{leadingIcon}</span>}
      <span>{content}</span>
      {trailingIcon && <span  className={`w-4 h-4 flex items-center justify-center  ${trailingIconMargin}`}>{trailingIcon}</span>}
    </div>
  );
};

export default TagsComponent;
