"use client"
import React from "react";
import {
  BanIcon,
  Check,
  CheckCheck,
  CheckCircle2Icon,
  CircleDashed,
  Columns2,
  Download,
  Upload,
} from "lucide-react";
import TagsComponent, { DashedBorderTags } from "@/components/TagsComponent";
import ComponentLayout from "@/components/Layout/ComponentLayout";
import CodeBlock from "@/components/Layout/CodeBlock";
import { motion } from 'framer-motion';
import SourceCodeButton from "@/components/sourceCodeButton";

const codeSnippetColorSystem = `
const pastelBg = {
  Success: '#E3F8E0',
  Danger: '#FDE8E8',
  Warning: '#FFF6DA',
  Teal: '#E0F7F4',
  Info: '#E3F0FF',
  Default: '#F3F4F6',
  Purple: '#F3E8FF',
};

const pastelText = {
  Success: '#166534',
  Danger: '#991B1B',
  Warning: '#92400E',
  Teal: '#115E59',
  Info: '#1E40AF',
  Default: '#374151',
  Purple: '#6B21A8',
};

const solidBg = {
  Success: '#22C55E',
  Danger: '#EF4444',
  Warning: '#F59E0B',
  Purple: '#A855F7',
};
`;

const codeSnippetProps = `
type ColorKey = 'Success' | 'Danger' | 'Warning' | 'Teal' | 
                'Info' | 'Default' | 'Purple';

type Props = {
  content: string;
  isFilled: boolean;
  isBordered: boolean;
  leadingIcon: React.ReactNode;
  trailingIcon: React.ReactNode;
  color: ColorKey;
  colorType?: 'light' | 'solid';
  type?: 'default';
};
`;

const codeSnippetStyling = `
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

  const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-2 font-medium rounded-lg text-sm transition-all duration-150 ease-out hover:shadow-md active:scale-[0.98] cursor-default select-none';
  
  let backgroundColor = 'transparent';
  let textColor = pastelText[color] || pastelText.Default;
  let boxShadow = 'none';

  if (isFilled) {
    if (colorType === 'light') {
      backgroundColor = pastelBg[color] || pastelBg.Default;
      boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    } else {
      backgroundColor = pastelSolid[color] || pastelSolid.Default;
      textColor = 'white';
      boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }
  }

  const borderColor = isBordered ? (pastelText[color] || pastelText.Default) : 'transparent';

  const tagStyle = {
    backgroundColor,
    color: textColor,
    border: isBordered ? 1.5px dashed borderColor : 'none',
    boxShadow: boxShadow,
  };

  return (
    <div className={baseClasses} style={tagStyle}>
      {leadingIcon && (
        <span className="w-4 h-4 flex items-center justify-center shrink-0" style={{ strokeWidth: 2.5 }}>
          {leadingIcon}
        </span>
      )}
      <span className="font-medium whitespace-nowrap">{content}</span>
      {trailingIcon && (
        <span className="w-4 h-4 flex items-center justify-center shrink-0" style={{ strokeWidth: 2.5 }}>
          {trailingIcon}
        </span>
      )}
    </div>
  );
};

`;

const codeSnippetUsage = `
// Status indicator with icon
<TagsComponent
  content="Verified"
  isFilled={true}
  isBordered={false}
  leadingIcon={<Check />}
  trailingIcon={null}
  color="Success"
  colorType="light"
/>

// Action tag with solid background
<TagsComponent
  content="Upload"
  isFilled={true}
  isBordered={false}
  leadingIcon={<Upload />}
  trailingIcon={null}
  color="Purple"
  colorType="solid"
/>

// Simple text-only tag
<TagsComponent
  content="Booking"
  isFilled={true}
  isBordered={false}
  leadingIcon={null}
  trailingIcon={null}
  color="Info"
  colorType="light"
/>
`;

