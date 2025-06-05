/**
 * A custom element that renders an expandable delivery calendar
 * Inspired by Teenage Engineering's interface design
 */
export default class DeliveryCalendar extends HTMLElement {
  constructor() {
    super();
    this.isExpanded = false;
    this.activeMonth = null;
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.innerHTML = `
      <div class="delivery-calendar-container">
        <div class="calendar-grid" id="calendar-grid">
          ${this.renderMonthCards()}
        </div>
        <div class="expanded-view" id="expanded-view" style="display: none;">
          <div class="expanded-header">
            <button class="back-button" id="back-button">← Back to Calendar</button>
            <h2 id="expanded-title"></h2>
          </div>
          <div class="expanded-content" id="expanded-content"></div>
        </div>
      </div>
    `;
  }

  renderMonthCards() {
    const months = this.getMonthsData();
    return months.map(month => `
      <div class="delivery-month" data-month="${month.slug}" data-title="${month.title}">
        <div class="month-header">
          <h3 class="month-title">${month.title}</h3>
          <span class="product-count">${month.count} ${month.count === 1 ? 'item' : 'items'}</span>
        </div>
        <div class="month-preview">
          ${this.renderPreviewImages(month.products)}
        </div>
        <div class="month-meta">
          <span class="delivery-date">${month.deliveryDate}</span>
        </div>
      </div>
    `).join('');
  }

  renderPreviewImages(products) {
    const previewProducts = products.slice(0, 3);
    return previewProducts.map(product => `
      <div class="preview-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </div>
    `).join('');
  }

  getMonthsData() {
    // Get data from data attributes or global variables
    const collectionsData = JSON.parse(this.dataset.collections || '[]');
    
    return collectionsData.map(collection => ({
      slug: collection.handle,
      title: collection.title,
      count: collection.products_count,
      deliveryDate: collection.metafields?.delivery_date || 'TBA',
      products: collection.products || []
    }));
  }

  bindEvents() {
    // Month card click events
    this.querySelectorAll('.delivery-month').forEach(month => {
      month.addEventListener('click', (e) => {
        e.preventDefault();
        this.expandMonth(month.dataset.month, month.dataset.title);
      });

      // Add hover effects for desktop
      month.addEventListener('mouseenter', () => {
        month.style.transform = 'scale(1.02)';
      });

      month.addEventListener('mouseleave', () => {
        month.style.transform = 'scale(1)';
      });
    });

    // Back button event
    const backButton = this.querySelector('#back-button');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.collapseMonth();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isExpanded) {
        this.collapseMonth();
      }
    });
  }

  async expandMonth(monthSlug, monthTitle) {
    this.isExpanded = true;
    this.activeMonth = monthSlug;

    const calendarGrid = this.querySelector('#calendar-grid');
    const expandedView = this.querySelector('#expanded-view');
    const expandedTitle = this.querySelector('#expanded-title');
    const expandedContent = this.querySelector('#expanded-content');

    // Update title
    expandedTitle.textContent = monthTitle;

    // Show loading state
    expandedContent.innerHTML = '<div class="loading">Loading products...</div>';

    // Hide calendar and show expanded view
    calendarGrid.style.display = 'none';
    expandedView.style.display = 'block';

    try {
      // Fetch products for this collection
      const products = await this.fetchCollectionProducts(monthSlug);
      expandedContent.innerHTML = this.renderExpandedProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
      expandedContent.innerHTML = '<div class="error">Error loading products. Please try again.</div>';
    }

    // Add expanded class for CSS animations
    this.classList.add('expanded');
  }

  collapseMonth() {
    this.isExpanded = false;
    this.activeMonth = null;

    const calendarGrid = this.querySelector('#calendar-grid');
    const expandedView = this.querySelector('#expanded-view');

    // Show calendar and hide expanded view
    expandedView.style.display = 'none';
    calendarGrid.style.display = 'grid';

    // Remove expanded class
    this.classList.remove('expanded');
  }

  async fetchCollectionProducts(collectionHandle) {
    try {
      const response = await fetch(`/collections/${collectionHandle}/products.json`);
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching collection products:', error);
      return [];
    }
  }

  renderExpandedProducts(products) {
    if (!products.length) {
      return '<div class="empty-state">No products available for this delivery date.</div>';
    }

    return `
      <div class="products-grid">
        ${products.map(product => `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.featured_image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
              <h4 class="product-title">${product.title}</h4>
              <div class="product-price">
                ${this.formatPrice(product.price)}
              </div>
              <a href="${product.url}" class="product-link">View Details</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }

  // Method to refresh data if needed
  refresh() {
    this.render();
    this.bindEvents();
  }
}

// Register the custom element
if (!customElements.get('delivery-calendar')) {
  customElements.define('delivery-calendar', DeliveryCalendar);
}