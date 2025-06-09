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

  async connectedCallback() {
    // Render initial layout
    this.render();
    this.bindEvents();
  }

  render() {
    this.innerHTML = `
      <div class="delivery-calendar-container">
        <div class="delivery-sections" id="delivery-sections">
          ${this.renderDeliverySections()}
        </div>
      </div>
    `;
  }

  renderDeliverySections() {
    const collections = this.getCollectionsData();
    
    // Group collections by delivery date
    const deliveryGroups = this.groupByDeliveryDate(collections);
    
    return Object.keys(deliveryGroups).map(deliveryDate => {
      const collectionsForDate = deliveryGroups[deliveryDate];
      const totalProducts = collectionsForDate.reduce((sum, collection) => sum + collection.count, 0);
      
      return `
        <div class="delivery-section" data-delivery-date="${deliveryDate}">
          <div class="delivery-header" role="button" tabindex="0" aria-expanded="false">
            <div class="delivery-header-content">
              <h3 class="delivery-date-title">${this.formatDate(deliveryDate)}</h3>
              <div class="delivery-meta">
                <span class="product-count">${totalProducts} ${totalProducts === 1 ? 'item' : 'items'}</span>
                <span class="collection-count">${collectionsForDate.length} ${collectionsForDate.length === 1 ? 'collection' : 'collections'}</span>
              </div>
            </div>
            <div class="delivery-header-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4l4 4H4l4-4z"/>
              </svg>
            </div>
          </div>
          <div class="delivery-content" style="display: none;">
            <div class="collections-grid">
              ${collectionsForDate.map(collection => this.renderCollectionCard(collection)).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderCollectionCard(collection) {
    return `
      <div class="collection-card" data-collection="${collection.slug}">
        <div class="collection-header">
          <h4 class="collection-title">${collection.title}</h4>
          <span class="collection-product-count">${collection.count} ${collection.count === 1 ? 'item' : 'items'}</span>
        </div>
        ${collection.isPreorder ? '<div class="preorder-badge">Pre-order</div>' : ''}
        <div class="collection-preview">
          ${this.renderPreviewImages(collection.products)}
        </div>
        <div class="collection-meta">
          ${collection.stoqEnabled ? '<span class="stoq-badge">STOQ</span>' : ''}
          <a href="/collections/${collection.slug}" class="collection-link">View Collection</a>
        </div>
      </div>
    `;
  }

  groupByDeliveryDate(collections) {
    const groups = {};
    
    collections.forEach(collection => {
      const deliveryDate = collection.deliveryDate || 'TBA';
      if (!groups[deliveryDate]) {
        groups[deliveryDate] = [];
      }
      groups[deliveryDate].push(collection);
    });
    
    // Sort groups by delivery date
    const sortedGroups = {};
    Object.keys(groups).sort((a, b) => {
      if (a === 'TBA') return 1;
      if (b === 'TBA') return -1;
      return new Date(a) - new Date(b);
    }).forEach(date => {
      sortedGroups[date] = groups[date];
    });
    
    return sortedGroups;
  }

  renderPreviewImages(products) {
    const previewProducts = products.slice(0, 3);
    return previewProducts.map(product => `
      <div class="preview-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </div>
    `).join('');
  }

  getCollectionsData() {
    // Get data from data attributes or global variables
    const collectionsData = JSON.parse(this.dataset.collections || '[]');
    
    return collectionsData.map(collection => ({
      slug: collection.handle,
      title: collection.title,
      count: collection.products_count,
      deliveryDate: collection.delivery_date || 'TBA',
      products: collection.products || [],
      isPreorder: collection.is_preorder || false,
      stoqEnabled: collection.stoq_enabled || false
    }));
  }

  bindEvents() {
    // Delivery section header click events for collapsing/expanding
    this.querySelectorAll('.delivery-header').forEach(header => {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDeliverySection(header.closest('.delivery-section'));
      });

      // Keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleDeliverySection(header.closest('.delivery-section'));
        }
      });
    });

    // Collection card click events
    this.querySelectorAll('.collection-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't prevent default if clicking on a link
        if (e.target.tagName === 'A') return;
        
        e.preventDefault();
        const collectionSlug = card.dataset.collection;
        window.location.href = `/collections/${collectionSlug}`;
      });

      // Add hover effects for desktop
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  toggleDeliverySection(section) {
    const header = section.querySelector('.delivery-header');
    const content = section.querySelector('.delivery-content');
    const icon = section.querySelector('.delivery-header-icon svg');
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      // Collapse
      content.style.display = 'none';
      header.setAttribute('aria-expanded', 'false');
      icon.style.transform = 'rotate(0deg)';
      section.classList.remove('expanded');
    } else {
      // Expand
      content.style.display = 'block';
      header.setAttribute('aria-expanded', 'true');
      icon.style.transform = 'rotate(180deg)';
      section.classList.add('expanded');
    }
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
          <div class="product-card ${product.is_preorder ? 'preorder-product' : ''}">
            <div class="product-image">
              <img src="${product.featured_image}" alt="${product.title}" loading="lazy">
              ${product.is_preorder ? '<div class="preorder-overlay">Pre-order</div>' : ''}
            </div>
            <div class="product-info">
              <h4 class="product-title">${product.title}</h4>
              <div class="product-price">
                ${this.formatPrice(product.price)}
              </div>
              ${product.collection_delivery_date ? `<div class="delivery-info">This shipment: ${this.formatDate(product.collection_delivery_date)}</div>` : ''}
              ${product.stoq_offers_count > 1 ? `<div class="offers-info">Available in ${product.stoq_offers_count} shipments</div>` : ''}
              ${this.renderVariantInfo(product.variants)}
              <a href="${product.url}" class="product-link">${product.is_preorder ? 'Pre-order Now' : 'View Details'}</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderVariantInfo(variants) {
    if (!variants || variants.length <= 1) {
      return '';
    }

    const preorderVariants = variants.filter(v => v.is_preorder);
    const regularVariants = variants.filter(v => !v.is_preorder);
    
    let info = '';
    if (preorderVariants.length > 0) {
      info += `<div class="variant-info preorder-variants">${preorderVariants.length} pre-order variant${preorderVariants.length > 1 ? 's' : ''}</div>`;
    }
    if (regularVariants.length > 0) {
      info += `<div class="variant-info regular-variants">${regularVariants.length} regular variant${regularVariants.length > 1 ? 's' : ''}</div>`;
    }
    
    return info;
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }

  formatDate(dateString) {
    if (!dateString || dateString === 'TBA') return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
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