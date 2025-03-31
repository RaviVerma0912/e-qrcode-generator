// Get the button element with the class ".qr-button"
let btn = document.querySelector(".qr-button");

// Get the element to display the QR Code with the class ".qr-code"
let qr_code_element = document.querySelector(".qr-code");

// Get the link element to download the QR Code with the ID "downloadLink"
let downloadLink = document.getElementById("downloadLink");

// Add an event listener for the button when clicked
btn.addEventListener("click", () => {
  console.log("Button clicked"); // Debugging log
  // Get user input from the element with the ID "#input_text"
  let user_input = document.querySelector("#input_text");

  if (!user_input) {
    console.error("Input element not found");
    return;
  }

  // Check if the user input is not empty
  if (user_input.value !== "") {
    console.log("Valid input:", user_input.value); // Debugging log
    // If there is no QR Code, create a new QR Code
    if (qr_code_element.childElementCount === 0) {
      generate(user_input);
    } else {
      // If a QR Code already exists, remove the old one and create a new one
      qr_code_element.innerHTML = "";
      generate(user_input);
    }

    // Display the card if the input is valid
    showCard(user_input.value); // Display the card with the input text
  } else {
    // If the input is empty, show an error message and hide the QR Code and download link
    console.log("Invalid input");
    qr_code_element.style.display = "none";
    downloadLink.style.display = "none"; 
  }
});

// Function to generate the QR Code
function generate(user_input) {
  qr_code_element.style.display = "";
  qr_code_element.style.marginTop = "20px";
  qr_code_element.style.marginBottom = "20px";

  // Create a QR Code with the text from the user input
  var qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`, // Text for the QR Code taken from user input
    width: 180,  // Width of the QR Code
    height: 180, // Height of the QR Code
    colorDark: "#000000",  // Black color for the QR Code
    colorLight: "#FFFFFF",  // White color for the QR Code background
    correctLevel: QRCode.CorrectLevel.H,  // Highest error correction level
  });

  setTimeout(() => {
    let qr_code_canvas = document.querySelector("canvas"); 
    let paddedCanvas = addPaddingToQRCode(qr_code_canvas, 20); // Add 20px padding

    downloadLink.style.display = "block";
    downloadLink.href = paddedCanvas.toDataURL("image/png");
    downloadLink.download = "qrcode.png"; // Name of the downloaded file
  }, 300);
}

// Function to add padding to the QR Code
function addPaddingToQRCode(originalCanvas, padding) {
  let canvas = document.createElement("canvas");
  canvas.width = originalCanvas.width + padding * 2;
  canvas.height = originalCanvas.height + padding * 2;

  let context = canvas.getContext("2d");
  context.fillStyle = "#FFFFFF"; // Padding color (white)
  context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white

  // Draw the QR Code in the center of the canvas with padding
  context.drawImage(originalCanvas, padding, padding);

  return canvas;
}

// Function to display the card
function showCard(content) {
  // Get the card element from the HTML
  let card = document.getElementById("infoCard");
  let cardContent = document.getElementById("cardContent");

  // Update the card content
  cardContent.textContent = content;

  // Show the card
  card.style.display = "block";

  // Add an event listener to close the card when clicking outside of it
  document.addEventListener("click", (e) => {
    let card = document.getElementById("infoCard");
    if (card.style.display === "block" && !card.contains(e.target) && e.target.id !== "About") {
      card.style.display = "none";
    }
  });
}

// Add an event listener for the About button
document.getElementById("About").addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the click event from propagating to the document
  showCard("Created By Doremxn"); // Display the card with the content "Created By Doremxn"
});

// Update the event listener for hiding the card
document.addEventListener("click", (e) => {
  let card = document.getElementById("infoCard");
  if (card.style.display === "block" && !card.contains(e.target) && e.target.id !== "About") {
    card.style.display = "none";
  }
});
