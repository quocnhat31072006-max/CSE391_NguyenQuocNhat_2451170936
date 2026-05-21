// ================= IMAGE GALLERY =================
const images = [
    "https://placehold.co/400?text=1",
    "https://placehold.co/400?text=2",
    "https://placehold.co/400?text=3"
];

let index = 0;

const img = document.querySelector("#img");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modalImg");

// ================= UPDATE IMAGE =================
function updateImage() {
    img.src = images[index];
}

// ================= KEYBOARD NAVIGATION =================
document.addEventListener("keydown", (e) => {

    // LEFT
    if (e.key === "ArrowLeft") {
        index = (index - 1 + images.length) % images.length;
        updateImage();
    }

    // RIGHT
    if (e.key === "ArrowRight") {
        index = (index + 1) % images.length;
        updateImage();
    }

    // NUMBER KEYS 1-3
    if (["1","2","3"].includes(e.key)) {
        index = Number(e.key) - 1;
        updateImage();
    }

    // SPACE → OPEN MODAL
    if (e.code === "Space") {
        modal.classList.remove("hidden");
        modalImg.src = images[index];
    }

    // ESC → CLOSE MODAL / PALETTE
    if (e.key === "Escape") {
        modal.classList.add("hidden");
        palette.classList.add("hidden");
    }

    // CTRL + K → COMMAND PALETTE
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        openPalette();
    }
});

// ================= MODAL CLOSE =================
modal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// ================= COMMAND PALETTE =================
const palette = document.querySelector("#palette");
const cmdInput = document.querySelector("#cmdInput");
const cmdList = document.querySelector("#cmdList");

const commands = [
    "next image",
    "prev image",
    "open modal",
    "close modal"
];

function openPalette() {
    palette.classList.remove("hidden");
    cmdInput.focus();
    renderCommands(commands);
}

// ================= RENDER COMMANDS =================
function renderCommands(list) {
    cmdList.innerHTML = "";

    list.forEach(cmd => {
        const li = document.createElement("li");
        li.textContent = cmd;

        li.addEventListener("click", () => executeCommand(cmd));

        cmdList.appendChild(li);
    });
}

// ================= FILTER COMMANDS =================
cmdInput.addEventListener("input", () => {
    const val = cmdInput.value.toLowerCase();

    const filtered = commands.filter(c =>
        c.toLowerCase().includes(val)
    );

    renderCommands(filtered);
});

// ================= EXECUTE COMMAND =================
function executeCommand(cmd) {
    if (cmd === "next image") {
        index = (index + 1) % images.length;
        updateImage();
    }

    if (cmd === "prev image") {
        index = (index - 1 + images.length) % images.length;
        updateImage();
    }

    if (cmd === "open modal") {
        modal.classList.remove("hidden");
        modalImg.src = images[index];
    }

    if (cmd === "close modal") {
        modal.classList.add("hidden");
    }

    palette.classList.add("hidden");
}

// ================= INIT =================
updateImage();