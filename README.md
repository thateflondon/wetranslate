# WeTranslate

A modern, fast translation web application built with Next.js 16 and powered by translation APIs.

## Features

- **Real-time Translation**: Instant translation between multiple languages
- **Language Detection**: Automatic detection of source language
- **Text-to-Speech**: Listen to translations with native voice synthesis
- **Copy to Clipboard**: One-click copy functionality for translated text
- **Language Switching**: Quick swap between source and target languages
- **Custom Dropdown**: Enhanced language selection with custom UI components
- **Responsive Design**: Optimized for all screen sizes and devices
- **Modern UI**: Clean interface with gradient accents and smooth interactions

## Technology Stack

- **Framework**: Next.js 16.3.3 with App Router
- **Language**: TypeScript
- **Runtime**: React 19.2.8
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm
- **APIs**: 
  - Translation API
  - Language Detection API
  - Web Speech API (Text-to-Speech)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/thateflondon/wetranslate.git
cd wetranslate
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Structure

```
wetranslate/
├── app/
│   ├── api/
│   │   ├── detect-language/   # Language detection endpoint
│   │   ├── translate/         # Translation endpoint
│   │   └── languages/         # Available languages list
│   ├── components/
│   │   ├── TranslateApp.tsx   # Main app container
│   │   ├── TranslateForm.tsx  # Translation form logic
│   │   ├── LanguageSelection.tsx
│   │   ├── SelectLanguage.tsx
│   │   ├── TextToSpeech.tsx
│   │   ├── CopyText.tsx
│   │   ├── SwitchLanguages.tsx
│   │   ├── TranslationButton.tsx
│   │   ├── Logo.tsx
│   │   └── Background.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── logo.svg
│   ├── background.jpg
│   └── [various icons]
└── README.md
```

## Browser Support

- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+
- Opera 76+

## License

MIT License

## Author

Created by [thateflondon](https://github.com/thateflondon)