let undoStack = [];
let redoStack = [];

const editor = document.getElementById('editor');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

// Save the current state in the undo stack
function saveState() {
    undoStack.push(editor.value); 
    redoStack = []; // Clear redo stack when a new action is taken
    updateButtons();
}

// Undo the last action
function undo() {
    if (undoStack.length > 0) {
        redoStack.push(editor.value); // Save current state in redo stack
        editor.value = undoStack.pop(); // Get last state from undo stack
        updateButtons();
    }
}

// Redo the last undone action
function redo() {
    if (redoStack.length > 0) {
        undoStack.push(editor.value); // Save current state in undo stack
        editor.value = redoStack.pop(); // Get last undone state
        updateButtons();
    }
}

// Clear the text editor
function clearText() {
    editor.value = '';
    undoStack = [];
    redoStack = [];
    updateButtons();
}

// Save the current content as a text file
function saveFile() {
    const blob = new Blob([editor.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'editor.txt';
    link.click();
}

// Update the undo/redo button states
function updateButtons() {
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
    undoBtn.classList.toggle('disabled', undoStack.length === 0);
    redoBtn.classList.toggle('disabled', redoStack.length === 0);
}

// Save the state whenever the content of the editor changes
editor.addEventListener('input', saveState);

// Keyboard shortcuts for undo and redo
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
    } else if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        redo();
    }
});
