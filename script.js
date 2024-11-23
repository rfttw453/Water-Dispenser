let selectedQuantity = 50;
let isCupPlaced = false;

// Simulate connection and cup placement
function checkConnection() {
  const connectionStatus = document.getElementById("connectionStatus");

  // Simulate a delay to show "Connected to Dispenser" after 2 seconds
  setTimeout(() => {
    connectionStatus.textContent = "Connected to Dispenser";
    connectionStatus.classList.add("connected");
    connectionStatus.classList.remove("disconnected");

    // Simulate initial cup placement status
    updateCupStatus();
  }, 2000); // Adjust this delay for a realistic connection simulation
}

// Toggle cup placement
function toggleCup() {
  isCupPlaced = !isCupPlaced;
  updateCupStatus();

  if (!isCupPlaced) {
    const water = document.getElementById("water");
    const percentageDisplay = document.getElementById("percentageDisplay");

    // Reset the water and percentage display when the cup is removed
    water.style.height = "0%";
    percentageDisplay.classList.add("hidden");
  }
}

// Update cup placement status
function updateCupStatus() {
  const cupStatus = document.getElementById("cupStatus");

  if (isCupPlaced) {
    cupStatus.textContent = "Cup Detected";
    cupStatus.classList.add("connected-cup");
    cupStatus.classList.remove("disconnected");
  } else {
    cupStatus.textContent = "Place a Cup";
    cupStatus.classList.add("disconnected");
    cupStatus.classList.remove("connected-cup");
  }
}

// Update quantity display
function updateQuantity() {
  const slider = document.getElementById("quantitySlider");
  const quantityDisplay = document.getElementById("quantityDisplay");
  selectedQuantity = slider.value;
  quantityDisplay.textContent = `Selected: ${selectedQuantity}ml`;
}

// Simulate water dispensing
function dispenseWater() {
  if (!isCupPlaced) {
    alert("Please place a cup before dispensing.");
    return;
  }

  const water = document.getElementById("water");
  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");
  const percentageDisplay = document.getElementById("percentageDisplay");

  // Reset previous animations
  water.classList.remove("hidden");
  water.style.height = "0%";
  progressContainer.classList.remove("hidden");
  progressBar.style.width = "0%";
  percentageDisplay.classList.remove("hidden");
  percentageDisplay.textContent = "0%";

  // Simulate water filling based on the selected quantity
  const fillHeight = 75; // Always fills 75% of the cup
  const animationDuration = (selectedQuantity / 300) * 5000; // Adjust duration for a smoother filling animation

  let percentage = 0;

  const interval = setInterval(() => {
    percentage += 5;
    if (percentage >= 100) {
      percentageDisplay.textContent = "Remove Cup";
      clearInterval(interval);
    } else {
      percentageDisplay.textContent = `${percentage}%`;
    }
  }, animationDuration / 20);

  setTimeout(() => {
    water.style.height = `${fillHeight}%`;
    progressBar.style.width = "100%";
  }, 100); // Start animation
}

// Enter Test Mode
function enterTestMode() {
  document.getElementById("mainScreen").classList.add("hidden");
  document.getElementById("passwordScreen").classList.remove("hidden");
}

// Check password
function checkPassword() {
  const passwordInput = document.getElementById("passwordInput").value;

  if (passwordInput === "1964") {
    document.getElementById("passwordScreen").classList.add("hidden");
    document.getElementById("testScreen").classList.remove("hidden");
  } else {
    alert("Incorrect password!");
  }
}

// Test dispense functions
function startTestDispense() {
  if (!isCupPlaced) {
    alert("Please place a cup before test dispensing.");
    return;
  }

  const water = document.getElementById("water");
  water.classList.remove("hidden");
  water.style.height = "75%"; // Fill to 75% for test dispense
}

function stopTestDispense() {
  const water = document.getElementById("water");
  water.style.height = "0%"; // Reset water height after stopping
}

// Return to main screen
function returnToMain() {
  document.getElementById("passwordScreen").classList.add("hidden");
  document.getElementById("testScreen").classList.add("hidden");
  document.getElementById("mainScreen").classList.remove("hidden");
}

// Run connection check on page load
window.onload = checkConnection;
