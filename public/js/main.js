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
  
  // Initialize the image carousel
  initCarousel();
  
  // Handle contact form submission
  const contactForm = document.querySelector('.contact form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Job analysis form handling
  const jobAnalysisForm = document.getElementById('jobAnalysisForm');
  if (jobAnalysisForm) {
    jobAnalysisForm.addEventListener('submit', handleJobAnalysis);
  }
  
  // Add restart button handler
  const restartButton = document.getElementById('restartAnalysis');
  if (restartButton) {
    restartButton.addEventListener('click', () => {
      moveToStep(1);
      
      // Reset progress indicators
      document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('completed');
      });
      
      document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.classList.remove('completed');
      });
    });
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
    console.log('Fetching projects...');
    const response = await fetch('/api/projects/getAllProjects');
    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('API response:', result);
    
    if (result.status === 200 && result.data && result.data.length > 0) {
      console.log('Displaying', result.data.length, 'projects');
      displayProjects(result.data);
    } else {
      console.error('No projects found or error in response:', result.msg);
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
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
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

// Job Fit Analysis
async function handleJobAnalysis(e) {
  e.preventDefault();
  
  const jobDescription = document.getElementById('jobDescription').value.trim();
  if (!jobDescription) {
    alert('Please enter a job description.');
    return;
  }
  
  // Move to step 2 (analysis animation)
  moveToStep(2);
  
  // More detailed analysis steps for a more game-like experience
  const statusMessages = [
    'Extracting key skills from job description...',
    'Scanning for technical requirements...',
    'Identifying core competencies...',
    'Activating Claude AI analysis...',
    'Comparing with my skill set...',
    'Finding skill matches...',
    'Identifying skill gaps...',
    'Calculating match percentage...',
    'Generating AI insights...',
    'Preparing your personalized report...'
  ];
  
  let messageIndex = 0;
  const statusElement = document.getElementById('analysisStatus');
  
  // Update status message every 800ms for a faster pace
  const messageInterval = setInterval(() => {
    if (messageIndex < statusMessages.length) {
      statusElement.textContent = statusMessages[messageIndex];
      messageIndex++;
    } else {
      clearInterval(messageInterval);
    }
  }, 800);
  
  try {
    // Call the API endpoint
    const response = fetch('/api/job-analysis/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobDescription })
    })
    .then(response => response.json())
    .then(result => {
      // Clear the message interval if it's still running
      clearInterval(messageInterval);
      
      if (result.status === 200 && result.data) {
        // Wait at least 4 seconds total for the animation before showing results
        // Calculate how much time has already passed showing messages
        const elapsedTime = messageIndex * 800;
        const remainingTime = Math.max(0, 4000 - elapsedTime);
        
        setTimeout(() => {
          // Display results
          displayAnalysisResults(result.data);
          
          // Move to step 3 (results)
          moveToStep(3);
          
          // Mark all steps as completed
          document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index < 2) { // Only steps 1 and 2
              step.classList.add('completed');
            }
          });
          
          // Mark all progress bars as completed
          document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.classList.add('completed');
          });
        }, remainingTime);
      } else {
        throw new Error(result.msg || 'Error analyzing job');
      }
    })
    .catch(error => {
      console.error('Error analyzing job fit:', error);
      alert('An error occurred during analysis. Please try again.');
      // Go back to step 1
      moveToStep(1);
    });
  } catch (error) {
    console.error('Error analyzing job fit:', error);
    alert('An error occurred during analysis. Please try again.');
    // Go back to step 1
    moveToStep(1);
  }
}

