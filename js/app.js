// DressCycle Customer Flexible Rental Experience Logic

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  let outfits = [...OUTFITS_DATA];
  let selectedOutfit = null;
  let selectedSize = 'M';
  let userOrders = [];
  let currentRentalDays = 3;
  let currentFinalRentalFee = 0;

  // DOM Elements
  const outfitsGrid = document.getElementById('outfitsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const genderFilter = document.getElementById('genderFilter');
  const sizeFilter = document.getElementById('sizeFilter');
  const outfitModal = document.getElementById('outfitModal');
  const bookingModal = document.getElementById('bookingModal');
  const myOrdersModal = document.getElementById('myOrdersModal');
  const navCartBadge = document.getElementById('navCartBadge');
  const toastContainer = document.getElementById('toastContainer');
  
  // Date Picker Elements
  const startDateInput = document.getElementById('startDateInput');
  const endDateInput = document.getElementById('endDateInput');
  const rentalDurationBadge = document.getElementById('rentalDurationBadge');
  const longRentalDiscountBanner = document.getElementById('longRentalDiscountBanner');
  
  // Price Display Elements
  const calcDurationDaysText = document.getElementById('calcDurationDaysText');
  const modalSubtotalFee = document.getElementById('modalSubtotalFee');
  const discountRow = document.getElementById('discountRow');
  const modalDiscountAmount = document.getElementById('modalDiscountAmount');
  const modalDepositFee = document.getElementById('modalDepositFee');
  const modalTotalPayable = document.getElementById('modalTotalPayable');

  // Initialize
  initDateDefaults();
  renderCatalog(outfits);
  updateCartBadge();
  setupEventListeners();

  // Set default dates (Start: Tomorrow, End: Tomorrow + 3 days)
  function initDateDefaults() {
    if (!startDateInput || !endDateInput) return;
    const start = new Date();
    start.setDate(start.getDate() + 1);
    
    const end = new Date(start);
    end.setDate(end.getDate() + 3);

    startDateInput.value = start.toISOString().split('T')[0];
    endDateInput.value = end.toISOString().split('T')[0];
  }

  // Calculate duration and prices dynamically based on start and return dates
  function updateRentalPricingAndDates() {
    if (!startDateInput || !endDateInput || !selectedOutfit) return;

    let start = new Date(startDateInput.value);
    let end = new Date(endDateInput.value);

    if (isNaN(start.getTime())) {
      start = new Date();
      start.setDate(start.getDate() + 1);
      startDateInput.value = start.toISOString().split('T')[0];
    }

    // Ensure end date is after start date
    let diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (isNaN(diffDays) || diffDays < 1) {
      diffDays = 1;
      end = new Date(start);
      end.setDate(end.getDate() + 1);
      endDateInput.value = end.toISOString().split('T')[0];
    }

    currentRentalDays = diffDays;
    rentalDurationBadge.textContent = `${currentRentalDays} ${currentRentalDays === 1 ? 'Day' : 'Days'} Rental`;
    calcDurationDaysText.textContent = `${currentRentalDays} ${currentRentalDays === 1 ? 'Day' : 'Days'}`;

    // Base daily rate derived from outfit default 3-day pricing
    const dailyRate = Math.round(selectedOutfit.rentalPrice / 3);
    const subtotal = dailyRate * currentRentalDays;

    let discount = 0;
    // 15% Discount tweak for rentals > 3 days
    if (currentRentalDays > 3) {
      discount = Math.round(subtotal * 0.15);
      longRentalDiscountBanner.style.display = 'block';
      discountRow.style.display = 'flex';
      modalDiscountAmount.textContent = `-₹${discount.toLocaleString('en-IN')}`;
    } else {
      longRentalDiscountBanner.style.display = 'none';
      discountRow.style.display = 'none';
    }

    currentFinalRentalFee = subtotal - discount;

    modalSubtotalFee.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    modalDepositFee.textContent = `₹${selectedOutfit.deposit.toLocaleString('en-IN')}`;

    const totalPayable = currentFinalRentalFee + selectedOutfit.deposit;
    modalTotalPayable.textContent = `₹${totalPayable.toLocaleString('en-IN')}`;
  }

  // Render Catalog Grid
  function renderCatalog(items) {
    if (!outfitsGrid) return;
    outfitsGrid.innerHTML = '';
    
    if (items.length === 0) {
      outfitsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <h3>No matching designer outfits found</h3>
          <p>Try clearing your category or size filters to browse all options.</p>
        </div>
      `;
      return;
    }

    items.forEach(outfit => {
      const fallbackSrc = outfit.gender === 'Men' ? 'sherwani_velvet.png' : 'lehenga_emerald.png';

      const card = document.createElement('div');
      card.className = 'outfit-card';
      card.innerHTML = `
        <div class="card-img-wrapper">
          <img src="${outfit.image}" alt="${outfit.name}" loading="lazy" onerror="if(this.src.includes('assets/')){this.src=this.src.replace('assets/','');}else{this.src='${fallbackSrc}';}">
          <span class="card-badge">${outfit.category}</span>
          <div class="card-rating">
            <span>★</span> ${outfit.rating} (${outfit.reviewsCount})
          </div>
        </div>
        <div class="card-body">
          <div class="card-designer">${outfit.designer}</div>
          <h3 class="card-title">${outfit.name}</h3>
          <div style="margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; color: #34D399; font-weight: 600;">15% OFF on rentals > 3 Days</span>
          </div>
          <div style="margin-bottom: 0.75rem;">
            <span class="deposit-badge-sm">Deposit: ₹${outfit.deposit.toLocaleString('en-IN')} (100% Refundable)</span>
          </div>
          <div class="card-pricing-row">
            <div>
              <span class="rental-price">₹${outfit.rentalPrice.toLocaleString('en-IN')}</span>
              <span class="rental-period"> / 3 Days Base</span>
            </div>
            <div>
              <span class="retail-price-tag">Retail ₹${outfit.retailPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button class="btn-primary" style="width: 100%; margin-top: 1rem; justify-content: center;" onclick="window.openOutfitModal('${outfit.id}')">
            Rent & Choose Dates
          </button>
        </div>
      `;
      outfitsGrid.appendChild(card);
    });
  }

  // Filter Catalog Logic
  function filterCatalog() {
    const query = searchInput.value.toLowerCase().trim();
    const cat = categoryFilter.value;
    const gen = genderFilter.value;
    const sz = sizeFilter.value;

    const filtered = outfits.filter(item => {
      const matchQuery = item.name.toLowerCase().includes(query) || 
                         item.designer.toLowerCase().includes(query) ||
                         item.category.toLowerCase().includes(query);
      const matchCat = cat === 'All' || item.category === cat;
      const matchGen = gen === 'All' || item.gender === gen;
      const matchSize = sz === 'All' || item.sizes.includes(sz);

      return matchQuery && matchCat && matchGen && matchSize;
    });

    renderCatalog(filtered);
  }

  // Open Outfit Detail Modal
  window.openOutfitModal = (outfitId) => {
    selectedOutfit = outfits.find(o => o.id === outfitId);
    if (!selectedOutfit) return;

    const modalImg = document.getElementById('modalImage');
    const fallbackSrc = selectedOutfit.gender === 'Men' ? 'sherwani_velvet.png' : 'lehenga_emerald.png';
    modalImg.src = selectedOutfit.image;
    modalImg.onerror = function() {
      if (this.src.includes('assets/')) {
        this.src = this.src.replace('assets/', '');
      } else {
        this.src = fallbackSrc;
      }
    };

    document.getElementById('modalTitle').textContent = selectedOutfit.name;
    document.getElementById('modalDesigner').textContent = selectedOutfit.designer;
    document.getElementById('modalDescription').textContent = selectedOutfit.description;
    document.getElementById('modalRetailPrice').textContent = `₹${selectedOutfit.retailPrice.toLocaleString('en-IN')}`;
    document.getElementById('modalFabric').textContent = selectedOutfit.fabric;

    // Sizing chips
    const sizeContainer = document.getElementById('sizeChipsContainer');
    sizeContainer.innerHTML = '';
    selectedSize = selectedOutfit.sizes[0] || 'M';
    selectedOutfit.sizes.forEach(size => {
      const chip = document.createElement('div');
      chip.className = `size-chip ${size === selectedSize ? 'selected' : ''}`;
      chip.textContent = size;
      chip.onclick = () => {
        document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedSize = size;
      };
      sizeContainer.appendChild(chip);
    });

    // Recalculate price breakdown with dates
    updateRentalPricingAndDates();

    outfitModal.classList.add('active');
  };

  // Handle Booking Checkout Confirmation
  window.confirmBookingClick = () => {
    if (!selectedOutfit) return;
    outfitModal.classList.remove('active');
    
    // Fill booking checkout modal
    document.getElementById('checkoutOutfitName').textContent = selectedOutfit.name;
    document.getElementById('checkoutDates').textContent = `${startDateInput.value} ➔ ${endDateInput.value} (${currentRentalDays} Days)`;
    document.getElementById('checkoutRentalAmount').textContent = `₹${currentFinalRentalFee.toLocaleString('en-IN')}`;
    document.getElementById('checkoutDepositAmount').textContent = `₹${selectedOutfit.deposit.toLocaleString('en-IN')}`;
    document.getElementById('checkoutTotalAmount').textContent = `₹${(currentFinalRentalFee + selectedOutfit.deposit).toLocaleString('en-IN')}`;
    
    bookingModal.classList.add('active');
  };

  window.completeBookingPayment = () => {
    bookingModal.classList.remove('active');
    const newOrderId = `DC-${Math.floor(1000 + Math.random() * 9000)}-IN`;
    
    const newOrder = {
      orderId: newOrderId,
      outfitName: selectedOutfit.name,
      outfitImage: selectedOutfit.image,
      designer: selectedOutfit.designer,
      rentalPrice: currentFinalRentalFee,
      deposit: selectedOutfit.deposit,
      size: selectedSize,
      rentalDays: currentRentalDays,
      startDate: startDateInput.value,
      returnDate: endDateInput.value,
      currentStepIndex: 0,
      steps: [
        { title: 'Booked', subtitle: 'Order & Security Deposit Authorized', date: 'Just now' },
        { title: 'Dispatched', subtitle: 'Sanitized & Dispatched via Courier', date: 'Scheduled Tomorrow' },
        { title: 'Delivered', subtitle: 'Arrived at Customer Doorstep', date: `Estimated ${startDateInput.value}` },
        { title: 'Returned', subtitle: 'Picked up by Courier & Inspected', date: `Scheduled ${endDateInput.value}` },
        { title: 'Deposit Refunded', subtitle: `₹${selectedOutfit.deposit.toLocaleString('en-IN')} Transferred to Bank Account`, date: 'Post-Return Inspection' }
      ]
    };

    userOrders.unshift(newOrder);
    updateCartBadge();
    showToast(`Rental Confirmed (${currentRentalDays} Days). Order Ref: ${newOrderId}`);
    
    // Open My Orders Modal so the buyer sees their booking details
    window.openMyOrdersModal();
  };

  function updateCartBadge() {
    if (navCartBadge) {
      navCartBadge.textContent = userOrders.length;
    }
  }

  // Open "My Rentals" Dashboard Modal
  window.openMyOrdersModal = () => {
    const container = document.getElementById('myOrdersListContainer');
    if (!container) return;

    if (userOrders.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3.5rem 1rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No Active Rentals Yet</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 450px; margin-left: auto; margin-right: auto;">
            You haven't rented any designer outfits yet. Browse our collection to pick your custom start and return dates.
          </p>
          <button class="btn-primary" onclick="closeModal('myOrdersModal'); document.getElementById('catalogSection').scrollIntoView({behavior: 'smooth'});">
            Explore Collection Now
          </button>
        </div>
      `;
    } else {
      container.innerHTML = '';
      userOrders.forEach((order) => {
        const orderCard = document.createElement('div');
        orderCard.style.cssText = 'background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;';
        
        const fallbackSrc = 'lehenga_emerald.png';

        orderCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; gap: 1rem; align-items: center;">
              <img src="${order.outfitImage}" alt="${order.outfitName}" style="width: 65px; height: 65px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-color);" onerror="this.src='${fallbackSrc}';">
              <div>
                <div style="font-size: 0.8rem; color: var(--gold-primary); font-weight: 600;">BOOKING REF: ${order.orderId}</div>
                <h4 style="font-size: 1.2rem; font-weight: 700;">${order.outfitName}</h4>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${order.designer} • Size: ${order.size} • Duration: ${order.rentalDays} Days</div>
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Rental Window</div>
              <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-main);">${order.startDate} ➔ ${order.returnDate}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Refundable Deposit: <strong style="color: #34D399;">₹${order.deposit.toLocaleString('en-IN')}</strong></div>
            </div>
          </div>

          <!-- Stepper for Order Status -->
          <div style="background: var(--bg-dark); border-radius: var(--radius-md); padding: 1.25rem; border: 1px solid var(--border-subtle);">
            <div style="font-weight: 600; font-size: 0.85rem; color: var(--gold-light); margin-bottom: 1rem;">
              Delivery & Return Tracking Status:
            </div>
            
            <div style="display: flex; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
              ${order.steps.map((step, idx) => `
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 0.5rem; background: ${idx === order.currentStepIndex ? 'rgba(212, 175, 55, 0.15)' : 'transparent'}; border-radius: var(--radius-sm); border: ${idx === order.currentStepIndex ? '1px solid var(--gold-primary)' : '1px solid transparent'};">
                  <div style="font-size: 0.9rem; font-weight: 700; color: ${idx <= order.currentStepIndex ? 'var(--gold-primary)' : 'var(--text-dim)'};">
                    ${idx <= order.currentStepIndex ? '✓ ' : ''}${step.title}
                  </div>
                  <div style="font-size: 0.725rem; color: var(--text-muted);">${step.subtitle}</div>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 1rem; font-size: 0.825rem; color: #34D399; background: rgba(16, 185, 129, 0.1); padding: 0.6rem 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.3);">
              Deposit Escrow: ₹${order.deposit.toLocaleString('en-IN')} held safely in bank escrow. Will be credited back within 24 hours of return pickup on ${order.returnDate}.
            </div>
          </div>
        `;
        container.appendChild(orderCard);
      });
    }

    myOrdersModal.classList.add('active');
  };

  // Modal Closer
  window.closeModal = (modalId) => {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  };

  // Toast Notification helper
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Event Listeners
  function setupEventListeners() {
    if (searchInput) searchInput.addEventListener('input', filterCatalog);
    if (categoryFilter) categoryFilter.addEventListener('change', filterCatalog);
    if (genderFilter) genderFilter.addEventListener('change', filterCatalog);
    if (sizeFilter) sizeFilter.addEventListener('change', filterCatalog);

    if (startDateInput) startDateInput.addEventListener('change', updateRentalPricingAndDates);
    if (endDateInput) endDateInput.addEventListener('change', updateRentalPricingAndDates);
  }
});