const page = () => {
  return (
    <ComponentLayout
      title="Tags Component"
      description="A versatile tags component for displaying various statuses and actions with icons and colors."
    >
      <div className="flex flex-wrap max-w-5xl mx-auto p-6 py-8 border border-neutral-200 shadow-xs rounded-xl bg-neutral-50 items-center justify-center gap-2">
        <TagsComponent
          glare={true}
          type="default"
          content="Verified"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={<Check />}
          color="Success"
          colorType="light"
        />
        <TagsComponent
          glare={true}
          type="default"
          content="Rejected"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={<BanIcon />}
          color="Danger"
          colorType="light"
        />
        <TagsComponent
          type="default"
          glare={true}
          content="Incomplete"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={<CircleDashed />}
          color="Warning"
          colorType="light"
        />
        <TagsComponent
          glare={true}
          type="default"
          content="Uploaded"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={null}
          color="Teal"
          colorType="light"
        />
        <TagsComponent
          glare={true}
          type="default"
          content="Booking"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={null}
          color="Info"
          colorType="light"
        />
        <TagsComponent
          type="default"
          glare={true}
          content="Not received"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={<Columns2 />}
          color="Default"
          colorType="light"
        />
        <TagsComponent
          type="default" glare={true}
          content="Download"
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={<Download />}
          colorType="light"
          color="Purple"
        />
        <TagsComponent
          type="default"
          content="Upload" glare={true}
          isFilled={true}
          isBordered={false}
          trailingIcon={null}
          leadingIcon={<Upload />}
          colorType="solid"
          color="Purple"
        />
        <DashedBorderTags/>
      </div>

      <div className="text-base mt-8 text-neutral-700">
        <h3 className="font-semibold text-lg mb-2 text-neutral-800">
          About This Component
        </h3>
        <p>
          The Tags Component is a flexible UI element designed to display statuses and actions in a clear, visual way. It supports different colors, icons, and styles, making it easy to reuse across dashboards, tables, or workflows.
        </p>
        <p className="mt-2">
          The component is built as a simple React function with a prop-driven API, so each tag can be customized without duplicating styles.
        </p>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Color System
          </h3>
          <p className="text-neutral-700 mb-2">
            To keep the tags consistent and soft on the eyes, I defined a pastel color system for background, text, and solid states:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetColorSystem} />
          </div>
          <p className="text-neutral-700">
            This separation makes it easy to switch between light and solid variants while keeping colors predictable and visually harmonious across different use cases.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Component Props
          </h3>
          <p className="text-neutral-700 mb-2">
            The tag behavior and appearance are controlled through props:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetProps} />
          </div>
          <p className="text-neutral-700 mb-2">
            This allows each tag to handle:
          </p>
          <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-2">
            <li>Text content</li>
            <li>Optional leading and trailing icons</li>
            <li>Filled or outlined styles</li>
            <li>Light or solid color modes</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Dynamic Styling Logic
          </h3>
          <p className="text-neutral-700 mb-2">
            The background and text color are computed at runtime based on the selected color and style:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetStyling} />
          </div>
          <p className="text-neutral-700">
            For solid tags, the text automatically switches to white to maintain contrast, ensuring readability across all color variants.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Icon Support
          </h3>
          <p className="text-neutral-700 mb-2">
            Icons are fully optional and slot-based, so any icon library can be used. The component uses Lucide React icons but can work with any React icon library:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetUsage} />
          </div>
          <p className="text-neutral-700">
            This makes the component suitable for both status indicators (Verified, Rejected) and actions (Upload, Download), providing maximum flexibility for different use cases.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-neutral-700">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-neutral-700 space-y-1">
            <li>Seven color variants with both light and solid modes</li>
            <li>Optional leading and trailing icon slots</li>
            <li>Automatic contrast handling for solid backgrounds</li>
            <li>Consistent pastel color palette for visual harmony</li>
            <li>Fully prop-driven API for easy customization</li>
            <li>Works with any React icon library</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-2 text-neutral-700">
            Inspiration
          </h3>
          <p className="text-neutral-700">
            The inspiration came from modern admin dashboards and design systems where tags need to be expressive but not distracting. The goal was to keep the component lightweight, readable, and easy to extend while supporting a wide range of use cases—from status badges in data tables to action buttons in workflows.
          </p>
        </div>

        <SourceCodeButton componentName="TagsComponent" hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/TagsComponent.tsx" />
        
      </div>
    </ComponentLayout>
  );
};

export default page;