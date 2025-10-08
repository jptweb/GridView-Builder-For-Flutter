# GridView-Builder-For-Flutter
This is a tool inspired by HTML / CSS Grid builders that generate the CSS and HTML you need to add to a website to create a desired look. It is meant to be no a code way to quickly generate the dart you need for your flutter project. It was built also as a way to experiment with the new Imagination tool of Claude!

# Flutter GridView Builder

A visual tool for experimenting with Flutter GridView layouts. Adjust parameters in real-time and instantly see how your grid looks, then copy the generated Dart code directly into your Flutter project.


## 🚀 Features

- **Real-time Visual Preview** - See your grid layout update instantly as you adjust parameters
- **Interactive Controls** - Sliders for all major GridView properties
- **Copy-Ready Flutter Code** - Generated Dart code ready to paste into your project
- **No Installation Required** - Runs entirely in your browser
- **Beginner Friendly** - Great for learning Flutter GridView concepts

## 🎯 Use Cases

- Quickly prototype grid layouts for Flutter apps
- Learn how GridView parameters affect layout
- Experiment with different aspect ratios and spacing
- Generate boilerplate code for common grid patterns

## 🔧 Parameters

| Parameter | Description | Range |
|-----------|-------------|-------|
| **Cross Axis Count** | Number of columns in the grid | 2-6 |
| **Main Axis Spacing** | Vertical spacing between items | 0-40px |
| **Cross Axis Spacing** | Horizontal spacing between items | 0-40px |
| **Child Aspect Ratio** | Width to height ratio of each cell | 0.5-2.0 |
| **Padding** | Padding around the entire grid | 0-40px |
| **Item Count** | Number of items to display | 4-24 |

## 🌐 Demo

Visit the live demo: [Flutter GridView Builder](https://your-demo-url.com)

## 📦 Installation & Usage

### Option 1: Use Online
Simply visit the hosted version - no installation needed!
- **Live Demo**: [Flutter GridView Builder](https://your-demo-url.com)

### Option 2: Download Standalone Version
Download `gridview-builder-all-in-one.html` and open it in your browser - no build step required!

### Option 3: Run Locally (Development)
```bash
# Clone the repository
git clone https://github.com/yourusername/flutter-gridview-builder.git
cd flutter-gridview-builder

# Install dependencies (for build tools)
npm install

# Run development server
npm run dev
# Visit http://localhost:8000

# Build for production
npm run build
# Output will be in /dist folder
```

### Option 4: Embed in Your Website
See [WORDPRESS-EMBED.md](WORDPRESS-EMBED.md) for detailed instructions on embedding in WordPress or any website.

**Quick Embed (Iframe):**
```html
<iframe src="https://yourdomain.com/dist/embed.html"
        width="100%" height="800px"></iframe>
```

**Quick Embed (JavaScript Widget):**
```html
<div id="gridview-builder"></div>
<script src="dist/gridview-builder-standalone.min.js"></script>
<script>
  new GridViewBuilder('#gridview-builder');
</script>
```

## 💻 Usage

1. **Adjust Sliders** - Move the sliders to change grid parameters
2. **Watch Preview** - See your grid update in real-time
3. **Copy Code** - Click "Copy Flutter Code" button
4. **Paste in Flutter** - Use the generated code in your Flutter project

### Example Output

```dart
GridView.count(
  crossAxisCount: 3,
  mainAxisSpacing: 16,
  crossAxisSpacing: 16,
  childAspectRatio: 1.0,
  padding: EdgeInsets.all(16),
  children: List.generate(12, (index) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          '${index + 1}',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }),
)
```

## 📁 Project Structure

```
flutter-gridview-builder/
├── src/                    # Source files
│   ├── index.html         # Standalone application
│   ├── embed.html         # Embeddable iframe version
│   └── js/
│       ├── gridview-builder.js            # Core widget (modular)
│       └── gridview-builder-standalone.js # All-in-one widget
├── dist/                  # Built/minified files (generated)
├── docs/                  # GitHub Pages deployment
├── gridview-builder-all-in-one.html  # Legacy single-file version
├── package.json          # Build scripts and dependencies
├── CLAUDE.md            # AI assistant guidance
└── WORDPRESS-EMBED.md   # Embedding instructions
```

## 🛠️ Technologies

- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Vanilla JavaScript** - No framework dependencies
- **HTML5** - Modern web standards
- **Terser** - JavaScript minification
- **npm** - Build tooling and scripts

## 🎨 Customization

The tool uses placeholder colors (primary, secondary, accent). In your Flutter app:

- Replace `Colors.blue` with your desired color
- Customize the `Container` decoration
- Add your own child widgets instead of `Text`
- Modify the `List.generate` logic for dynamic content

## 📱 Flutter Integration

After copying the code, you can integrate it into your Flutter widget:

```dart
import 'package:flutter/material.dart';

class MyGridScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My Grid')),
      body: GridView.count(
        // Paste your generated code here
        crossAxisCount: 3,
        mainAxisSpacing: 16,
        // ... rest of the properties
      ),
    );
  }
}
```

## 🔨 Development

### Available Scripts

```bash
npm run dev          # Start development server (port 8000)
npm run build        # Build production files to /dist
npm run serve:dist   # Preview production build
npm run clean        # Clean dist folder
```

### Making Changes

1. Edit files in `/src` directory
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Minified files will be in `/dist`

### Deployment to GitHub Pages

```bash
npm run deploy:gh-pages
```

This builds the project and copies files to `/docs` for GitHub Pages hosting.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by CSS Grid generators
- Built with Flutter developers in mind
- Created to simplify the prototyping process

## 📧 Contact

- Create an issue for bug reports or feature requests
- Pull requests are always welcome!

---

**Made with ❤️ for the Flutter community**
