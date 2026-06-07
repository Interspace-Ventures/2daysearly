// Opens the 2 Days Early syndicate onboarding form (Tally) in a slide-up modal.
// Shared by the nav "JOIN" button and the hero "Apply to join" CTA.
// `onReady` fires once the form is on screen (or immediately if already open).

export function openTallyForm(onReady?: () => void): void {
  if (typeof document === 'undefined') return;

  // Check if form is already open
  const existingForm = document.getElementById('tally-form-container');
  if (existingForm) {
    onReady?.();
    return;
  }

  const formContainer = document.createElement('div');
  formContainer.id = 'tally-form-container';
  formContainer.style.position = 'fixed';
  formContainer.style.bottom = '0';
  formContainer.style.left = '0';
  formContainer.style.right = '0';
  formContainer.style.height = '90vh';
  formContainer.style.maxHeight = '90vh';
  formContainer.style.backgroundColor = 'white';
  formContainer.style.border = '4px solid #000000';
  formContainer.style.boxShadow = '0 -4px 0px 0px #166534';
  formContainer.style.zIndex = '9999';
  formContainer.style.transform = 'translateY(100%)';
  formContainer.style.transition = 'transform 0.3s ease-in-out';

  const titleContainer = document.createElement('div');
  titleContainer.style.padding = '1.5rem';
  titleContainer.style.borderBottom = '4px solid #000000';
  titleContainer.style.display = 'flex';
  titleContainer.style.justifyContent = 'space-between';
  titleContainer.style.alignItems = 'center';
  titleContainer.style.backgroundColor = '#16a34a';

  const title = document.createElement('h2');
  title.textContent = '2 DAYS EARLY SYNDICATE ONBOARDING';
  title.style.margin = '0';
  title.style.fontSize = '1.125rem';
  title.style.fontWeight = 'bold';
  title.style.color = 'white';
  title.style.fontFamily = 'Alexandria, Inter, sans-serif';

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.setAttribute('aria-label', 'Close onboarding form');
  closeButton.style.fontSize = '20px';
  closeButton.style.border = '3px solid #000000';
  closeButton.style.background = 'white';
  closeButton.style.cursor = 'pointer';
  closeButton.style.padding = '0.5rem 0.75rem';
  closeButton.style.lineHeight = '1';
  closeButton.style.color = 'black';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.fontFamily = 'Alexandria, Inter, sans-serif';
  closeButton.style.boxShadow = '3px 3px 0px 0px #166534';
  closeButton.style.transition = 'all 0.1s ease';

  const cleanup = () => {
    if (document.body.contains(formContainer)) {
      formContainer.style.transform = 'translateY(100%)';
      setTimeout(() => {
        document.body.removeChild(formContainer);
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
      }, 300);
    }
  };

  closeButton.onclick = cleanup;

  const iframe = document.createElement('iframe');
  iframe.src = 'https://tally.so/embed/nP1v8e?alignLeft=1&transparentBackground=1&hideTitle=1';
  iframe.style.width = '100%';
  iframe.style.height = 'calc(100% - 5rem)';
  iframe.style.border = 'none';
  iframe.style.padding = '1.5rem';
  iframe.title = '2 Days Early Syndicate Onboarding';

  iframe.onload = () => {
    onReady?.();
  };

  titleContainer.appendChild(title);
  titleContainer.appendChild(closeButton);
  formContainer.appendChild(titleContainer);
  formContainer.appendChild(iframe);

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '9998';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.3s ease-in-out';
  overlay.onclick = cleanup;

  document.body.appendChild(overlay);
  document.body.appendChild(formContainer);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    formContainer.style.transform = 'translateY(0)';
  });
}