function displayAnalysisResults(result) {
  const scoreElement = document.getElementById('fitScoreValue');
  const analysisElement = document.getElementById('fitAnalysis');
  const matchingSkillsElement = document.getElementById('matchingSkills');
  const missingSkillsElement = document.getElementById('missingSkills');
  const skillBadgesElement = document.getElementById('skillBadges');
  
  if (scoreElement && analysisElement && matchingSkillsElement && missingSkillsElement) {
    // Display score with animation
    animateScore(scoreElement, result.score);
    
    // Animate meter path based on score
    animateMeterPath(result.score);
    
    // Display analysis
    analysisElement.textContent = result.analysis;
    
    // Display matching skills
    matchingSkillsElement.innerHTML = '';
    result.matchingSkills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      matchingSkillsElement.appendChild(li);
    });
    
    // Display missing skills
    missingSkillsElement.innerHTML = '';
    result.missingSkills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      missingSkillsElement.appendChild(li);
    });
    
    // Generate skill badges
    generateSkillBadges(skillBadgesElement, result.matchingSkills);
    
    // Add confetti effect for high scores (>= 80%)
    if (result.score >= 80) {
      createConfetti();
      // Add glow effect to meter
      document.querySelector('.meter-circle').setAttribute('data-score', 'high');
    }
  }
}

function createConfetti() {
  // Create confetti container if it doesn't exist
  let confettiContainer = document.querySelector('.confetti-container');
  
  if (!confettiContainer) {
    confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.querySelector('.results-container').appendChild(confettiContainer);
  } else {
    confettiContainer.innerHTML = '';
  }
  
  // Generate confetti pieces
  const colors = ['#4a6cf7', '#28a745', '#ffc107', '#dc3545', '#17a2b8'];
  const shapes = ['circle', 'square', 'triangle'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Random position
    const left = Math.random() * 100;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random shape
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Random size
    const size = Math.random() * 10 + 5;
    
    // Set styles
    confetti.style.left = `${left}%`;
    confetti.style.backgroundColor = color;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    // Different animation duration
    const duration = Math.random() * 3 + 2;
    confetti.style.animationDuration = `${duration}s`;
    
    // Set delay
    const delay = Math.random() * 0.5;
    confetti.style.animationDelay = `${delay}s`;
    
    // Set shape
    if (shape === 'circle') {
      confetti.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
      confetti.style.width = '0';
      confetti.style.height = '0';
      confetti.style.backgroundColor = 'transparent';
      confetti.style.borderLeft = `${size/2}px solid transparent`;
      confetti.style.borderRight = `${size/2}px solid transparent`;
      confetti.style.borderBottom = `${size}px solid ${color}`;
    }
    
    confettiContainer.appendChild(confetti);
  }
  
  // Remove confetti after animation completes
  setTimeout(() => {
    confettiContainer.remove();
  }, 5000);
}

function animateScore(element, targetScore) {
  let currentScore = 0;
  const duration = 1500; // milliseconds
  const step = targetScore / (duration / 20); // update every 20ms
  
  element.textContent = '0';
  
  const timer = setInterval(() => {
    currentScore += step;
    if (currentScore >= targetScore) {
      clearInterval(timer);
      currentScore = targetScore;
    }
    
    element.textContent = Math.floor(currentScore);
  }, 20);
}

function animateMeterPath(score) {
  // Get the meter path element
  const meterPath = document.getElementById('meter-path');
  if (!meterPath) return;
  
  // Set the color based on the score
  let color;
  if (score >= 80) {
    color = '#28a745'; // Green for high match
  } else if (score >= 60) {
    color = '#ffc107'; // Yellow for medium match
  } else {
    color = '#dc3545'; // Red for low match
  }
  
  // Set the stroke color
  meterPath.style.stroke = color;
  
  // Calculate stroke-dasharray and stroke-dashoffset for animation
  const pathLength = meterPath.getTotalLength ? meterPath.getTotalLength() : 200;
  const offset = pathLength - (pathLength * score / 100);
  
  meterPath.style.strokeDasharray = pathLength;
  meterPath.style.strokeDashoffset = pathLength;
  
  // Trigger animation
  setTimeout(() => {
    meterPath.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
    meterPath.style.strokeDashoffset = offset;
  }, 100);
}

