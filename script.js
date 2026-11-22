const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

header.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

header.classList.add('menu-ready');

const photoDialog = document.querySelector('.gallery-dialog');

if (typeof photoDialog.showModal === 'function') {
  const dialogTitle = photoDialog.querySelector('#foto-titulo');
  const dialogImage = photoDialog.querySelector('img');
  const closePhoto = photoDialog.querySelector('.close-photo');
  const photoGrid = document.querySelector('.photo-grid');

  photoGrid.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    const thumbnail = link.querySelector('img');
    dialogImage.alt = thumbnail.alt;
    dialogImage.src = link.href;
    dialogTitle.textContent = link.closest('figure').querySelector('figcaption').textContent;
    photoDialog.showModal();
    event.preventDefault();
  });

  closePhoto.addEventListener('click', () => photoDialog.close());
  photoDialog.addEventListener('click', (event) => {
    if (event.target === photoDialog) photoDialog.close();
  });
}
