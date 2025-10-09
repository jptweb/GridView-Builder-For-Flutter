/**
 * Flutter GridView Builder Widget
 * A reusable component for generating Flutter GridView layouts
 */
class GridViewBuilder {
  constructor(containerSelector, options = {}) {
    this.container = typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Default configuration
    this.state = {
      columns: options.defaultColumns || 3,
      mainSpacing: options.defaultMainSpacing || 16,
      crossSpacing: options.defaultCrossSpacing || 16,
      aspectRatio: options.defaultAspectRatio || 1.0,
      padding: options.defaultPadding || 16,
      itemCount: options.defaultItemCount || 12,
      codeStyle: options.defaultCodeStyle || 'count', // 'count' or 'builder'
      contentTemplate: options.defaultContentTemplate || 'container' // Content template type
    };

    this.options = {
      showControls: options.showControls !== false,
      showCodeOutput: options.showCodeOutput !== false,
      showPreview: options.showPreview !== false,
      theme: options.theme || 'light',
      onCodeGenerated: options.onCodeGenerated || null,
      ...options
    };

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.updateGrid();
    this.updateCode();
  }

  render() {
    // Use container height if it has explicit height, otherwise calculate based on viewport
    const containerHeight = this.container.style.height ? '100%' : 'calc(100vh - 120px)';
    const html = `
      <div class="gridview-builder-widget" data-theme="${this.options.theme}">
        <div class="flex gap-4" style="height: ${containerHeight};">
          ${this.options.showControls ? this.renderControls() : ''}
          <div class="flex-1 flex flex-col gap-4 overflow-auto">
            ${this.options.showPreview ? this.renderPreview() : ''}
            ${this.options.showCodeOutput ? this.renderCodeOutput() : ''}
          </div>
        </div>
      </div>
    `;
    this.container.innerHTML = html;
  }

  renderControls() {
    return `
      <div class="w-80 flex flex-col gap-4 overflow-auto">
        <div class="text-center mb-2">
          <h3 class="text-xl font-bold text-primary">GridView Controls</h3>
          <p class="text-sm opacity-70">Adjust parameters to see live preview</p>
        </div>

        <div class="card bg-base-200 shadow-sm">
          <div class="card-body p-4 gap-3">
            <div>
              <label class="label">
                <span class="label-text font-semibold">Code Style</span>
              </label>
              <div class="flex gap-2">
                <label class="flex-1 cursor-pointer">
                  <input type="radio" name="codeStyle" value="count" class="radio radio-primary radio-sm" ${this.state.codeStyle === 'count' ? 'checked' : ''}>
                  <span class="label-text ml-2">GridView.count</span>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input type="radio" name="codeStyle" value="builder" class="radio radio-primary radio-sm" ${this.state.codeStyle === 'builder' ? 'checked' : ''}>
                  <span class="label-text ml-2">GridView.builder</span>
                </label>
              </div>
              <div class="text-xs opacity-60 mt-1">
                ${this.state.codeStyle === 'count' ? 'Best for static layouts' : 'Best for dynamic data lists'}
              </div>
            </div>
            <div>
              <label class="label">
                <span class="label-text font-semibold">Content Template</span>
              </label>
              <select class="select select-bordered select-sm w-full" data-template-select>
                <option value="container" ${this.state.contentTemplate === 'container' ? 'selected' : ''}>Container (Default)</option>
                <option value="gridtile" ${this.state.contentTemplate === 'gridtile' ? 'selected' : ''}>GridTile (Image Gallery)</option>
                <option value="card" ${this.state.contentTemplate === 'card' ? 'selected' : ''}>Card (Icon + Text)</option>
                <option value="stack" ${this.state.contentTemplate === 'stack' ? 'selected' : ''}>Stack (Image Overlay)</option>
                <option value="product" ${this.state.contentTemplate === 'product' ? 'selected' : ''}>Product Card</option>
              </select>
              <div class="text-xs opacity-60 mt-1" data-template-description>
                ${this.getTemplateDescription(this.state.contentTemplate)}
              </div>
            </div>
            <div class="divider my-1"></div>
            ${this.renderSlider('columns', 'Cross Axis Count', 2, 6, 1, 'primary', 'Number of columns in the grid')}
            ${this.renderSlider('mainSpacing', 'Main Axis Spacing', 0, 40, 1, 'secondary', 'Vertical spacing between items')}
            ${this.renderSlider('crossSpacing', 'Cross Axis Spacing', 0, 40, 1, 'secondary', 'Horizontal spacing between items')}
            ${this.renderSlider('aspectRatio', 'Child Aspect Ratio', 0.5, 2, 0.1, 'accent', 'Width to height ratio of each cell')}
            ${this.renderSlider('padding', 'Padding', 0, 40, 1, 'info', 'Padding around the entire grid')}
            ${this.renderSlider('itemCount', 'Item Count', 4, 24, 1, '', 'Number of items to display')}
          </div>
        </div>
        <button class="btn btn-primary btn-block copy-code-btn">📋 Copy Flutter Code</button>
      </div>
    `;
  }

