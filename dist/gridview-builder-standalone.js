/**
 * Flutter GridView Builder - Standalone Embeddable Widget
 * Single file that can be embedded anywhere with just a script tag
 * Automatically loads required CSS dependencies
 */
(function() {
  'use strict';

  // Load required CSS dependencies
  function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  // Load DaisyUI and Tailwind CSS
  loadCSS('https://cdn.jsdelivr.net/npm/daisyui@5.1.29/daisyui.min.css');

  // Load Tailwind via script
  if (!document.querySelector('script[src*="tailwindcss.com"]')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);
  }

  /**
   * Flutter GridView Builder Widget
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
        codeStyle: options.defaultCodeStyle || 'count' // 'count' or 'builder'
      };

      this.options = {
        showControls: options.showControls !== false,
        showCodeOutput: options.showCodeOutput !== false,
        showPreview: options.showPreview !== false,
        theme: options.theme || 'light',
        onCodeGenerated: options.onCodeGenerated || null,
        compact: options.compact || false,
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
      const controlsWidth = this.options.compact ? 'w-full' : 'w-80';
      return `
        <div class="${controlsWidth} flex flex-col gap-4">
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

      const copyBtn = this.container.querySelector('.copy-code-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => this.copyCode());
      }
    }

    updateState(key, value) {
      this.state[key] = value;

      const valueDisplay = this.container.querySelector(`[data-value="${key}"]`);
      if (valueDisplay) {
        valueDisplay.textContent = value;
      }

      this.updateGrid();
      this.updateCode();
    }

    updateGrid() {
      const gridContainer = this.container.querySelector('.grid-container');
      if (!gridContainer) return;

      const colors = [
        'bg-primary text-primary-content',
        'bg-secondary text-secondary-content',
        'bg-accent text-accent-content'
      ];

      let html = `<div style="display: grid; grid-template-columns: repeat(${this.state.columns}, 1fr); gap: ${this.state.mainSpacing}px;">`;
      for (let i = 1; i <= this.state.itemCount; i++) {
        const colorClass = colors[(i - 1) % 3];
        html += `<div class="${colorClass} rounded-lg flex items-center justify-center font-bold" style="aspect-ratio: ${this.state.aspectRatio};">${i}</div>`;
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

      if (this.options.onCodeGenerated) {
        this.options.onCodeGenerated(code);
      }
    }

    generateCountCode() {
      return `GridView.count(
  crossAxisCount: ${this.state.columns},
  mainAxisSpacing: ${this.state.mainSpacing},
  crossAxisSpacing: ${this.state.crossSpacing},
  childAspectRatio: ${this.state.aspectRatio},
  padding: EdgeInsets.all(${this.state.padding}),
  children: List.generate(${this.state.itemCount}, (index) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          '\${index + 1}',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }),
)`;
    }

    generateBuilderCode() {
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
    return Container(
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          '\${index + 1}',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
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

  // Export to global scope
  window.GridViewBuilder = GridViewBuilder;
})();
