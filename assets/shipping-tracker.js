document.addEventListener('DOMContentLoaded', function() {
  // Initialize shipping tracker functionality
  initShippingTracker();
});

function initShippingTracker() {
  // Handle expand/collapse functionality
  window.toggleShipment = function(shipmentId) {
    const shipmentItem = document.querySelector(`[data-shipment-id="${shipmentId}"]`);
    const expandedContent = document.getElementById(`expanded-${shipmentId}`);
    
    if (!shipmentItem || !expandedContent) {
      console.warn(`Shipment ${shipmentId} not found`);
      return;
    }
    
    const isExpanded = shipmentItem.classList.contains('expanded');
    
    // Close all other expanded shipments
    closeAllShipments();
    
    if (!isExpanded) {
      // Expand this shipment
      shipmentItem.classList.add('expanded');
      expandedContent.style.display = 'block';
      
      // Smooth scroll to expanded content after a short delay
      setTimeout(() => {
        scrollToExpandedContent(shipmentItem);
      }, 100);
    }
  };
  
  // Initialize click handlers for shipment cards
  initializeCardClickHandlers();
  
  // Initialize progress animations
  initializeProgressAnimations();
}

function closeAllShipments() {
  const allShipmentItems = document.querySelectorAll('.shipment-item');
  const allExpandedContent = document.querySelectorAll('.shipment-expanded-content');
  
  allShipmentItems.forEach(item => {
    item.classList.remove('expanded');
  });
  
  allExpandedContent.forEach(content => {
    content.style.display = 'none';
  });
}

function initializeCardClickHandlers() {
  const shipmentCards = document.querySelectorAll('.shipment-card');
  
  shipmentCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent double execution if clicking on nested interactive elements
      if (e.target.closest('.expand-btn') || e.target.closest('.view-products-btn')) {
        return;
      }
      
      const shipmentItem = e.currentTarget.closest('.shipment-item');
      const shipmentId = shipmentItem.getAttribute('data-shipment-id');
      
      if (shipmentId) {
        toggleShipment(shipmentId);
      }
    });
  });
}

function scrollToExpandedContent(shipmentItem) {
  const expandedContent = shipmentItem.querySelector('.shipment-expanded-content');
  
  if (expandedContent) {
    // Calculate offset to account for any fixed headers
    const headerOffset = 100; // Adjust based on your theme's header height
    const elementPosition = expandedContent.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function initializeProgressAnimations() {
  // Animate progress bars when they become visible
  const progressBars = document.querySelectorAll('.progress-fill');
  
  if ('IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const targetWidth = progressBar.style.width;
          
          // Reset and animate
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = targetWidth;
          }, 100);
          
          // Stop observing this element
          progressObserver.unobserve(progressBar);
        }
      });
    }, {
      threshold: 0.5
    });
    
    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });
  }
}

// Utility function to handle keyboard navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // ESC key to close all expanded shipments
    if (e.key === 'Escape') {
      closeAllShipments();
    }
    
    // Arrow keys for navigation between shipments
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const expandedShipment = document.querySelector('.shipment-item.expanded');
      if (expandedShipment) {
        e.preventDefault();
        
        const allShipments = Array.from(document.querySelectorAll('.shipment-item'));
        const currentIndex = allShipments.indexOf(expandedShipment);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < allShipments.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : allShipments.length - 1;
        }
        
        const nextShipment = allShipments[nextIndex];
        const nextShipmentId = nextShipment.getAttribute('data-shipment-id');
        
        if (nextShipmentId) {
          toggleShipment(nextShipmentId);
        }
      }
    }
  });
}

// Initialize keyboard navigation
initializeKeyboardNavigation();

// Handle window resize events
window.addEventListener('resize', function() {
  // Close all expanded shipments on resize to prevent layout issues
  const expandedShipments = document.querySelectorAll('.shipment-item.expanded');
  if (expandedShipments.length > 0) {
    setTimeout(() => {
      // Re-calculate positions after resize
      expandedShipments.forEach(shipment => {
        const shipmentId = shipment.getAttribute('data-shipment-id');
        const expandedContent = document.getElementById(`expanded-${shipmentId}`);
        if (expandedContent && expandedContent.style.display !== 'none') {
          scrollToExpandedContent(shipment);
        }
      });
    }, 100);
  }
});

// Accessibility improvements
function improveAccessibility() {
  const shipmentCards = document.querySelectorAll('.shipment-card');
  const expandButtons = document.querySelectorAll('.expand-btn, .view-products-btn');
  
  // Add ARIA labels and roles
  shipmentCards.forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    
    const title = card.querySelector('.shipment-title');
    if (title) {
      const titleText = title.textContent.trim();
      card.setAttribute('aria-label', `Expand ${titleText} shipment details`);
    }
  });
  
  expandButtons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', 'Toggle shipment details');
    }
  });
  
  // Handle Enter and Space key presses on shipment cards
  shipmentCards.forEach(card => {
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // Update ARIA states when expanding/collapsing
  const originalToggleShipment = window.toggleShipment;
  window.toggleShipment = function(shipmentId) {
    originalToggleShipment(shipmentId);
    
    // Update ARIA states
    const shipmentItem = document.querySelector(`[data-shipment-id="${shipmentId}"]`);
    const shipmentCard = shipmentItem?.querySelector('.shipment-card');
    
    if (shipmentCard) {
      const isExpanded = shipmentItem.classList.contains('expanded');
      shipmentCard.setAttribute('aria-expanded', isExpanded.toString());
    }
  };
}

// Initialize accessibility improvements
improveAccessibility();