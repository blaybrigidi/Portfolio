document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const navHeight = document.querySelector('header').offsetHeight;
    
    window.scrollTo({
      top: targetElement.offsetTop - navHeight,
      behavior: 'smooth'
    });
  }
  
  // Typewriter effect
  initTypewriter();
  
  // Load projects from API
  fetchProjects();
  
  // Handle contact form submission
  const contactForm = document.querySelector('.contact form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
});

// Typewriter effect implementation
function initTypewriter() {
  const dynamicTextElement = document.getElementById('dynamic-text');
  if (!dynamicTextElement) return;
  
  const roles = [
    'Full Stack Developer',
    'Mobile Application Engineer',
    'API Developer',
    'API Quality Assurance Engineer'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100; // Speed of typing
  let erasingDelay = 50; // Speed of erasing
  let newTextDelay = 2000; // Pause before typing new text
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Erasing
      dynamicTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      // Typing
      dynamicTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      // Done typing
      isDeleting = true;
      typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      // Done deleting
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(type, typingDelay);
  }
  
  // Start the typing effect
  setTimeout(type, newTextDelay);
}

async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    
    if (projects.length > 0) {
      displayProjects(projects);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

function displayProjects(projects) {
  const projectGrid = document.querySelector('.project-grid');
  
  if (!projectGrid) return;
  
  projectGrid.innerHTML = '';
  
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    
    const techHtml = project.technologies
      .map(tech => `<span>${tech}</span>`)
      .join('');
    
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.imageUrl || '/images/placeholder.jpg'}" alt="${project.title}">
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${techHtml}
        </div>
        <div class="project-links">
          ${project.projectUrl ? `<a href="${project.projectUrl}" target="_blank">View Project</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">View Code</a>` : ''}
        </div>
      </div>
    `;
    
    projectGrid.appendChild(projectCard);
  });
}

function handleContactForm(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const message = form.querySelector('#message').value;
  
  // Here you could implement actual form submission to your backend
  
  // For now, just log the data and reset the form
  console.log('Form submitted:', { name, email, message });
  form.reset();
  
  // Show success message
  alert('Thank you for your message! I will get back to you soon.');
} 