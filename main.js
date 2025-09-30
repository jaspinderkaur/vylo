// Vylo Landing Page JavaScript
// Lightweight, framework-free implementation

// DOM Ready utility
function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Toast notification system
function showToast(message, type = 'success') {
    // Remove existing toast if present
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#3CFFBC' : '#FF6B6B',
        color: '#111',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: '1000',
        fontSize: '1rem',
        fontWeight: '500',
        maxWidth: '300px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        border: '1px solid rgba(0, 0, 0, 0.1)'
    });
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Form validation
function validateEmail(email) {
    return EMAIL_REGEX.test(email.trim());
}

// Waitlist form handler
function handleWaitlistSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showToast('Please enter your email address.', 'error');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
    }
    
    // Simulate form submission (replace with actual endpoint)
    console.log('Submitting email:', email);
    
    // Show success message
    showToast('Thanks! You\'re on the list.', 'success');
    
    // Reset form
    form.reset();
    
    // Optional: Track conversion (replace with your analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
        });
    }
}

// Initialize current year in footer
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize form handlers
function initFormHandlers() {
    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        // Remove any existing event listeners
        waitlistForm.removeEventListener('submit', handleWaitlistSubmit);
        // Add new event listener
        waitlistForm.addEventListener('submit', handleWaitlistSubmit);
    }
}

// Initialize everything when DOM is ready
domReady(() => {
    initCurrentYear();
    initFormHandlers();
    
    console.log('Vylo landing page initialized');
});

/* 
=== ALTERNATIVE IMPLEMENTATIONS ===

(A) FORMSPREE INTEGRATION:
To use Formspree instead of JavaScript handling:

1. Replace the form action in HTML:
   <form class="waitlist-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   
2. Remove the onsubmit handler from HTML:
   <form class="waitlist-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   
3. Add a hidden input for form name (optional):
   <input type="hidden" name="_subject" value="Vylo Waitlist Signup">
   
4. Remove the JavaScript form handler:
   // Comment out or remove the initFormHandlers() call
   // initFormHandlers();
   
5. Formspree will handle validation and show success/error pages automatically.

(B) BEEHIIV/CONVERTKIT INTEGRATION:
To use Beehiiv or ConvertKit:

1. Replace the entire form section in HTML with provider's embed code:

   For Beehiiv:
   <div id="beehiiv-embed" data-embed="YOUR_EMBED_ID"></div>
   <script src="https://embeds.beehiiv.com/embed.js" async></script>
   
   For ConvertKit:
   <form action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions" method="post">
       <input type="email" name="email_address" placeholder="Enter your email" required>
       <button type="submit">Join the waitlist</button>
   </form>
   
2. Remove the JavaScript form handler:
   // Comment out or remove the initFormHandlers() call
   // initFormHandlers();
   
3. Style the provider's form elements to match your design:
   .beehiiv-embed input,
   .convertkit-form input {
       /* Apply your custom styles */
  /* }

(C) ANALYTICS INTEGRATION:
To track form submissions:

1. Google Analytics 4:
   if (typeof gtag !== 'undefined') {
       gtag('event', 'form_submit', {
           'event_category': 'engagement',
           'event_label': 'waitlist_signup'
       });
   }

2. Facebook Pixel:
   if (typeof fbq !== 'undefined') {
       fbq('track', 'Lead');
   }

3. Custom analytics endpoint:
   fetch('/api/track-signup', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email: email, source: 'landing_page' })
   });

*/
