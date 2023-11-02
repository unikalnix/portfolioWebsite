document.addEventListener("DOMContentLoaded", function () {
  // Get the offcanvas element
  var offcanvasExample = new bootstrap.Offcanvas(
    document.getElementById("offcanvasExample")
  );

  // Get all links inside the offcanvas
  var links = document.querySelectorAll("#offcanvasExample a");

  // Function to handle smooth scrolling
  function smoothScrollToTarget(targetElement) {
    if (targetElement) {
      // Determine if you are in tab or mobile mode
      const isTabMode = window.innerWidth >= 768;

      // Get the height of the fixed navigation bar
      const navbarHeight = isTabMode
        ? document.querySelector(".tab-nav-bar").offsetHeight
        : document.querySelector(".mobile-nav-bar").offsetHeight;

      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  }

  // Function to change the navigation bar background color
  function changeNavbarBackgroundColor(color) {
    const navbar = document.querySelector(".tab-nav-bar, .mobile-nav-bar");
    navbar.style.backgroundColor = color;
  }

  // Add a click event listener to each link in the mobile nav bar
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior

      // Close the offcanvas when a link is clicked
      offcanvasExample.hide();

      // Scroll to the target section
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      smoothScrollToTarget(targetElement);

      // Change the navbar background color to black
      changeNavbarBackgroundColor("black");
    });
  });

  // Function to handle scrolling event and change background color
  function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition === 0) {
      // When user scrolls to the top, make the navbar transparent
      changeNavbarBackgroundColor("transparent");
    } else {
      // When the user is not at the top, set the background color to black
      changeNavbarBackgroundColor("black");
    }
  }

  // Smooth scroll function for navigation links in the tab nav bar and mobile nav bar
  const navbarLinks = document.querySelectorAll(".menu-li > a");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      smoothScrollToTarget(targetElement);

      // Change the navbar background color to black
      changeNavbarBackgroundColor("black");
    });
  });

  // Add a scroll event listener to track the user's scroll position
  window.addEventListener("scroll", handleScroll);

  // Your additional JavaScript code can go here if you have any.

  // Auto typing text code
  const textElement = document.getElementById("auto-typing-text");
  const names = ["Web Developer", "Web Designer", "Graphic Designer"];
  const typingSpeed = 100; // Adjust the typing speed (milliseconds per character)
  const deleteSpeed = 50; // Adjust the delete speed (milliseconds per character)
  const pauseTime = 2000; // Pause after fully typing a name
  let currentIndex = 0;
  let isDeleting = false;
  let charIndex = 0;

  function type() {
    const name = names[currentIndex];
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % names.length;
    }
    textElement.textContent = isDeleting
      ? name.substring(0, charIndex - 1)
      : name.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (charIndex === name.length && !isDeleting) {
      isDeleting = true;
      setTimeout(type, pauseTime);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
    }
  }

  window.onload = type; // Start the typing effect when the page loads
});// Function to handle scrolling event and change background color with transition
function handleScroll() {
  const scrollPosition = window.scrollY;
  const isTabMode = window.innerWidth >= 768;
  const navbar = document.querySelector(isTabMode ? ".tab-nav-bar" : ".mobile-nav-bar");

  if (scrollPosition === 0) {
    // When user scrolls to the top, make the navbar transparent with a smooth transition
    navbar.style.transition = "background-color 0.5s ease";
    navbar.style.backgroundColor = "transparent";
  } else {
    // When the user is not at the top, set the background color to black with a smooth transition
    navbar.style.transition = "background-color 0.5s ease";
    navbar.style.backgroundColor = "black";
  }
}

// Add a scroll event listener to track the user's scroll position
window.addEventListener("scroll", handleScroll);