  renderSlider(key, label, min, max, step, colorClass, description) {
    const badgeClass = colorClass ? `badge-${colorClass}` : '';
    const rangeClass = colorClass ? `range-${colorClass}` : '';
    return `
      <div>
        <label class="label">
          <span class="label-text font-semibold">${label}</span>
          <span class="label-text-alt badge ${badgeClass}" data-value="${key}">${this.state[key]}</span>
        </label>
        <input type="range" min="${min}" max="${max}" step="${step}" value="${this.state[key]}"
               class="range ${rangeClass} range-sm" data-slider="${key}">
        <div class="text-xs opacity-60 mt-1">${description}</div>
      </div>
    `;
  }

  renderPreview() {
    return `
      <div class="card bg-base-200 shadow-sm" style="flex: 2;">
        <div class="card-body p-4 flex flex-col" style="height: 100%;">
          <h4 class="font-bold text-lg mb-2">Live Preview</h4>
          <div class="grid-preview bg-base-100 rounded-lg overflow-auto flex-1" style="padding: ${this.state.padding}px;">
            <div class="grid-container"></div>
          </div>
        </div>
      </div>
    `;
  }

  renderCodeOutput() {
    return `
      <div class="card bg-base-200 shadow-sm" style="flex: 1;">
        <div class="card-body p-4 flex flex-col" style="height: 100%;">
          <h4 class="font-bold text-lg mb-2">Generated Flutter Code</h4>
          <pre class="code-output bg-base-300 p-4 rounded-lg text-sm overflow-x-auto flex-1"><code></code></pre>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Slider event listeners
    const sliders = this.container.querySelectorAll('[data-slider]');
    sliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        const key = e.target.dataset.slider;
        const value = parseFloat(e.target.value);
        this.updateState(key, value);
      });
    });

    // Code style radio buttons
    const radioButtons = this.container.querySelectorAll('input[name="codeStyle"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.updateState('codeStyle', e.target.value);
        // Update the description text
        const description = e.target.closest('.card-body').querySelector('.text-xs.opacity-60');
        if (description) {
          description.textContent = e.target.value === 'count'
            ? 'Best for static layouts'
            : 'Best for dynamic data lists';
        }
      });
    });

    // Content template dropdown
    const templateSelect = this.container.querySelector('[data-template-select]');
    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        this.updateState('contentTemplate', e.target.value);
        // Update the description text
        const description = this.container.querySelector('[data-template-description]');
        if (description) {
          description.textContent = this.getTemplateDescription(e.target.value);
        }
      });
    }

    // Copy button
    const copyBtn = this.container.querySelector('.copy-code-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyCode());
    }
  }

  getTemplateDescription(template) {
    const descriptions = {
      'container': 'Simple colored box - good for basic layouts',
      'gridtile': 'Image with header/footer - perfect for galleries',
      'card': 'Icon and text card - ideal for dashboards',
      'stack': 'Image with overlay - great for portfolios',
      'product': 'Product card with image and price - for e-commerce'
    };
    return descriptions[template] || '';
  }

  updateState(key, value) {
    this.state[key] = value;

    // Update display value
    const valueDisplay = this.container.querySelector(`[data-value="${key}"]`);
    if (valueDisplay) {
      valueDisplay.textContent = value;
    }

    this.updateGrid();
    this.updateCode();
  }

  generatePreviewItem(index, template) {
    const aspectRatio = this.state.aspectRatio;

    switch(template) {
      case 'container':
        const colors = ['bg-primary', 'bg-secondary', 'bg-accent'];
        const colorClass = colors[(index - 1) % 3];
        return `<div class="${colorClass} text-white rounded-lg flex items-center justify-center font-bold" style="aspect-ratio: ${aspectRatio};">${index}</div>`;

      case 'gridtile':
        return `<div class="relative bg-base-300 rounded-lg overflow-hidden" style="aspect-ratio: ${aspectRatio};">
          <div class="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl text-white">📷</div>
          <div class="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">Item ${index}</div>
        </div>`;

      case 'card':
        return `<div class="card bg-base-100 shadow-md" style="aspect-ratio: ${aspectRatio};">
          <div class="card-body p-2 flex flex-col items-center justify-center">
            <div class="text-4xl">⭐</div>
            <div class="text-sm font-bold mt-1">Item ${index}</div>
          </div>
        </div>`;

      case 'stack':
        return `<div class="relative bg-base-300 rounded-lg overflow-hidden" style="aspect-ratio: ${aspectRatio};">
          <div class="w-full h-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-4xl text-white">🖼️</div>
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1">Item ${index}</div>
        </div>`;

      case 'product':
        return `<div class="card bg-base-100 shadow-md rounded-lg overflow-hidden" style="aspect-ratio: ${aspectRatio};">
          <div class="flex flex-col h-full">
            <div class="flex-1 bg-gradient-to-br from-info to-primary flex items-center justify-center text-4xl text-white">🛍️</div>
            <div class="p-2 text-xs">
              <div class="font-bold">Product ${index}</div>
              <div class="text-success font-bold">$${index}0.00</div>
            </div>
          </div>
        </div>`;

      default:
        return this.generatePreviewItem(index, 'container');
    }
  }

  updateGrid() {
    const gridContainer = this.container.querySelector('.grid-container');
    if (!gridContainer) return;

    let html = `<div style="display: grid; grid-template-columns: repeat(${this.state.columns}, 1fr); gap: ${this.state.mainSpacing}px;">`;
    for (let i = 1; i <= this.state.itemCount; i++) {
      html += this.generatePreviewItem(i, this.state.contentTemplate);
    }
    html += '</div>';
    gridContainer.innerHTML = html;

    const gridPreview = this.container.querySelector('.grid-preview');
    if (gridPreview) {
      gridPreview.style.padding = `${this.state.padding}px`;
    }
  }

  updateCode() {
    const code = this.generateFlutterCode();
    const codeOutput = this.container.querySelector('.code-output code');
    if (codeOutput) {
      codeOutput.textContent = code;
    }

    // Callback for external usage
    if (this.options.onCodeGenerated) {
      this.options.onCodeGenerated(code);
    }
  }

  generateItemTemplate(templateType, indexVar, indent = '    ') {
    switch(templateType) {
      case 'container':
        return `${indent}Container(
${indent}  decoration: BoxDecoration(
${indent}    color: Colors.blue,
${indent}    borderRadius: BorderRadius.circular(8),
${indent}  ),
${indent}  child: Center(
${indent}    child: Text(
${indent}      '${indexVar}',
${indent}      style: TextStyle(
${indent}        color: Colors.white,
${indent}        fontWeight: FontWeight.bold,
${indent}      ),
${indent}    ),
${indent}  ),
${indent})`;

      case 'gridtile':
        return `${indent}GridTile(
${indent}  header: GridTileBar(
${indent}    backgroundColor: Colors.black45,
${indent}    title: Text('Item ${indexVar}'),
${indent}  ),
${indent}  child: Image.network(
${indent}    'https://via.placeholder.com/300',
${indent}    fit: BoxFit.cover,
${indent}  ),
${indent})`;

      case 'card':
        return `${indent}Card(
${indent}  elevation: 4,
${indent}  child: Column(
${indent}    mainAxisAlignment: MainAxisAlignment.center,
${indent}    children: [
${indent}      Icon(Icons.star, size: 48, color: Colors.amber),
${indent}      SizedBox(height: 8),
${indent}      Text(
${indent}        'Item ${indexVar}',
${indent}        style: TextStyle(fontWeight: FontWeight.bold),
${indent}      ),
${indent}    ],
${indent}  ),
${indent})`;

      case 'stack':
        return `${indent}Stack(
${indent}  fit: StackFit.expand,
${indent}  children: [
${indent}    Image.network(
${indent}      'https://via.placeholder.com/300',
${indent}      fit: BoxFit.cover,
${indent}    ),
${indent}    Positioned(
${indent}      bottom: 0,
${indent}      left: 0,
${indent}      right: 0,
${indent}      child: Container(
${indent}        color: Colors.black54,
${indent}        padding: EdgeInsets.all(8),
${indent}        child: Text(
${indent}          'Item ${indexVar}',
${indent}          style: TextStyle(
${indent}            color: Colors.white,
${indent}            fontWeight: FontWeight.bold,
${indent}          ),
${indent}        ),
${indent}      ),
${indent}    ),
${indent}  ],
${indent})`;

      case 'product':
        return `${indent}Card(
${indent}  clipBehavior: Clip.antiAlias,
${indent}  child: Column(
${indent}    crossAxisAlignment: CrossAxisAlignment.stretch,
${indent}    children: [
${indent}      Expanded(
${indent}        child: Image.network(
${indent}          'https://via.placeholder.com/300',
${indent}          fit: BoxFit.cover,
${indent}        ),
${indent}      ),
${indent}      Padding(
${indent}        padding: EdgeInsets.all(8),
${indent}        child: Column(
${indent}          crossAxisAlignment: CrossAxisAlignment.start,
${indent}          children: [
${indent}            Text(
${indent}              'Product ${indexVar}',
${indent}              style: TextStyle(fontWeight: FontWeight.bold),
${indent}            ),
${indent}            SizedBox(height: 4),
${indent}            Text(
${indent}              '\\\$${indexVar}0.00',
${indent}              style: TextStyle(
${indent}                color: Colors.green,
${indent}                fontWeight: FontWeight.bold,
${indent}              ),
${indent}            ),
${indent}          ],
${indent}        ),
${indent}      ),
${indent}    ],
${indent}  ),
${indent})`;

      default:
        return this.generateItemTemplate('container', indexVar, indent);
    }
  }

  generateCountCode() {
    // Generate static children array
    const children = [];
    for (let i = 1; i <= this.state.itemCount; i++) {
      children.push(this.generateItemTemplate(this.state.contentTemplate, i, '    ') + ',');
    }

    return `GridView.count(
  crossAxisCount: ${this.state.columns},
  mainAxisSpacing: ${this.state.mainSpacing},
  crossAxisSpacing: ${this.state.crossSpacing},
  childAspectRatio: ${this.state.aspectRatio},
  padding: EdgeInsets.all(${this.state.padding}),
  children: [
${children.join('\n')}
  ],
)`;
  }

  generateBuilderCode() {
    const itemWidget = this.generateItemTemplate(this.state.contentTemplate, '\\${index + 1}', '    ');
    return `GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: ${this.state.columns},
    mainAxisSpacing: ${this.state.mainSpacing},
    crossAxisSpacing: ${this.state.crossSpacing},
    childAspectRatio: ${this.state.aspectRatio},
  ),
  padding: EdgeInsets.all(${this.state.padding}),
  itemCount: ${this.state.itemCount},
  itemBuilder: (context, index) {
    return ${itemWidget};
  },
)`;
  }

  generateFlutterCode() {
    return this.state.codeStyle === 'builder'
      ? this.generateBuilderCode()
      : this.generateCountCode();
  }

  copyCode() {
    const code = this.generateFlutterCode();
    navigator.clipboard.writeText(code).then(() => {
      const btn = this.container.querySelector('.copy-code-btn');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Code Copied to Clipboard!';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-primary');
        }, 2000);
      }
    });
  }

  getCode() {
    return this.generateFlutterCode();
  }

  getState() {
    return { ...this.state };
  }

  setState(newState) {
    Object.assign(this.state, newState);
    this.updateGrid();
    this.updateCode();

    // Update slider positions and value displays
    Object.keys(newState).forEach(key => {
      const slider = this.container.querySelector(`[data-slider="${key}"]`);
      if (slider) {
        slider.value = this.state[key];
      }
      const valueDisplay = this.container.querySelector(`[data-value="${key}"]`);
      if (valueDisplay) {
        valueDisplay.textContent = this.state[key];
      }
    });
  }
}

// Export for module systems and global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GridViewBuilder;
}
if (typeof window !== 'undefined') {
  window.GridViewBuilder = GridViewBuilder;
}
