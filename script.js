// Modo oscuro
const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');
const textSpan = toggleBtn.querySelector('span');

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    if (textSpan) textSpan.innerText = 'Light';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    if (textSpan) textSpan.innerText = 'Dark';
    localStorage.setItem('theme', 'light');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') setTheme('dark');
else if (savedTheme === 'light') setTheme('light');
else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// Copiar comando PowerShell
const copyBtn = document.getElementById('copyPsBtn');
const commandElement = document.getElementById('psCommand');

if (copyBtn && commandElement) {
  copyBtn.addEventListener('click', async () => {
    const command = commandElement.innerText;
    try {
      await navigator.clipboard.writeText(command);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      console.error('Copy failed: ', err);
    }
  });
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});