// global variables
let imageContainerAfterDrag;
let selectableImages = $(".selectable-image");
let backdrop = $("#backdrop");
let modal = $("#modal");
let modalBody = $("#modal-body");
let modalTitle = $("#modal-title");

// allowing Drop elements on drop
function allowDrop(ev) {
  ev.preventDefault();
}

// On Drag
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

//******************************* On Drop  *************************************//
function drop(ev, el) {
  ev.preventDefault();
  
  if(ev.target.hasChildNodes()){
    console.log(ev.target);
  }

  let dragElementId = ev.dataTransfer.getData("text");
  let data = document.getElementById(dragElementId).cloneNode(true);

  Array.from(data.children).forEach((node) => {
    if (node.hidden) {
      node.hidden = false;
    } else {
      node.classList.remove("elements");
      node.classList.add("elements-big-h-selectable");
    }
  });
  

  ev.target.appendChild(data);

  imageContainerAfterDrag = Array.from(
    $(".elements-big-h-selectable .elements")
  );

  if(imageContainerAfterDrag.length === 0){
    let lastBoxContainer = $(".elements-big-h-selectable .elements");
    lastBoxContainer.addEventListener("click", () =>
      selectImage(lastBoxContainer)
    );
  }

  // AddEventListener -> Watch on every container`s click
  imageContainerAfterDrag.forEach((selectedElement) => {
    // console.log(selectedElement);

    selectedElement.addEventListener("click", () =>
      selectImage(selectedElement)
    );
  });
  ev.stopPropagation();
  return false;
}


//********************************* On Select Image  ***********************************//
function selectImage(selectedElement) {
  // Toggling between image container and box container
  $("#all-boxes").classList.add("d-none");
  $("#image-container").classList.replace("d-none", "d-flex");

  if (selectedElement.hasChildNodes()) {
    // Image is already there in the container --> Open modal with image
    modalBody.appendChild(selectedElement.childNodes[0].cloneNode(true)); // without losing original image
    showBackdrop();
    showModal();
  } else {
    selectedElement.classList.replace(
      "normal-border-2",
      "prepare-for-fill-image"
    );

    // AddEventListener -> Watch on every Image click, and loop through over images
    selectableImages.forEach((image) => {
      image.addEventListener("click", () => {
        if (!selectedElement.hasChildNodes()) {
          // Apending/Cloning Image tag <img/> inside image Container div in right side
          selectedElement.appendChild(image.cloneNode(true));

          // hiding those images which has used
          image.hidden = true;

          // replacing border orange with normal border
          selectedElement.classList.replace(
            "prepare-for-fill-image",
            "normal-border-2"
          );
        }
      });
    });
  }
}

// Close Container having Images
function closeNode(event) {
  $("#all-boxes").classList.remove("d-none");
  $("#image-container").classList.replace("d-flex", "d-none");
  let parentNode = event.target.parentNode.parentNode;
  console.log(parentNode);
  parentNode.remove();

  // Unhiding used images
  selectableImages.forEach((item) => {
    item.hidden = false;
  });
}

//*******************  Helper methods  ******************************//
// for selecting DOM nodes
function $(selector) {
  let node = document.querySelectorAll(selector);
  if (node.length == 1) {
    return node[0];
  } else {
    return node;
  }
}

// showModal
function showModal() {
  modal.hidden = false;
}

// closeModal
function closeModal() {
  modal.hidden = true;
  hideBackDrop();
}

// showBackDrop
function showBackdrop() {
  backdrop.classList.replace("d-none", "d-flex");
}

// hideBackDrop
function hideBackDrop() {
  backdrop.classList.replace("d-flex", "d-none");

  // Removing all content inside modal body on every close event
  if (modalBody.hasChildNodes()) {
    modalBody.removeChild(modalBody.children[0]);
  }
}
