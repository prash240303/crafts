const _projects = [
  {
    name: "Hero Section Image Animation",
    path: "/crafts/hero",
    img: "/craft-preview/hero.gif",
    description: "Interactive hero-section image animation.",
    type: "hero",
    height: "h-72",
    createdAt: "15-03-2026",
  },

  {
    name: "Typewriter-Letters",
    path: "/crafts/typewriter",
    img: "/craft-preview/typewriter.gif",
    description: "Write your letters with a experince of using a typewriter.",
    type: "type-writer",
    height: "h-72",
    createdAt: "12-03-2026",
  },
  {
    name: "Arrow Button",
    path: "/crafts/arrow-button",
    img: "/craft-preview/arrowbutton.gif",
    description: "A button with an arrow icon.",
    type: "arrow-button",
    height: "h-72",
    createdAt: "10-03-2026",
  },
  {
    name: "Magic Text",
    path: "/crafts/magic-text",
    img: "/craft-preview/starrytext.gif",
    description: "A text component with magical effects.",
    type: "magic-text",
    height: "h-80",
    createdAt: "08-03-2026",
  },
  {
    name: "Tab Switcher",
    path: "/crafts/tab-switcher",
    img: "/craft-preview/tabswitcher.gif",
    description: "A component for switching between tabs.",
    type: "tab-switcher",
    height: "h-96",
    createdAt: "05-03-2026",
  },
  {
    name: "Tags Component",
    path: "/crafts/tags-component",
    img: "/craft-preview/tagsComponent.gif",
    description: "A component for displaying tags.",
    type: "tags",
    height: "h-64",
    createdAt: "01-03-2026",
  },
  {
    name: "Zip Code Checker",
    path: "/crafts/zip-code-checker",
    img: "/craft-preview/zipcodechecker.png",
    description: "A component for checking zip codes.",
    type: "zip-code",
    height: "h-80",
    createdAt: "28-02-2026",
  },
  {
    name: "Custom Cards",
    path: "/crafts/custom-cards",
    img: "/craft-preview/customCards.png",
    description: "A component for displaying custom cards.",
    type: "custom-cards",
    height: "h-96",
    createdAt: "25-02-2026",
  },
  {
    name: "Ripple button",
    path: "/crafts/ripple-button",
    img: "/craft-preview/ripplebutton.gif",
    description: "Button with ripple effect on hover",
    type: "ripple-button",
    height: "h-72",
    createdAt: "20-02-2026",
  },
  {
    name: "Image Reveal",
    path: "/crafts/image-reveal",
    img: "/craft-preview/image-reveal.gif",
    description: "A component for displaying images, with grid reveal effect",
    type: "image-reveal",
    height: "h-72",
    createdAt: "15-02-2026",
  },
  {
    name: "Aadhar Card",
    path: "/crafts/aadhar-card",
    img: "/craft-preview/aadharcard.png",
    description: "A component for displaying aadhar card",
    type: "aadhar-card",
    height: "h-[420px]",
    createdAt: "10-02-2026",
  },

  {
    name: "Expand Repel Card",
    path: "/crafts/expand-repel-card",
    img: "/craft-preview/expand-repel-card.gif",
    description: "A component for displaying expand repel card",
    type: "expand-repel-card",
    height: "h-72",
    createdAt: "05-02-2026",
  },
  {
    name: "MacOS Liquid Glass Dock",
    path: "/crafts/liquid-glass-dock",
    img: "/craft-preview/macos_dock.png",
    description: "A liquid Glass Dock with macOS style",
    type: "liquid-glass-dock",
    height: "h-72",
    createdAt: "11-04-2026",
  },
  {
    name: "Animated Number Input",
    path: "/crafts/animated-number-input",
    img: "/craft-preview/animated-number-input.gif",
    description: "A bottom-up animated number input.",
    type: "animated-number-input",
    height: "h-72",
    createdAt: "17-04-2026",
  },

];

export const Projects = _projects
  .sort((a, b) => {
    const parse = (d: string) => {
      const [dd, mm, yyyy] = d.split("-");
      return new Date(`${yyyy}-${mm}-${dd}`).getTime();
    };
    return parse(b.createdAt) - parse(a.createdAt); // newest first
  })
  .map((p, i) => ({ ...p, id: i + 1 }));