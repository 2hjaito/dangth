export function enableImageZoom() {
  if (typeof window === 'undefined') return;

  const bindZoom = () => {
    const images = document.querySelectorAll('.zoom-img');
    images.forEach((img) => {
      if ((img as HTMLElement).dataset.zoomBound) return;
      (img as HTMLElement).dataset.zoomBound = 'true';

      img.addEventListener('click', () => {
        const rect = img.getBoundingClientRect();
        const clone = img.cloneNode(true) as HTMLImageElement;
        clone.classList.add('zoom-clone');
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        document.body.appendChild(clone);

        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
          clone.style.top = `50%`;
          clone.style.left = `50%`;
          clone.style.transform = `translate(-50%, -50%)`;
          clone.style.maxWidth = 'calc(100vw - 40px)';
          clone.style.maxHeight = 'calc(100vh - 40px)';
          clone.style.width = 'auto';
          clone.style.height = 'auto';
          clone.style.objectFit = 'contain'; // đảm bảo không bị méo

          clone.style.cursor = 'zoom-out';

        });

        const closeZoom = () => {
          clone.style.transition = 'all 0.3s ease';
          clone.style.top = `${rect.top}px`;
          clone.style.left = `${rect.left}px`;
          clone.style.width = `${rect.width}px`;
          clone.style.height = `${rect.height}px`;
          clone.style.transform = `none`;

          overlay.remove();

          setTimeout(() => {
            clone.remove();
          }, 300);
        };

        clone.addEventListener('click', closeZoom);
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') closeZoom();
        }, { once: true });
      });
    });
  };

  // Initial bind
  bindZoom();

  // Observe DOM for dynamically added images
  const observer = new MutationObserver(bindZoom);
  observer.observe(document.body, { childList: true, subtree: true });
}