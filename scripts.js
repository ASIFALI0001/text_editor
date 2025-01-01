// Stacks for managing undo and redo functionality
let undoStack = [];
let redoStack = [];

// DOM Elements
const editor = document.getElementById('editor');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

// Function to save the current state into the undo stack
function saveState() {
    undoStack.push(editor.value); 
    redoStack.length = 0; // Clear redo stack after a new action
    updateButtons();
}

// Function to undo the last action
function undo() {
    if (undoStack.length > 0) {
        redoStack.push(editor.value); // Save current state to redo stack
        editor.value = undoStack.pop(); // Revert to last saved state
        updateButtons();
    }
}

// Function to redo the last undone action
function redo() {
    if (redoStack.length > 0) {
        undoStack.push(editor.value); // Save current state to undo stack
        editor.value = redoStack.pop(); // Restore last undone state
        updateButtons();
    }
}

// Function to clear the editor
function clearText() {
    editor.value = '';
    undoStack = [];
    redoStack = [];
    updateButtons();
}

// Function to save the current content as a text file
function saveFile() {
    const blob = new Blob([editor.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'editor.txt';
    link.click();
}

// Function to update the state of the undo and redo buttons
function updateButtons() {
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
    undoBtn.classList.toggle('disabled', undoStack.length === 0);
    redoBtn.classList.toggle('disabled', redoStack.length === 0);
}

// Event listener to save the state when the content of the editor changes
editor.addEventListener('input', saveState);

// Keyboard shortcuts for undo and redo functionality
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
    } else if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        redo();
    }
});
