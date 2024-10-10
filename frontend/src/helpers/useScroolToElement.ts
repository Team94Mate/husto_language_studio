export const scrollToElement = (targetId: string) => {
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    window.location.hash = targetId;
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};
