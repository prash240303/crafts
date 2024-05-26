import React from 'react';
import { Mail } from 'lucide-react';

type Props = {
  type: string;
  content: string;
  isFilled: boolean;
  isBordered: boolean;
  trailingIcon: React.ReactNode;
  leadingIcon: React.ReactNode;
  color: string; 
};

const TagsComponent = (props: Props) => {
  const {
    content,
    isFilled,
    isBordered,
    trailingIcon,
    leadingIcon,
    color
  } = props;


  const baseClasses = 'inline-flex items-center px-4 bg-opacity-30 py-2 font-semibold rounded-xl text-sm';
  const filledClasses = isFilled ? 'bg-white text-white' : '';
  const leadingIconMargin = leadingIcon ? 'mr-2' : '';
  const trailingIconMargin = trailingIcon ? 'ml-2' : '';

  const tagStyle = {
    backgroundColor: isFilled ? color : 'transparent',
    color: isFilled ? 'white' :color,
    //reduce the bg opacity to 0.3
    // border --> if filled is true, border is transparent, else border is color 
    border: isBordered ? '1px solid' : 'none',
    
  };

  return (
    <div className={`${baseClasses} shadow-lg shadow-${color}-900 text-opacity-40 bg-opacity-0`} style={tagStyle}>
      {leadingIcon && <span className={leadingIconMargin}>{leadingIcon}</span>}
      <span>{content}</span>
      {trailingIcon && <span className={trailingIconMargin}>{trailingIcon}</span>}
    </div>
  );
};

export default TagsComponent;
