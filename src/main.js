import emailjs from "@emailjs/browser";

/* ================================
   EMAILJS INIT
================================ */
emailjs.init("A7-lH6styqOskiikV"); // Public key

/* ================================
   LOAD PARTIALS
================================ */
async function loadPartial(id, file) {
  const target = document.getElementById(id);

  if (!target) {
    console.warn(`[loadPartial] No element found with id="${id}"`);
    return false;
  }

  try {
    const res = await fetch(file);

    if (!res.ok) {
      console.error(`[loadPartial] Failed to fetch ${file} (${res.status})`);
      return false;
    }

    const html = await res.text();
    target.innerHTML = html;
    return true;
  } catch (err) {
    console.error(`[loadPartial] Error loading ${file}`, err);
    return false;
  }
}

/* ================================
   NAVIGATION
================================ */
function initNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const servicesDropdownToggle = document.getElementById(
    "services-dropdown-toggle",
  );
  const servicesDropdown = document.getElementById("services-dropdown");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  if (servicesDropdownToggle && servicesDropdown) {
    servicesDropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      servicesDropdown.classList.toggle("hidden");
    });
  }
}

/* ================================
   FORM LOGIC
================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const messageBox = document.getElementById("form-message");
  const submitBtn = document.getElementById("submit-btn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btn-text");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // ----------------------------
    // Simple Validation
    // ----------------------------
    if (!name || !email || !subject || !message) {
      showMessage("Please fill out all fields.", "error");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // ----------------------------
    // Loading State
    // ----------------------------
    submitBtn.disabled = true;
    spinner.classList.remove("hidden");
    btnText.textContent = "Sending...";
    messageBox.classList.add("hidden");

    try {
      await emailjs.sendForm("service_tkx9s0b", "contact_form", form);

      showMessage("Message sent successfully! ✅", "success");
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
      spinner.classList.add("hidden");
      btnText.textContent = "Send Message";
    }
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.classList.remove("hidden");

    if (type === "error") {
      messageBox.className = "mb-4 text-sm font-medium text-red-600";
    } else {
      messageBox.className = "mb-4 text-sm font-medium text-green-600";
    }
  }
}

/* ================================
   APP INIT
================================ */
document.addEventListener("DOMContentLoaded", async () => {
  const navLoaded = await loadPartial("nav", "/partials/nav.html");
  await loadPartial("footer", "/partials/footer.html");

  if (navLoaded) initNavigation();

  initContactForm();
});
