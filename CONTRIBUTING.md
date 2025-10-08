# Contributing to Flutter GridView Builder

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/flutter-gridview-builder.git
   cd flutter-gridview-builder
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `/src` directory:
   - Edit `src/js/gridview-builder.js` for core widget functionality
   - Edit `src/index.html` or `src/embed.html` for layout changes
   - Create `src/js/gridview-builder-standalone.js` changes if modifying the standalone version

3. Test your changes:
   ```bash
   npm run dev
   # Visit http://localhost:8000
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Test the production build:
   ```bash
   npm run serve:dist
   ```

### Code Style

- Use ES6+ JavaScript features
- Keep functions small and focused
- Add comments for complex logic
- Follow existing naming conventions
- Use Tailwind CSS utility classes for styling

### Project Structure

When adding features, maintain this structure:
- **Core logic**: `src/js/gridview-builder.js`
- **Standalone version**: `src/js/gridview-builder-standalone.js`
- **HTML templates**: `src/index.html`, `src/embed.html`
- **Legacy version**: Update `gridview-builder-all-in-one.html` if making major changes

## Types of Contributions

### Bug Fixes
- Check existing issues first
- Include steps to reproduce
- Add test case if applicable
- Update documentation if needed

### New Features
- Open an issue to discuss first
- Ensure backward compatibility
- Update all three widget versions
- Update documentation (README.md, CLAUDE.md, WORDPRESS-EMBED.md)
- Add configuration options when appropriate

### Documentation
- Fix typos and unclear explanations
- Add examples
- Update screenshots/demos
- Improve setup instructions

### Examples
- Create embedding examples
- Add integration guides
- Show advanced configurations

## Pull Request Process

1. **Update documentation**:
   - README.md for user-facing changes
   - CLAUDE.md for architectural changes
   - WORDPRESS-EMBED.md for embedding changes

2. **Test thoroughly**:
   - Test in multiple browsers
   - Test all three widget versions
   - Test both development and production builds
   - Test embedding scenarios

3. **Create pull request**:
   - Clear title describing the change
   - Description of what changed and why
   - Reference any related issues
   - Include screenshots for UI changes

4. **Code review**:
   - Respond to feedback
   - Make requested changes
   - Keep discussions focused

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
Add dark theme support to GridViewBuilder widget

- Added theme configuration option
- Updated CSS classes for dark mode
- Added theme toggle to demo page
```

Format:
- First line: Brief summary (50 chars or less)
- Blank line
- Detailed description (wrapped at 72 chars)

## Building for Release

Before creating a release PR:

```bash
# Clean build
npm run clean
npm run build

# Test production build
npm run serve:dist

# Update version in package.json
# Update CHANGELOG if you're maintaining one

# Deploy to GitHub Pages
npm run deploy:gh-pages
```

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- Review CLAUDE.md for technical details

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
