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

## 📦 Installation

### Option 1: Use Online
Simply visit the hosted version - no installation needed!

### Option 2: Run Locally
1. Download `gridview-builder.html`
2. Open it in any modern web browser
3. Start experimenting!

### Option 3: Host Yourself
```bash
# Clone the repository
git clone https://github.com/yourusername/flutter-gridview-builder.git

# Deploy to your hosting service
# Works with: Netlify, Vercel, GitHub Pages, or any static host
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

## 🛠️ Technologies

- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Vanilla JavaScript** - No framework dependencies
- **HTML5** - Modern web standards

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