function generateSkillBadges(container, skills) {
  if (!container) return;
  
  // Clear previous badges
  container.innerHTML = '';
  
  // Create badges for top skills (limit to 5 for space)
  const topSkills = skills.slice(0, 5);
  
  // Skill levels and icons
  const skillLevels = {
    'JavaScript': { level: 'expert', icon: 'fa-js' },
    'HTML': { level: 'expert', icon: 'fa-html5' },
    'CSS': { level: 'expert', icon: 'fa-css3-alt' },
    'React': { level: 'expert', icon: 'fa-react' },
    'Node.js': { level: 'expert', icon: 'fa-node-js' },
    'MongoDB': { level: 'intermediate', icon: 'fa-database' },
    'Git': { level: 'expert', icon: 'fa-git-alt' },
    'RESTful APIs': { level: 'expert', icon: 'fa-code' },
    'Responsive Design': { level: 'expert', icon: 'fa-mobile-alt' }
  };
  
  topSkills.forEach(skill => {
    const badge = document.createElement('div');
    badge.classList.add('skill-badge');
    
    const skillInfo = skillLevels[skill] || { level: 'intermediate', icon: 'fa-code' };
    badge.classList.add(skillInfo.level);
    
    badge.innerHTML = `<i class="fab ${skillInfo.icon}"></i> ${skill}`;
    container.appendChild(badge);
    
    // Animate badges appearing one after another
    setTimeout(() => {
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, topSkills.indexOf(skill) * 200);
  });
}

function moveToStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll('.wizard-step').forEach(step => {
    step.classList.remove('active');
  });
  
  // Show the target step
  const targetStep = document.getElementById(`step${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add('active');
  }
  
  // Update progress indicators
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.classList.remove('active');
    if (index + 1 === stepNumber) {
      step.classList.add('active');
    }
  });
}

// Initialize Carousel
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const maxIndex = slides.length - 1;
  
  // Function to update slide display
  function updateSlide(newIndex) {
    // Handle circular navigation
    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;
    
    // Update active class
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[newIndex].classList.add('active');
    indicators[newIndex].classList.add('active');
    
    currentIndex = newIndex;
  }
  
  // Event listeners for navigation buttons
  prevBtn.addEventListener('click', () => {
    updateSlide(currentIndex - 1);
    addFloatingShapes();
  });
  
  nextBtn.addEventListener('click', () => {
    updateSlide(currentIndex + 1);
    addFloatingShapes();
  });
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateSlide(index);
      addFloatingShapes();
    });
  });
  
  // Add some fun floating shapes during transitions
  function addFloatingShapes() {
    const container = document.querySelector('.carousel-container');
    const colors = ['#4a6cf7', '#f7c04a', '#4af76f', '#f74a6c'];
    
    // Create 5 random shapes
    for (let i = 0; i < 5; i++) {
      const shape = document.createElement('div');
      shape.classList.add('floating-shape');
      
      // Random styling
      const size = Math.random() * 15 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const isCircle = Math.random() > 0.5;
      
      // Set style
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.backgroundColor = color;
      shape.style.left = `${left}%`;
      shape.style.top = '50%';
      shape.style.position = 'absolute';
      shape.style.zIndex = '0';
      shape.style.opacity = '0.7';
      
      if (isCircle) {
        shape.style.borderRadius = '50%';
      } else {
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;
      }
      
      // Animation
      shape.style.animation = `floatAway ${Math.random() * 2 + 1}s forwards`;
      
      // Add to container
      container.appendChild(shape);
      
      // Remove after animation
      setTimeout(() => {
        shape.remove();
      }, 3000);
    }
  }
  
  // Add keydown event for arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      updateSlide(currentIndex - 1);
      addFloatingShapes();
    } else if (e.key === 'ArrowRight') {
      updateSlide(currentIndex + 1);
      addFloatingShapes();
    }
  });
}

// Add floating animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes floatAway {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0.7;
    }
    100% {
      transform: translate(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100 + 50}px, 
                         ${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100 + 50}px) 
                rotate(${Math.random() * 360}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet); 