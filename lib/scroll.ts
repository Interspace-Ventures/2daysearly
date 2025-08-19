// Constants
const NAVBAR_HEIGHT = 96; // Increased to account for navbar height + padding + margin

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }
}

export function getActiveSection(): string {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    if (window.scrollY >= sectionTop - (NAVBAR_HEIGHT + 100) && window.scrollY < sectionTop + sectionHeight - (NAVBAR_HEIGHT + 100)) {
      currentSection = section.id;
    }
  });

  return currentSection;
}