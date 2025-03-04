// jxdesign.js

var propertiesForm = null;
var drawingArea = null;
var currentMode = 'select';
var isShiftPressed = false;
var selectIcon = null;
var selectedIcon = null;
var jxResponse = false;

function loadScript(url, callback) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    if (callback) {
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
	drawingArea = document.getElementById('drawing-area');
	propertiesForm = document.getElementById('control-properties');

    // Aggiungi gestione della Palette
    const paletteIcons = document.querySelectorAll('.palette-icon');
    paletteIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const ctrlType = icon.dataset.ctrlType;

			// Deseleziona l'icona precedentemente selezionata
            if (selectedIcon) {
                selectedIcon.classList.remove('selected');
            }

            icon.classList.add('selected');
            selectedIcon = icon;
			// Seleziona la nuova icona
			setMode(ctrlType === 'select');
            if (ctrlType !== 'select') {
				propertiesForm.ctrl_type.value = ctrlType;
            }
        });
    });

    loadScript("jxcontrols.js", function() {
        loadScript("jxcore.js", function() {
            start();
            window.focus();
        });
    });

	window.onbeforeunload = function() {
	    saveControlsToStorage();
	    return true;
	};

	document.addEventListener('keydown', (e) => {
	    if (e.key === 'Shift') {
	        isShiftPressed = true;
	    }
	});

	document.addEventListener('keyup', (e) => {
	    if (e.key === 'Shift') {
	        isShiftPressed = false;
	    }
	});

});

