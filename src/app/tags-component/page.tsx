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
import TagsComponent, { SkeuomorphicTag } from "@/components/TagsComponent";
import ComponentLayout from "@/components/Layout/ComponentLayout";
import CodeBlock from "@/components/Layout/CodeBlock";
import { motion } from 'framer-motion';

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
        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ strokeWidth: 2.5 }}>
          {leadingIcon}
        </span>
      )}
      <span className="font-medium whitespace-nowrap">{content}</span>
      {trailingIcon && (
        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ strokeWidth: 2.5 }}>
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
      <div className="flex flex-wrap max-w-5xl mx-auto p-6 py-8 border border-neutral-200 shadow-sm rounded-xl bg-neutral-50 items-center justify-center gap-2">
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
        {/* <SkeuomorphicTag status="pending" icon={<CircleDashed />}>
          Paper Tag
        </SkeuomorphicTag> */}
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

        <p className="font-medium mt-6 text-neutral-700 mb-3">
          Here's the source code, I hope you like it :)
        </p>
        <motion.a
          href="https://github.com/prash240303/crafts/blob/main/src/components/TagsComponent.tsx"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, boxShadow: '0 0 0 2px #22c55e' }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-mono text-neutral-600 shadow-sm transition-colors hover:text-green-600 hover:bg-green-50"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="break-all">prash240303/crafts/TagsComponent.tsx</span>
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>
    </ComponentLayout>
  );
};

export default page;