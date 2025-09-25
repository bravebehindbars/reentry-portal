// JavaScript for Modal Frames
// Handles opening, closing, and dynamic content (title, iframe src)

// Get modal elements
const modal = document.getElementById('modal'); // modal container
const modalCloseBtn = document.getElementById('modal-close'); // close button
const modalIframe = document.getElementById('modal-iframe'); // iframe content
const modalTitle = document.getElementById('modal-title'); // modal title

// Open modal with given title and iframe URL
function openModal(title, url) {
  modalTitle.textContent = title; // set modal title
  modalIframe.title = title;       // set iframe title
  modalIframe.src = url;           // load content in iframe

  modal.classList.add('active');   // show modal
  modal.setAttribute('aria-hidden', 'false'); // accessibility

  // When iframe loads, adjust content if modal=true
  modalIframe.onload = () => {
    try {
      const iframeDoc = modalIframe.contentDocument || modalIframe.contentWindow.document;
      const params = new URLSearchParams(url.split('?')[1]);

      if (params.get('modal') === 'true') {
        // Hide all nav lists but leave clock visible
        const navLists = iframeDoc.querySelectorAll('nav ul');
        navLists.forEach(list => list.style.display = 'none');

        // Remove footer navigation entirely
        const footerNav = iframeDoc.querySelector('footer nav');
        if (footerNav) footerNav.remove();
      }
    } catch (err) {
      // Ignore cross-origin errors
      console.warn('Cannot modify iframe content:', err);
    }
  };
}

// Close modal and unload iframe
function closeModal() {
  modal.classList.remove('active'); // hide modal
  modal.setAttribute('aria-hidden', 'true'); // accessibility
  modalIframe.src = ''; // unload iframe
}

// Panel button triggers
document.getElementById('open-jobs').addEventListener('click', (e) => {
  e.preventDefault(); // prevent link navigation
  openModal('', 'HTML/jobs.html?modal=true'); // open jobs modal
});

document.getElementById('open-housing').addEventListener('click', (e) => {
  e.preventDefault();
  openModal('', 'HTML/housing.html?modal=true'); // open housing modal
});

document.getElementById('open-resources').addEventListener('click', (e) => {
  e.preventDefault();
  openModal('', 'HTML/resources.html?modal=true'); // open resources modal
});

// Close modal events
modalCloseBtn.addEventListener('click', closeModal); // close button click
modal.addEventListener('click', (e) => {            // click outside content
  if (e.target === modal) closeModal();
});
