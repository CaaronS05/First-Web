function updateSelectedText() {
  const checkboxes = document.querySelectorAll(
    'input[name="diseases"]:checked'
  );
  const selectedText = document.getElementById("selectedText");
  const selectedCount = document.getElementById("selectedCount");

  if (!selectedText || !selectedCount) {
    return;
  }

  const count = checkboxes.length;
  selectedCount.textContent = `${count} penyakit dipilih`;

  if (count === 0) {
    selectedText.textContent = "Pilih Riwayat Penyakit";
  } else if (count === 1) {
    selectedText.textContent = checkboxes[0].value;
  } else {
    selectedText.textContent = `${count} penyakit dipilih`;
  }
}

// -------------------------

function toggleDropdown() {
  const content = document.getElementById("dropdownContent");
  const arrow = document.getElementById("dropdownArrow");
  const selectedCountElement = document.getElementById("selectedCount");

  if (!content || !arrow || !selectedCountElement) {
    console.error(
      "toggleDropdown: Elemen #dropdownContent, #dropdownArrow, atau #selectedCount tidak ditemukan."
    );
    return;
  }

  const dropdownContainer = content.closest(".dropdown-container");
  if (!dropdownContainer) {
    console.error(
      "toggleDropdown: Kontainer .dropdown-container tidak ditemukan."
    );
    return;
  }

  const isCurrentlyOpen = content.classList.contains("show");

  const originalSelectedCountMarginTopKey = "originalMarginTop";
  if (
    selectedCountElement.dataset[originalSelectedCountMarginTopKey] ===
    undefined
  ) {
    selectedCountElement.dataset[originalSelectedCountMarginTopKey] =
      getComputedStyle(selectedCountElement).marginTop;
  }
  const originalSelectedCountMarginTopValue =
    selectedCountElement.dataset[originalSelectedCountMarginTopKey];
  const originalSelectedCountMarginTopPixels =
    parseFloat(originalSelectedCountMarginTopValue) || 0;

  const originalPaddingBottomValue =
    dropdownContainer.dataset.originalPaddingBottom;

  if (!isCurrentlyOpen) {
    content.classList.add("show");
    arrow.classList.add("open");

    const contentHeight = content.offsetHeight;

    const newSelectedCountMarginTop =
      originalSelectedCountMarginTopPixels + contentHeight + "px";
    selectedCountElement.style.marginTop = newSelectedCountMarginTop;
  } else {
    content.classList.remove("show");
    arrow.classList.remove("open");

    selectedCountElement.style.marginTop = originalSelectedCountMarginTopValue;

    if (dropdownContainer.style.paddingBottom !== originalPaddingBottomValue) {
      dropdownContainer.style.paddingBottom = originalPaddingBottomValue;
    }
  }
}

// --------------------------

document.addEventListener("DOMContentLoaded", function () {
  const dropdownContainer = document.querySelector(".dropdown-container");
  const selectedCountElement = document.getElementById("selectedCount");

  if (dropdownContainer) {
    const initialPaddingBottom = "0px";
    dropdownContainer.style.paddingBottom = initialPaddingBottom;
    dropdownContainer.dataset.originalPaddingBottom = initialPaddingBottom;
  } else {
    console.error(
      "DOMContentLoaded: .dropdown-container tidak ditemukan untuk inisialisasi."
    );
  }

  if (selectedCountElement) {
    const initialMarginTop = "5px";
    selectedCountElement.style.marginTop = initialMarginTop;
    selectedCountElement.dataset.originalMarginTop = initialMarginTop;
  } else {
    console.error(
      "DOMContentLoaded: #selectedCount tidak ditemukan untuk inisialisasi."
    );
  }

  const dropdownHeader = document.querySelector(".dropdown-header");
  if (dropdownHeader) {
    dropdownHeader.addEventListener("click", toggleDropdown);
  } else {
    console.error(
      "DOMContentLoaded: .dropdown-header tidak ditemukan untuk event listener klik."
    );
  }

  const checkboxes = document.querySelectorAll('input[name="diseases"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateSelectedText);
  });
  updateSelectedText();

  document.addEventListener("click", function (event) {
    const mainDropdownContainer = document.querySelector(".dropdown-container");
    const content = document.getElementById("dropdownContent");

    if (!mainDropdownContainer || !content) return;

    const dropdownHeaderElement =
      mainDropdownContainer.querySelector(".dropdown-header");
    if (dropdownHeaderElement && dropdownHeaderElement.contains(event.target)) {
      return;
    }

    if (
      !mainDropdownContainer.contains(event.target) &&
      content.classList.contains("show")
    ) {
      toggleDropdown();
    }
  });
});

// -------------------------

const healthForm = document.getElementById("healthForm");
if (healthForm) {
  healthForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const dietRadioButton = document.querySelector(
      'input[name="diet"]:checked'
    );
    const dietValue = dietRadioButton ? dietRadioButton.value : "";
    const formData = {
      diet: dietValue,
      allergies: document.getElementById("allergies").value,
      diseases: Array.from(
        document.querySelectorAll('input[name="diseases"]:checked')
      ).map((cb) => cb.value),
      otherDiseases: document.getElementById("otherDiseases").value,
      diseaseExplanation: document.getElementById("diseaseExplanation").value,
      drugAllergies: document.getElementById("drugAllergies").value,
    };
    console.log("Form Data:", formData);
    alert("Form berhasil disubmit! Data telah disimpan.");
  });
} else {
  console.error(
    "DOMContentLoaded: Form dengan ID #healthForm tidak ditemukan."
  );
}
