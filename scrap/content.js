let tagName = null
let elementAttributes = null
let webPageUrl = null;

document.addEventListener("mouseover", (event) => {
  // Highlight the element when hovered
  event.target.style.outline = "2px solid red";
});

document.addEventListener("mouseout", (event) => {
  // Remove the highlight when the mouse leaves the element
  event.target.style.outline = "";
});

document.addEventListener("click", (event) => {
  // Get the href location 
  webPageUrl = window.location.href

  // Get the tag name
  tagName = event.target.tagName

  // Get all the attributes of the selected element
  elementAttributes = {}
  for (const attr of event.target.attributes) {
    elementAttributes[attr.name] = attr.value;
  }

  // Send the selected data to the background script
  chrome.runtime.sendMessage({ data: selectedData });
});
