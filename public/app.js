/**
 * Eastleigh E-Commerce Ads — Pop-up Quiz Modal Controller
 * WhatsApp: 254746748557
 * Single-tap auto-advance, smooth transitions, zero emojis.
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '254746748557';
  const TOTAL_QUESTIONS = 5;

  const quizState = {
    currentStep: 1, // 1 to 5: questions, 6: summary card
    answers: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null
    }
  };

  const overlay = document.getElementById('quizModalOverlay');
  if (!overlay) return;

  const closeBtn = document.getElementById('quizCloseBtn');
  const backBtn = document.getElementById('quizBackBtn');
  const progressBar = document.getElementById('quizProgressBar');
  const stepCountText = document.getElementById('quizStepCount');
  const percentText = document.getElementById('quizPercentText');
  const footerIndicator = document.getElementById('quizFooterIndicator');
  const steps = document.querySelectorAll('.quiz-step');
  const submitWhatsappBtn = document.getElementById('quizSubmitWhatsappBtn');

  // Summary fields
  const summaryFields = {
    1: document.getElementById('summaryAns1'),
    2: document.getElementById('summaryAns2'),
    3: document.getElementById('summaryAns3'),
    4: document.getElementById('summaryAns4'),
    5: document.getElementById('summaryAns5')
  };

  // Open modal
  function openModal(preferredBudget) {
    if (preferredBudget) {
      quizState.answers[4] = preferredBudget;
    }
    quizState.currentStep = 1;
    renderStep();
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Render current step & progress
  function renderStep() {
    const step = quizState.currentStep;

    // Progress bar calculations
    if (step <= TOTAL_QUESTIONS) {
      const progress = Math.round((step / TOTAL_QUESTIONS) * 100);
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (stepCountText) stepCountText.textContent = `Step ${step} of ${TOTAL_QUESTIONS}`;
      if (percentText) percentText.textContent = `${progress}%`;
      if (footerIndicator) footerIndicator.textContent = `Step ${step} of ${TOTAL_QUESTIONS}`;
    } else {
      // Step 6: Summary
      if (progressBar) progressBar.style.width = '100%';
      if (stepCountText) stepCountText.textContent = 'Diagnostic Complete';
      if (percentText) percentText.textContent = '100%';
      if (footerIndicator) footerIndicator.textContent = 'Summary';
      populateSummary();
    }

    // Toggle active step
    steps.forEach((el) => {
      const elStep = parseInt(el.getAttribute('data-step'), 10);
      if (elStep === step) {
        el.classList.add('active');

        // Sync selected button state if answer already chosen
        const selectedVal = quizState.answers[step];
        const buttons = el.querySelectorAll('.quiz-option-btn');
        buttons.forEach((btn) => {
          if (selectedVal && btn.getAttribute('data-value') === selectedVal) {
            btn.classList.add('selected');
          } else {
            btn.classList.remove('selected');
          }
        });
      } else {
        el.classList.remove('active');
      }
    });

    // Back button state
    if (backBtn) {
      if (step === 1) {
        backBtn.setAttribute('disabled', 'true');
      } else {
        backBtn.removeAttribute('disabled');
      }
    }
  }

  // Populate summary card values
  function populateSummary() {
    const a = quizState.answers;
    if (summaryFields[1]) summaryFields[1].textContent = a[1] || 'Not specified';
    if (summaryFields[2]) summaryFields[2].textContent = a[2] || 'Not specified';
    if (summaryFields[3]) summaryFields[3].textContent = a[3] || 'Not specified';
    if (summaryFields[4]) summaryFields[4].textContent = a[4] || 'Not specified';
    if (summaryFields[5]) summaryFields[5].textContent = a[5] || 'Not specified';
  }

  // Single-tap selection with auto-advance
  function selectOption(step, value) {
    quizState.answers[step] = value;

    // Visual feedback on selected button
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (currentStepEl) {
      currentStepEl.querySelectorAll('.quiz-option-btn').forEach((btn) => {
        if (btn.getAttribute('data-value') === value) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
      });
    }

    // Smooth single-tap advance
    setTimeout(() => {
      if (step < TOTAL_QUESTIONS) {
        quizState.currentStep = step + 1;
        renderStep();
      } else {
        // Move to final summary card
        quizState.currentStep = 6;
        renderStep();
      }
    }, 170);
  }

  // Complete and redirect to WhatsApp
  function finishQuiz() {
    const a = quizState.answers;
    const inventory = a[1] || 'Not specified';
    const delivery = a[2] || 'Not specified';
    const experience = a[3] || 'Not specified';
    const budget = a[4] || 'Not specified';
    const timeline = a[5] || 'Not specified';

    const message = 
`Hello Daniel, I completed the diagnostic on Eastleigh E-commerce Ads:
- Inventory: ${inventory}
- Delivery Scope: ${delivery}
- Ad Experience: ${experience}
- Planned Budget: ${budget}
- Launch Timeline: ${timeline}

Let us discuss my campaign setup.`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    closeModal();
    window.location.href = waUrl;
  }

  // Bind tap-card option clicks
  document.querySelectorAll('.quiz-option-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const stepEl = this.closest('.quiz-step');
      if (!stepEl) return;
      const step = parseInt(stepEl.getAttribute('data-step'), 10);
      const value = this.getAttribute('data-value');
      selectOption(step, value);
    });
  });

  // Back button navigation
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (quizState.currentStep > 1) {
        quizState.currentStep -= 1;
        renderStep();
      }
    });
  }

  // Final WhatsApp CTA button
  if (submitWhatsappBtn) {
    submitWhatsappBtn.addEventListener('click', finishQuiz);
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach triggers to primary CTAs ("Get Started", "Claim Free Audit", "Scale My Ads", etc.)
  function attachTriggers() {
    const ctaSelectors = [
      'nav .btn',
      '.hero .cta .btn:not([href^="#"])',
      '.grid .card .btn',
      '.mp .btn',
      '.end .btn',
      '.sb .btn',
      '.wa',
      '[data-open-quiz]'
    ];

    document.querySelectorAll(ctaSelectors.join(', ')).forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const href = this.getAttribute('href') || '';
        if (href.startsWith('#')) return; // Smooth scroll for internal anchors (#pricing)

        e.preventDefault();

        let preferredBudget = null;
        const text = (this.textContent || '').toLowerCase();
        const cardTitle = (this.closest('.card')?.querySelector('h3')?.textContent || '').toLowerCase();

        if (text.includes('starter') || cardTitle.includes('starter')) {
          preferredBudget = 'KSh 15,000 (Starter - WhatsApp Funnel)';
        } else if (text.includes('growth') || cardTitle.includes('growth')) {
          preferredBudget = 'KSh 50,000 (Growth - Landing Page)';
        } else if (text.includes('scale') || cardTitle.includes('scale') || text.includes('scale my ads')) {
          preferredBudget = 'KSh 100,000+ (Scale - Commerce Suite)';
        }

        openModal(preferredBudget);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachTriggers);
  } else {
    attachTriggers();
  }

  // Global window API for direct control
  window.EastleighQuiz = {
    open: openModal,
    close: closeModal
  };
})();
