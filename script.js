document.addEventListener("DOMContentLoaded", function () {
  // Contact form handling
  var form = document.getElementById("contactForm");
  var formMessage = document.getElementById("formMessage");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      formMessage.textContent =
        "Thank you for reaching out! I will get back to you soon.";
      form.reset();
    });
  }

  // Highlight active nav link based on current page
  var navLinks = document.querySelectorAll(".nav-links a");
  var path = window.location.pathname.split("/").pop();
  navLinks.forEach(function (link) {
    if (
      link.getAttribute("href") === path ||
      (path === "" && link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Project filtering functionality
  if (window.location.pathname.endsWith("projects.html")) {
    var projectsGrid = document.getElementById("projectsGrid");
    var filterButtons = document.querySelectorAll(".filter-btn");

    function renderProjects(filter) {
      if (!window.projectsData) return;
      projectsGrid.innerHTML = "";
      var filtered =
        filter === "all"
          ? projectsData
          : projectsData.filter(function (p) {
              return p.category === filter;
            });
      filtered.forEach(function (project) {
        var card = document.createElement("div");
        card.className = "project-card";
        card.setAttribute("data-category", project.category);
        card.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" class="project-icon" />
                    </div>
                    <div class="project-content">
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a href="${project.link}" class="btn btn-secondary">View</a>
                        </div>
                    </div>
                `;
        projectsGrid.appendChild(card);
      });
    }

    renderProjects("all");
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        renderProjects(filter);
      });
    });
  }
  var projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    // Add click event to each filter button
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        // Get filter value
        var filterValue = this.getAttribute("data-filter");
        console.log("Filter clicked:", filterValue);

        // Show/hide projects based on filter
        projectCards.forEach(function (card) {
          var cardCategory = card.getAttribute("data-category");
          console.log("Card category:", cardCategory);

          if (filterValue === "all") {
            // Reset display style first
            card.style.display = "flex";
            // Add animation
            setTimeout(function () {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else if (cardCategory === filterValue) {
            // Reset display style first
            card.style.display = "flex";
            // Add animation
            setTimeout(function () {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            // Hide this card
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(function () {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Initialize projects with animation
  projectCards.forEach(function (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    setTimeout(function () {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 50);
  });
}); // End of DOMContentLoaded event listener
