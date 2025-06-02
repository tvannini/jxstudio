// jxcontrols.js

var containerTypes = {
    "button": false,
    "map": false,
    "check": false,
    "document": false,
    "edit": false,
    "file": false,
    "htmlarea": false,
    "img": true,
    "label": false,
    "line": false,
    "listcombo": false,
    "multipage": true,
    "navigator": false,
    "tab": true,
    "text": false,
    "tree": false,
    "imglist": false,
    "progress": false,
    "flowbox": true,
    "frame": true,
    "window": true
};
var controlCounter = {
    "button": 0,
    "map": 0,
    "check": 0,
    "document": 0,
    "edit": 0,
    "file": 0,
    "htmlarea": 0,
    "img": 0,
    "label": 0,
    "line": 0,
    "listcombo": 0,
    "multipage": 0,
    "navigator": 0,
    "tab": 0,
    "text": 0,
    "tree": 0,
    "imglist": 0,
    "progress": 0,
    "flowbox": 0,
    "frame": 0,
    "window": 0
};
var selectedControls = [];
var quantizationStep = 10;
var contextMenu = null;
var clipboard = [];
let isDragging = false;
let isResizing = false;
let isMouseMoving = false;
let isMouseSizing = false;
let offsets = [];

function saveControlsToStorage() {
    const controlsData = [];
    let selectedCtrls = [];

    // Iterate through all controls in the drawing area
    const controls = drawingArea.querySelectorAll('.control');
    controls.forEach(ctrl => {

        controlsData.push(packCtrl(ctrl));

        // If control is selected add to list of selected controls
        if (ctrl.classList.contains('selected')) {
            selectedCtrls.push(ctrl.dataset.ctrlName);
        }
    });

    // Save the data to localStorage
    sessionStorage.setItem('controlEditorData', JSON.stringify(controlsData));
    sessionStorage.setItem('selectedControls', JSON.stringify(selectedCtrls));
}

function loadControlsFromStorage() {
    const savedControlsData = sessionStorage.getItem('controlEditorData');
    if (savedControlsData) {
        const controlsData = JSON.parse(savedControlsData);
        controlsData.forEach(data => unpackCtrl(data));

        // Restore selection to the last selected controls
        const lastSelectedControls = JSON.parse(sessionStorage.getItem('selectedControls'));
        if (lastSelectedControls && lastSelectedControls.length > 0) {
            isShiftPressed = true;
            lastSelectedControls.forEach(ctrlName => {
                const ctrl = document.getElementById(ctrlName);
                if (ctrl) {
                    selectControl(ctrl);
                }
            });
            isShiftPressed = false;
        }
        console.log('Controlli caricati dal localStorage');
    }
}

function packCtrl(ctrl) {
    const controlData = {};

    // Save only properties that are different from their default values
    controlData.ctrlName = ctrl.dataset.ctrlName;
    controlData.ctrlParent = ctrl.dataset.ctrlParent;
    controlData.ctrlType = ctrl.dataset.ctrlType;
    controlData.x = ctrl.style.left;
    controlData.y = ctrl.style.top;
    controlData.width = ctrl.style.width;
    controlData.height = ctrl.style.height;
    controlData.order = ctrl.style.zIndex;
    if (ctrl.dataset.visible !== '') controlData.visible = ctrl.dataset.visible;
    if (ctrl.dataset.expand !== '') controlData.expand = ctrl.dataset.expand;
    if (ctrl.dataset.parentOptions !== '') controlData.parentOptions = ctrl.dataset.parentOptions;
    if (ctrl.dataset.caption !== '') controlData.caption = ctrl.dataset.caption;
    if (ctrl.dataset.enable !== '') controlData.enable = ctrl.dataset.enable;
    if (ctrl.dataset.action !== '') controlData.action = ctrl.dataset.action;
    if (ctrl.dataset.submit !== '') controlData.submit = ctrl.dataset.submit;
    if (ctrl.dataset.view !== '') controlData.view = ctrl.dataset.view;
    if (ctrl.dataset.field !== '') controlData.field = ctrl.dataset.field;
    if (ctrl.dataset.model !== '') controlData.model = ctrl.dataset.model;
    if (ctrl.dataset.zoom !== '') controlData.zoom = ctrl.dataset.zoom;
    if (ctrl.dataset.password !== 'false') controlData.password = ctrl.dataset.password;
    if (ctrl.dataset.confirmMsg !== '') controlData.confirmMsg = ctrl.dataset.confirmMsg;
    if (ctrl.dataset.tooltip !== '') controlData.tooltip = ctrl.dataset.tooltip;
    if (ctrl.dataset.btnStyle !== 'Standard') controlData.btnStyle = ctrl.dataset.btnStyle;
    if (ctrl.dataset.css !== '') controlData.css = ctrl.dataset.css;
    if (ctrl.dataset.navStyle !== '') controlData.navStyle = ctrl.dataset.navStyle;
    if (ctrl.dataset.pages !== '') controlData.pages = ctrl.dataset.pages;
    if (ctrl.dataset.activePage !== '') controlData.activePage = ctrl.dataset.activePage;
    if (ctrl.dataset.rtf !== '') controlData.rtf = ctrl.dataset.rtf;
    if (ctrl.dataset.imgFil !== '') controlData.imgFile = ctrl.dataset.imgFile;
    if (ctrl.dataset.imgFileExp !== '') controlData.imgFileExp = ctrl.dataset.imgFileExp;
    if (ctrl.dataset.imgHoverExp !== '') controlData.imgHoverExp = ctrl.dataset.imgHoverExp;
    if (ctrl.dataset.comboItems !== '') controlData.comboItems = ctrl.dataset.comboItems;
    if (ctrl.dataset.comboRows !== '') controlData.comboRows = ctrl.dataset.comboRows;
    if (ctrl.dataset.mpCssBody !== '') controlData.mpCssBody = ctrl.dataset.mpCssBody;
    if (ctrl.dataset.mpCssBorder !== '') controlData.mpCssBorder = ctrl.dataset.mpCssBorder;
    if (ctrl.dataset.mpCssLabelOn !== '') controlData.mpCssLabelOn = ctrl.dataset.mpCssLabelOn;
    if (ctrl.dataset.mpCssLabelOff !== '') controlData.mpCssLabelOff = ctrl.dataset.mpCssLabelOff;
    if (ctrl.dataset.uploadMulti !== '') controlData.uploadMulti = ctrl.dataset.uploadMulti;
    if (ctrl.dataset.uploadSaveAs !== '') controlData.uploadSaveAs = ctrl.dataset.uploadSaveAs;
    if (ctrl.dataset.htmlCode !== '') controlData.htmlCode = ctrl.dataset.htmlCode;
    if (ctrl.dataset.docUrl !== '') controlData.docUrl = ctrl.dataset.docUrl;
    if (ctrl.dataset.navShowNav !== '') controlData.navShowNav = ctrl.dataset.navShowNav;
    if (ctrl.dataset.navNewVis !== '') controlData.navNewVis = ctrl.dataset.navNewVis;
    if (ctrl.dataset.navNewEn !== '') controlData.navNewEn = ctrl.dataset.navNewEn;
    if (ctrl.dataset.navNewAct !== '') controlData.navNewAct = ctrl.dataset.navNewAct;
    if (ctrl.dataset.navNewMsg !== '') controlData.navNewMsg = ctrl.dataset.navNewMsg;
    if (ctrl.dataset.navSaveVis !== '') controlData.navSaveVis = ctrl.dataset.navSaveVis;
    if (ctrl.dataset.navSaveEn !== '') controlData.navSaveEn = ctrl.dataset.navSaveEn;
    if (ctrl.dataset.navSaveAct !== '') controlData.navSaveAct = ctrl.dataset.navSaveAct;
    if (ctrl.dataset.navSaveMsg !== '') controlData.navSaveMsg = ctrl.dataset.navSaveMsg;
    if (ctrl.dataset.navDelVis !== '') controlData.navDelVis = ctrl.dataset.navDelVis;
    if (ctrl.dataset.navDelEn !== '') controlData.navDelEn = ctrl.dataset.navDelEn;
    if (ctrl.dataset.navDelAct !== '') controlData.navDelAct = ctrl.dataset.navDelAct;
    if (ctrl.dataset.navDelMsg !== '') controlData.navDelMsg = ctrl.dataset.navDelMsg;
    if (ctrl.dataset.navUndolVis !== '') controlData.navUndoVis = ctrl.dataset.navUndoVis;
    if (ctrl.dataset.navUndolEn !== '') controlData.navUndoEn = ctrl.dataset.navUndoEn;
    if (ctrl.dataset.navUndoAct !== '') controlData.navUndoAct = ctrl.dataset.navUndoAct;
    if (ctrl.dataset.navUndoMsg !== '') controlData.navUndoMsg = ctrl.dataset.navUndoMsg;
    if (ctrl.dataset.navDetVis !== '') controlData.navDetVis = ctrl.dataset.navDetVis;
    if (ctrl.dataset.navDetEn !== '') controlData.navDetEn = ctrl.dataset.navDetEn;
    if (ctrl.dataset.navDetAct !== '') controlData.navDetAct = ctrl.dataset.navDetAct;
    if (ctrl.dataset.navDetMsg !== '') controlData.navDetMsg = ctrl.dataset.navDetMsg;
    if (ctrl.dataset.navSelVis !== '') controlData.navSelVis = ctrl.dataset.navSelVis;
    if (ctrl.dataset.navSelEn !== '') controlData.navSelEn = ctrl.dataset.navSelEn;
    if (ctrl.dataset.navSelAct !== '') controlData.navSelAct = ctrl.dataset.navSelAct;
    if (ctrl.dataset.navSelMsg !== '') controlData.navSelMsg = ctrl.dataset.navSelMsg;
    if (ctrl.dataset.navCssSpace !== '') controlData.navCssSpace = ctrl.dataset.navCssSpace;
    if (ctrl.dataset.navCssSlide !== '') controlData.navCssSlide = ctrl.dataset.navCssSlide;
    if (ctrl.dataset.navCssNavbar !== '') controlData.navCssNavbar = ctrl.dataset.navCssNavbar;
    if (ctrl.dataset.navCssFirst !== '') controlData.navCssFirst = ctrl.dataset.navCssFirst;
    if (ctrl.dataset.navCssPpage !== '') controlData.navCssPpage = ctrl.dataset.navCssPpage;
    if (ctrl.dataset.navCssPrev !== '') controlData.navCssPrev = ctrl.dataset.navCssPrev;
    if (ctrl.dataset.navCssNext !== '') controlData.navCssNext = ctrl.dataset.navCssNext;
    if (ctrl.dataset.navCssNpage !== '') controlData.navCssNpage = ctrl.dataset.navCssNpage;
    if (ctrl.dataset.navCssLast !== '') controlData.navCssLast = ctrl.dataset.navCssLast;
    if (ctrl.dataset.navCssNew !== '') controlData.navCssNew = ctrl.dataset.navCssNew;
    if (ctrl.dataset.navCssSave !== '') controlData.navCssSave = ctrl.dataset.navCssSave;
    if (ctrl.dataset.navCssDel !== '') controlData.navCssDel = ctrl.dataset.navCssDel;
    if (ctrl.dataset.navCssUndo !== '') controlData.navCssUndo = ctrl.dataset.navCssUndo;
    if (ctrl.dataset.navCssDet !== '') controlData.navCssDet = ctrl.dataset.navCssDet;
    if (ctrl.dataset.navCssSel !== '') controlData.navCssSel = ctrl.dataset.navCssSel;
    if (ctrl.dataset.tabHideMark !== '') controlData.tabHideMark = ctrl.dataset.tabHideMark;
    if (ctrl.dataset.tabOptions !== '') controlData.tabOptions = ctrl.dataset.tabOptions;
    if (ctrl.dataset.tabPinCols !== '') controlData.tabPinCols = ctrl.dataset.tabPinCols;
    if (ctrl.dataset.tabNorecMsg !== '') controlData.tabNorecMsg = ctrl.dataset.tabNorecMsg;
    if (ctrl.dataset.tabCssOut !== '') controlData.tabCssOut = ctrl.dataset.tabCssOut;
    if (ctrl.dataset.tabCssGrid !== '') controlData.tabCssGrid = ctrl.dataset.tabCssGrid;
    if (ctrl.dataset.tabCssHead !== '') controlData.tabCssHead = ctrl.dataset.tabCssHead;
    if (ctrl.dataset.tabCssFoot !== '') controlData.tabCssFoot = ctrl.dataset.tabCssFoot;
    if (ctrl.dataset.tabCssBody !== '') controlData.tabCssBody = ctrl.dataset.tabCssBody;
    if (ctrl.dataset.tabCssRow !== '') controlData.tabCssRow = ctrl.dataset.tabCssRow;
    if (ctrl.dataset.tabCssAlt !== '') controlData.tabCssAlt = ctrl.dataset.tabCssAlt;
    if (ctrl.dataset.tabCssOver !== '') controlData.tabCssOver = ctrl.dataset.tabCssOver;
    if (ctrl.dataset.tabCssSel !== '') controlData.tabCssSel = ctrl.dataset.tabCssSel;
    if (ctrl.dataset.treeItems !== '') controlData.treeItems = ctrl.dataset.treeItems;
    if (ctrl.dataset.treeSel !== '') controlData.treeSel = ctrl.dataset.treeSel;
    if (ctrl.dataset.imglistItems !== '') controlData.imglistItems = ctrl.dataset.imglistItems;
    if (ctrl.dataset.imglistItemW !== '') controlData.imglistItemW = ctrl.dataset.imglistItemW;
    if (ctrl.dataset.imglistItemH !== '') controlData.imglistItemH = ctrl.dataset.imglistItemH;
    if (ctrl.dataset.imglistDelAct !== '') controlData.imglistDelAct = ctrl.dataset.imglistDelAct;
    if (ctrl.dataset.progressVal !== '') controlData.progressVal = ctrl.dataset.progressVal;
    if (ctrl.dataset.progressStart !== '') controlData.progressStart = ctrl.dataset.progressStart;
    if (ctrl.dataset.progressEnd !== '') controlData.progressEnd = ctrl.dataset.progressEnd;
    return controlData;
}

function unpackCtrl(data) {

    const ctrl = createControl(
        data.x ? parseInt(data.x) : 0,
        data.y ? parseInt(data.y) : 0,
        data.width ? parseInt(data.width) : 100,
        data.height ? parseInt(data.height) : 50,
        data.ctrlParent ? data.ctrlParent : '',
        data.ctrlType ? data.ctrlType : 'label',
        (data.parentOptions ? data.parentOptions : '')
    );
    ctrl.dataset.ctrlName = data.ctrlName;
    ctrl.id = data.ctrlName;
    ctrl.style.zIndex = data.order;
    if (data.ctrlParent) ctrl.dataset.ctrlParent = data.ctrlParent;
    if (data.visible) ctrl.dataset.visible = data.visible;
    if (data.expand) ctrl.dataset.expand = data.expand;
    if (data.caption) ctrl.dataset.caption = data.caption;
    if (data.enable) ctrl.dataset.enable = data.enable;
    if (data.action) ctrl.dataset.action = data.action;
    if (data.submit) ctrl.dataset.submit = data.submit;
    if (data.view) ctrl.dataset.view = data.view;
    if (data.field) ctrl.dataset.field = data.field;
    if (data.model) ctrl.dataset.model = data.model;
    if (data.zoom) ctrl.dataset.zoom = data.zoom;
    if (data.password) ctrl.dataset.password = data.password;
    if (data.confirmMsg) ctrl.dataset.confirmMsg = data.confirmMsg;
    if (data.tooltip) ctrl.dataset.tooltip = data.tooltip;
    if (data.btnStyle) ctrl.dataset.btnStyle = data.btnStyle;
    if (data.css) ctrl.dataset.css = data.css;
    if (data.navStyle) ctrl.dataset.navStyle = data.navStyle;
    if (data.pages) ctrl.dataset.pages = data.pages;
    if (data.activePage) ctrl.dataset.activePage = data.activePage;
    if (data.rtf) ctrl.dataset.rtf = data.rtf;
    if (data.imgFile) ctrl.dataset.imgFile = data.imgFile;
    if (data.imgFileExp) ctrl.dataset.imgFileExp = data.imgFileExp;
    if (data.imgHoverExp) ctrl.dataset.imgHoverExp = data.imgHoverExp;
    if (data.comboItems) ctrl.dataset.comboItems = data.comboItems;
    if (data.comboRows) ctrl.dataset.comboRows = data.comboRows;
    if (data.mpCssBody) ctrl.dataset.mpCssBody = data.mpCssBody;
    if (data.mpCssBorder) ctrl.dataset.mpCssBorder = data.mpCssBorder;
    if (data.mpCssLabelOn) ctrl.dataset.mpCssLabelOn = data.mpCssLabelOn;
    if (data.mpCssLabelOff) ctrl.dataset.mpCssLabelOff = data.mpCssLabelOff;
    if (data.uploadMulti) ctrl.dataset.uploadMulti = data.uploadMulti;
    if (data.uploadSaveAs) ctrl.dataset.uploadSaveAs = data.uploadSaveAs;
    if (data.htmlCode) ctrl.dataset.htmlCode = data.htmlCode;
    if (data.docUrl) ctrl.dataset.docUrl = data.docUrl;
    if (data.navShowNav) ctrl.dataset.navShowNav = data.navShowNav;
    if (data.navNewVis) ctrl.dataset.navNewVis = data.navNewVis;
    if (data.navNewEn) ctrl.dataset.navNewEn = data.navNewEn;
    if (data.navNewAct) ctrl.dataset.navNewAct = data.navNewAct;
    if (data.navNewMsg) ctrl.dataset.navNewMsg = data.navNewMsg;
    if (data.navSaveVis) ctrl.dataset.navSaveVis = data.navSaveVis;
    if (data.navSaveEn) ctrl.dataset.navSaveEn = data.navSaveEn;
    if (data.navSaveAct) ctrl.dataset.navSaveAct = data.navSaveAct;
    if (data.navSaveMsg) ctrl.dataset.navSaveMsg = data.navSaveMsg
    if (data.navDelVis) ctrl.dataset.navDelVis = data.navDelVis;
    if (data.navDelEn) ctrl.dataset.navDelEn = data.navDelEn;
    if (data.navDelAct) ctrl.dataset.navDelAct = data.navDelAct;
    if (data.navDelMsg) ctrl.dataset.navDelMsg = data.navDelMsg;
    if (data.navUndoVis) ctrl.dataset.navUndoVis = data.navUndoVis;
    if (data.navUndoEn) ctrl.dataset.navUndoEn = data.navUndoEn;
    if (data.navUndoAct) ctrl.dataset.navUndoAct = data.navUndoAct;
    if (data.navUndoMsg) ctrl.dataset.navUndoMsg = data.navUndoMsg;
    if (data.navDetVis) ctrl.dataset.navDetVis = data.navDetVis;
    if (data.navDetEn) ctrl.dataset.navDetEn = data.navDetEn;
    if (data.navDetAct) ctrl.dataset.navDetAct = data.navDetAct;
    if (data.navDetMsg) ctrl.dataset.navDetMsg = data.navDetMsg;
    if (data.navSelVis) ctrl.dataset.navSelVis = data.navSelVis;
    if (data.navSelEn) ctrl.dataset.navSelEn = data.navSelEn;
    if (data.navSelAct) ctrl.dataset.navSelAct = data.navSelAct;
    if (data.navSelMsg) ctrl.dataset.navSelMsg = data.navSelMsg;
    if (data.navCssSpace) ctrl.dataset.navCssSpace = data.navCssSpace;
    if (data.navCssSlide) ctrl.dataset.navCssSlide = data.navCssSlide;
    if (data.navCssNavbar) ctrl.dataset.navCssNavbar = data.navCssNavbar;
    if (data.navCssFirst) ctrl.dataset.navCssFirst = data.navCssFirst;
    if (data.navCssPpage) ctrl.dataset.navCssPpage = data.navCssPpage;
    if (data.navCssPrev) ctrl.dataset.navCssPrev = data.navCssPrev;
    if (data.navCssNext) ctrl.dataset.navCssNext = data.navCssNext;
    if (data.navCssNpage) ctrl.dataset.navCssNpage = data.navCssNpage;
    if (data.navCssLast) ctrl.dataset.navCssLast = data.navCssLast;
    if (data.navCssNew) ctrl.dataset.navCssNew = data.navCssNew;
    if (data.navCssSave) ctrl.dataset.navCssSave = data.navCssSave;
    if (data.navCssDel) ctrl.dataset.navCssDel = data.navCssDel;
    if (data.navCssUndo) ctrl.dataset.navCssUndo = data.navCssUndo;
    if (data.navCssDet) ctrl.dataset.navCssDet = data.navCssDet;
    if (data.navCssSel) ctrl.dataset.navCssSel = data.navCssSel;
    if (data.tabHideMark) ctrl.dataset.tabHideMark = data.tabHideMark;
    if (data.tabOptions) ctrl.dataset.tabOptions = data.tabOptions;
    if (data.tabPinCols) ctrl.dataset.tabPinCols = data.tabPinCols;
    if (data.tabNorecMsg) ctrl.dataset.tabNorecMsg = data.tabNorecMsg;
    if (data.tabCssOut) ctrl.dataset.tabCssOut = data.tabCssOut;
    if (data.tabCssGrid) ctrl.dataset.tabCssGrid = data.tabCssGrid;
    if (data.tabCssHead) ctrl.dataset.tabCssHead = data.tabCssHead;
    if (data.tabCssFoot) ctrl.dataset.tabCssFoot = data.tabCssFoot;
    if (data.tabCssBody) ctrl.dataset.tabCssBody = data.tabCssBody;
    if (data.tabCssRow) ctrl.dataset.tabCssRow = data.tabCssRow;
    if (data.tabCssAlt) ctrl.dataset.tabCssAlt = data.tabCssAlt;
    if (data.tabCssOver) ctrl.dataset.tabCssOver = data.tabCssOver;
    if (data.tabCssSel) ctrl.dataset.tabCssSel = data.tabCssSel;
    if (data.treeItems) ctrl.dataset.treeItems = data.treeItems;
    if (data.treeSel) ctrl.dataset.treeSel = data.treeSel;
    if (data.imglistItems) ctrl.dataset.imglistItems = data.imglistItems;
    if (data.imglistItemW) ctrl.dataset.imglistItemW = data.imglistItemW;
    if (data.imglistItemH) ctrl.dataset.imglistItemH = data.imglistItemH;
    if (data.imglistDelAct) ctrl.dataset.imglistDelAct = data.imglistDelAct;
    if (data.progressVal) ctrl.dataset.progressVal = data.progressVal;
    if (data.progressStart) ctrl.dataset.progressStart = data.progressStart;
    if (data.progressEnd) ctrl.dataset.progressEnd = data.progressEnd;
    ctrl.setLabel();

}

// Funzione per creare un nuovo controllo
function createControl(x, y, width, height, ctrlParent = '', ctrlType = '', parentOptions = '') {
    if (ctrlType === '') {
        if (propertiesForm.ctrl_type) {
            ctrlType = propertiesForm.ctrl_type.value;
        }
        else {
            ctrlType = 'label';
        }
    }
    // Initial size for each control-type
    if (width === 0) {
        switch (ctrlType) {
            case 'label':
            case 'edit':
            case 'listcombo':
            case 'navigator':
            case 'file':
            case 'progress':
                width = 100;
                height = 20;
                break;
            case 'button':
                width = 90;
                height = 30;
                break;
            case 'check':
                width = 20;
                height = 20;
                break;
            case 'multipage':
            case 'tab':
            case 'imglist':
            case 'flowbox':
            case 'document':
            case 'tree':
                width = 150;
                height = 150;
                break;
            case 'text':
            case 'frame':
                width = 100;
                height = 100;
                break;
            case 'img':
            case 'htmlarea':
                width = 50;
                height = 50;
                break;
            case 'line':
                width = 200;
                height = 5;
                break;
            case 'window':
                width = 600;
                height = 400;
                break;
        }
    }
    const ctrl = document.createElement('div');
    ctrl.id = controlName(ctrlType);
    ctrl.dataset.ctrlName = ctrl.id;
    ctrl.className = `control ctrl_type_${ctrlType}`;
    ctrl.style.width = `${width}px`;
    ctrl.style.height = `${height}px`;
    ctrl.style.left = `${x}px`;
    ctrl.style.top = `${y}px`;
    ctrl.dataset.ctrlParent = ctrlParent;
    ctrl.dataset.ctrlType = ctrlType;
    ctrl.dataset.container = containerTypes[ctrlType] ? 'true' : 'false';
    ctrl.dataset.visible = '';
    ctrl.dataset.expand = '';
    ctrl.dataset.parentOptions = '';
    ctrl.style.zIndex = 1000;
    ctrl.dataset.password = 'false';
    ctrl.dataset.confirmMsg = '';
    ctrl.dataset.tooltip = '';
    ctrl.dataset.btnStyle = 'Standard';
    ctrl.dataset.css = '';
    ctrl.dataset.navStyle = '';
    if (ctrlType === 'multipage') {
        ctrl.dataset.pages = 'Page1';
        ctrl.innerHTML = '<div class="mp-tabs"></div><div class="mp-pages"></div>';
    } else if (ctrlType === 'flowbox') {
        ctrl.dataset.pages = '';
        ctrl.innerHTML = '<div class="fb-tabs"></div><div class="fb-pages"></div>';
    } else {
        ctrl.dataset.pages = '';
        ctrl.innerHTML = '<span style="line-height:' + height +'px;">' + ctrl.dataset.ctrlName + '</span>';
    }

    x = Math.round(x / quantizationStep) * quantizationStep;
    y = Math.round(y / quantizationStep) * quantizationStep;

    attachResizeHandles(ctrl);
    ctrl.addEventListener('click', (event) => handleControlClick(event, ctrl));
    enableDrag(ctrl);

    if (ctrlParent) {
        const parentCtrl = document.getElementById(ctrlParent);
        if (parentCtrl) {
            // Add child control to multipage
            if (parentCtrl.dataset.ctrlType === 'multipage' ||
                parentCtrl.dataset.ctrlType === 'flowbox') {
                let aP = null;
                if (parentOptions) {
                    ctrl.dataset.parentOptions = parentOptions;
                    aP = document.getElementById(parentCtrl.dataset.ctrlName + '_p' + parentOptions);
                } else {
                    ctrl.dataset.parentOptions = parentCtrl.dataset.activePage;
                    aP = document.getElementById(parentCtrl.dataset.ctrlName + '_p' + parentCtrl.dataset.activePage);
                }
                aP.appendChild(ctrl);
            }
            // Add child control to tab and set column
            else if ((parentCtrl.dataset.ctrlType === 'tab') && (ctrlType !== 'navigator')) {
                if (parentOptions) {
                    ctrl.dataset.parentOptions = parentOptions;
                    parentCtrl.appendChild(ctrl);
                } else {
                    parentCtrl.appendChild(ctrl);
                    reorderInGrid(parentCtrl);
                    let c = parseInt(ctrl.style.zIndex);
                    if (c <= 9) {
                        c = '0' + c;
                    }
                    ctrl.dataset.parentOptions = '["01", "' + c +'", "' + c + '"]';
                }
            } else {
                parentCtrl.appendChild(ctrl);
            }
            ctrl.style.left = `${x}px`;
            ctrl.style.top = `${y}px`;
        }
    } else {
        drawingArea.appendChild(ctrl);
        ctrl.style.left = `${x}px`;
        ctrl.style.top = `${y}px`;
    }

    reorderSiblings(ctrlParent, ctrl);

    ctrl.setLabel = function(pagesChanged) {
        if (this.dataset.ctrlType === 'multipage') {
            mpSetPages(this);
        } else if (this.dataset.ctrlType === 'flowbox') {
            fbSetPages(this, pagesChanged);
        } else if (this.dataset.ctrlType === 'button') {
            let label = this.dataset.caption;
            if (label.indexOf('&') > -1) {
                // If caption contains & character, use it as a shortcut
                label = label.replace(/&(.)/, '<u>$1</u>');
            }
            let labelCtrl = this.getElementsByTagName('span')[0];
            labelCtrl.innerHTML = label;
            labelCtrl.style.lineHeight = this.style.height;
        } else {
            let label = this.dataset.ctrlName;
            if (this.dataset.field && (this.dataset.field !== '')) {
                label = this.dataset.view + '::' + this.dataset.field;
            } else if (this.dataset.view && (this.dataset.view !== '')) {
                label = this.dataset.view;
            } else if (this.dataset.caption && (this.dataset.caption !== '')) {
                label = this.dataset.caption;
            } else {
                label = this.dataset.ctrlName;
            }
            let labelCtrl = this.getElementsByTagName('span')[0];
            labelCtrl.innerHTML = label;
            labelCtrl.style.lineHeight = this.style.height;

        }
    }

    return ctrl;
}

// Funzione per assegnare un nome univoco ad un nuovo controllo
function controlName(ctrl_type, name = '') {
    let baseName = ctrl_type;
    if (name) {
        // Proposed name is free
        if (!document.getElementById(name)) {
            return name;
        } else {
            baseName = name;
        }
    }
    let counter = controlCounter[ctrl_type];
    counter++;
    let newName = baseName + '_' + counter;

    // Verifica se l'ID esiste già nel documento
    while (document.getElementById(newName)) {
        counter++;
        newName = baseName + '_' + counter;
    }

    controlCounter[ctrl_type] = counter;
    return newName;
}

// Funzione per selezionare un controllo
function selectControl(ctrl) {
    if (isShiftPressed && selectedControls.length > 0) {
        const firstControlParent = selectedControls[0].dataset.ctrlParent;

        if (ctrl.dataset.ctrlParent === firstControlParent) {
            if (selectedControls.includes(ctrl)) {
                ctrl.classList.remove('selected');
                selectedControls = selectedControls.filter(control => control !== ctrl);
            } else {
                ctrl.classList.add('selected');
                selectedControls.push(ctrl);
            }
        }
    } else {
        if (!selectedControls.includes(ctrl)) {
            deselectAllControls();
            selectedControls = [ctrl];
            ctrl.classList.add('selected');
        }
    }

    updatePropertiesForm();
}

// Funzione per deselezionare tutti i controlli
function deselectAllControls() {
    selectedControls.forEach(ctrl => {
        ctrl.classList.remove('selected');
    });
    selectedControls = [];
}

// Funzione per aggiornare una proprietà di un controllo
function updateControlProperty(ctrl, propertyId, value) {
    // Needed for flowbox new pages, to create frame
    let pagesChanged = false;
    saveStatus('set ' + propertyId.replace('_', '-'));
    switch (propertyId) {
        case 'ctrl_name':
            ctrl.id = controlName(ctrl.dataset.ctrlType, value);
            ctrl.dataset.ctrlName = ctrl.id;
            if (ctrl.dataset.container === 'true') {
                const children = ctrl.querySelectorAll('.control');
                children.forEach(child => {
                    child.dataset.ctrlParent = value;
                });
            }
            if (ctrl.id !== value) {
                updatePropertiesForm();
            }
            break;
        case 'ctrl_type':
            /*
            // Control type can not change anymore
            if (ctrl.dataset.ctrlType === 'window') return;
            ctrl.dataset.ctrlType = value;
            ctrl.className = `control ${ctrl.classList.contains('selected') ? 'selected' : ''} ctrl_type_${value}`;
            ctrl.dataset.container = containerTypes[value] ? 'true' : 'false';
            updatePropertiesForm();
            */
            break;
        case 'x':
            ctrl.style.left = `${value}px`;
            break;
        case 'y':
            ctrl.style.top = `${value}px`;
            break;
        case 'width':
            ctrl.style.width = `${value}px`;
            break;
        case 'height':
            ctrl.style.height = `${value}px`;
            break;
        case 'visible':
            ctrl.dataset.visible = value;
            break;
        case 'expand':
            ctrl.dataset.expand = value;
            break;
        case 'parent_options':
            ctrl.dataset.parentOptions = value;
            break;
        case 'caption':
            ctrl.dataset.caption = value;
            break;
        case 'enable':
            ctrl.dataset.enable = value;
            break;
        case 'order':
            ctrl.style.zIndex = value;
            reorderSiblings(ctrl.dataset.ctrlParent, ctrl);
            break;
        case 'ctrl_parent':
            ctrl.dataset.ctrlParent = value;
            break;
        case 'action':
            ctrl.dataset.action = value;
            break;
        case 'view':
            ctrl.dataset.view = value;
            break;
        case 'field':
            ctrl.dataset.field = value;
            break;
        case 'model':
            ctrl.dataset.model = value;
            break;
        case 'submit':
            ctrl.dataset.submit = value;
            break;
        case 'zoom':
            ctrl.dataset.zoom = value;
            break;
        case 'password':
            ctrl.dataset.password = value;
            break;
        case 'confirm_msg':
            ctrl.dataset.confirmMsg = value;
            break;
        case 'tooltip':
            ctrl.dataset.tooltip = value;
            break;
        case 'btn_style':
            ctrl.dataset.btnStyle = value;
            break;
        case 'css':
            ctrl.dataset.css = value;
            break;
        case 'nav_style':
            if (ctrl.dataset.navStyle !== value) {
                let widthSave = ctrl.style.width;
                ctrl.style.width = ctrl.style.height;
                ctrl.style.height = widthSave;
            }
            ctrl.dataset.navStyle = value;
            break;
        case 'pages':
            ctrl.dataset.pages = value;
            if (ctrl.dataset.ctrlType === 'flowbox') {
                pagesChanged = true;
            }
            break;
        case 'active_page':
            ctrl.dataset.activePage = value;
            break;
        case 'rtf':
            ctrl.dataset.rtf = value;
            break;
        case 'img_file':
            ctrl.dataset.imgFile = value;
            break;
        case 'img_file_exp':
            ctrl.dataset.imgFileExp = value;
            break;
        case 'img_hover_exp':
            ctrl.dataset.imgHoverExp = value;
            break;
        case 'combo_items':
            ctrl.dataset.comboItems = value;
            break;
        case 'combo_rows':
            ctrl.dataset.comboRows = value;
            break;
        case 'mp_css_body':
            ctrl.dataset.mpCssBody = value;
            break;
        case 'mp_css_border':
            ctrl.dataset.mpCssBorder = value;
            break;
        case 'mp_css_label_on':
            ctrl.dataset.mpCssLabelOn = value;
            break;
        case 'mp_css_label_off':
            ctrl.dataset.mpCssLabelOff = value;
            break;
        case 'upload_multi':
            ctrl.dataset.uploadMulti = value;
            break;
        case 'upload_save_as':
            ctrl.dataset.uploadSaveAs = value;
            break;
        case 'html_code':
            ctrl.dataset.htmlCode = value;
            break;
        case 'doc_url':
            ctrl.dataset.docUrl = value;
            break;
        case 'nav_show_nav':
            ctrl.dataset.navShowNav = value;
            break;
        case 'nav_new_vis':
            ctrl.dataset.navNewVis = value;
            break;
        case 'nav_new_en':
            ctrl.dataset.navNewEn = value;
            break;
        case 'nav_new_act':
            ctrl.dataset.navNewAct = value;
            break;
        case 'nav_new_msg':
            ctrl.dataset.navNewMsg = value;
            break;
        case 'nav_save_vis':
            ctrl.dataset.navSaveVis = value;
            break;
        case 'nav_save_en':
            ctrl.dataset.navSaveEn = value;
            break;
        case 'nav_save_act':
            ctrl.dataset.navSaveAct = value;
            break;
        case 'nav_save_msg':
            ctrl.dataset.navSaveMsg = value;
            break;
        case 'nav_del_vis':
            ctrl.dataset.navDelVis = value;
            break;
        case 'nav_del_en':
            ctrl.dataset.navDelEn = value;
            break;
        case 'nav_del_act':
            ctrl.dataset.navDelAct = value;
            break;
        case 'nav_del_msg':
            ctrl.dataset.navDelMsg = value;
            break;
        case 'nav_undo_vis':
            ctrl.dataset.navUndoVis = value;
            break;
        case 'nav_undo_en':
            ctrl.dataset.navUndoEn = value;
            break;
        case 'nav_undo_act':
            ctrl.dataset.navUndoAct = value;
            break;
        case 'nav_undo_msg':
            ctrl.dataset.navUndoMsg = value;
            break;
        case 'nav_det_vis':
            ctrl.dataset.navDetVis = value;
            break;
        case 'nav_det_en':
            ctrl.dataset.navDetEn = value;
            break;
        case 'nav_det_act':
            ctrl.dataset.navDetAct = value;
            break;
        case 'nav_det_msg':
            ctrl.dataset.navDetMsg = value;
            break;
        case 'nav_sel_vis':
            ctrl.dataset.navSelVis = value;
            break;
        case 'nav_sel_en':
            ctrl.dataset.navSelEn = value;
            break;
        case 'nav_sel_act':
            ctrl.dataset.navSelAct = value;
            break;
        case 'nav_sel_msg':
            ctrl.dataset.navSelMsg = value;
            break;
        case 'nav_css_space':
            ctrl.dataset.navCssSpace = value;
            break;
        case 'nav_css_slide':
            ctrl.dataset.navCssSlide = value;
            break;
        case 'nav_css_navbar':
            ctrl.dataset.navCssNavbar = value;
            break;
        case 'nav_css_first':
            ctrl.dataset.navCssFirst = value;
            break;
        case 'nav_css_ppage':
            ctrl.dataset.navCssPpage = value;
            break;
        case 'nav_css_prev':
            ctrl.dataset.navCssPrev = value;
            break;
        case 'nav_css_next':
            ctrl.dataset.navCssNext = value;
            break;
        case 'nav_css_npage':
            ctrl.dataset.navCssNpage = value;
            break;
        case 'nav_css_last':
            ctrl.dataset.navCssLast = value;
            break;
        case 'nav_css_new':
            ctrl.dataset.navCssNew = value;
            break;
        case 'nav_css_save':
            ctrl.dataset.navCssSave = value;
            break;
        case 'nav_css_del':
            ctrl.dataset.navCssDel = value;
            break;
        case 'nav_css_undo':
            ctrl.dataset.navCssUndo = value;
            break;
        case 'nav_css_det':
            ctrl.dataset.navCssDet = value;
            break;
        case 'nav_css_sel':
            ctrl.dataset.navCssSel = value;
            break;
        case 'tab_hide_mark':
            ctrl.dataset.tabHideMark = value;
            break;
        case 'tab_options':
            ctrl.dataset.tabOptions = value;
            break;
        case 'tab_pin_cols':
            ctrl.dataset.tabPinCols = value;
            break;
        case 'tab_norec_msg':
            ctrl.dataset.tabNorecMsg = value;
            break;
        case 'tab_css_out':
            ctrl.dataset.tabCssOut = value;
            break;
        case 'tab_css_grid':
            ctrl.dataset.tabCssGrid = value;
            break;
        case 'tab_css_head':
            ctrl.dataset.tabCssHead = value;
            break;
        case 'tab_css_foot':
            ctrl.dataset.tabCssFoot = value;
            break;
        case 'tab_css_body':
            ctrl.dataset.tabCssBody = value;
            break;
        case 'tab_css_row':
            ctrl.dataset.tabCssRow = value;
            break;
        case 'tab_css_alt':
            ctrl.dataset.tabCssAlt = value;
            break;
        case 'tab_css_over':
            ctrl.dataset.tabCssOver = value;
            break;
        case 'tab_css_sel':
            ctrl.dataset.tabCssSel = value;
            break
        case 'tree_items':
            ctrl.dataset.treeItems = value;
            break;
        case 'tree_sel':
            ctrl.dataset.treeSel = value;
            break;
        case 'imglist_items':
            ctrl.dataset.imglistItems = value;
            break;
        case 'imglist_item_w':
            ctrl.dataset.imglistItemW = value;
            break;
        case 'imglist_item_h':
            ctrl.dataset.imglistItemH = value;
            break;
        case 'imglist_del_act':
            ctrl.dataset.imglistDelAct = value;
            break;
        case 'progress_val':
            ctrl.dataset.progressVal = value;
            break;
        case 'progress_start':
            ctrl.dataset.progressStart = value;
            break;
        case 'progress_end':
            ctrl.dataset.progressEnd = value;
            break;
        }
    ctrl.setLabel(pagesChanged);

}

// Funzione per eliminare un controllo
function deleteControl() {
    if (selectedControls.length > 0) {
        saveStatus('delete');
        selectedControls.forEach(ctrl => {
            const parent = ctrl.dataset.ctrlParent;
            ctrl.remove();
            reorderSiblings(parent);
        });
        deselectAllControls();
    }
    hideContextMenu();
}

// Funzione per copiare i controlli nella clipboard
function copyControl() {
    if (selectedControls.length > 0) {
        const copiedData = selectedControls.map(ctrl => {
            return cloneControlData(ctrl);
        });
        try {
            // Prova a copiare come testo (JSON) nella clipboard di sistema
            navigator.clipboard.writeText(JSON.stringify(copiedData))
                .then(() => {
                    console.log("Copy in system clipboard");
                    clipboard = copiedData;
                });
            }
        catch(err) {
            clipboard = copiedData;
            console.log("Copy in local clipboard");
            };
        }
    hideContextMenu();
}

// Funzione per clonare i dati di un controllo in modo ricorsivo
function cloneControlData(ctrl) {
    const clonedData = {
        x: ctrl.style.left,
        y: ctrl.style.top,
        width: ctrl.style.width,
        height: ctrl.style.height,
        order: ctrl.style.zIndex,
        children: [] // Array per i figli
    };

    for (var key in ctrl.dataset) {
        clonedData[key] = ctrl.dataset[key];
    }

    // Clona i figli (se il controllo è un container)
    if (ctrl.dataset.container === 'true') {
        const children = ctrl.querySelectorAll('.control');
        children.forEach(child => {
            clonedData.children.push(cloneControlData(child));
        });
    }

    return clonedData;
}

// Funzione per incollare i controlli dalla clipboard
function pasteControl(parentCtrlName = '') {
    if (navigator.clipboard) {
        navigator.clipboard.readText().then((clipText) => (doPaste(JSON.parse(clipText))));
    }
    else if (clipboard.length > 0) {
        doPaste(clipboard);
    }

    function doPaste (pastedCtrls) {
        if (pastedCtrls.length > 0) {
            // Calcola l'offset per posizionare i controlli incollati
            let offsetX = 0;
            let offsetY = 0;

            let newParent = null;

            //Se c'è un parentCtrlName, lo cerco ed imposto il nuovo parent
            if (parentCtrlName !== '') {
                newParent = document.getElementById(parentCtrlName);
                //Se non esiste un parent valido, esco
                if (!newParent) return;
            }

            deselectAllControls();
            isShiftPressed = true;
            pastedCtrls.forEach(data => {
                pasteControlInternal(data, offsetX, offsetY, newParent);
            });
            isShiftPressed = false;
            saveStatus('paste');
            reorderSiblings(newParent);
        }
    }
    hideContextMenu();
}

function pasteControlInternal(data, offsetX, offsetY, newParent = null) {
    let actualParent = newParent;
    if (actualParent === null) {
        if (data.ctrlParent === '') {
            actualParent = null;
        } else {
            actualParent = document.getElementById(data.ctrlParent);
        }
    }

    const newCtrl = createControl(
        parseInt(data.x) + offsetX,
        parseInt(data.y) + offsetY,
        parseInt(data.width),
        parseInt(data.height),
        actualParent ? actualParent.dataset.ctrlName : '',
        data.ctrlType
    );
    // Copy original properties
    for (var key in data) {
        if (key !== 'ctrlParent' && key !== 'ctrlName') {
            newCtrl.dataset[key] = data[key];
            }
    }
    // Incremento globale del contatore, indipendentemente dal tipo di controllo
    const counter = Object.values(controlCounter).reduce((t, v) => t + v, 0);
    newCtrl.dataset.order = 1000 + counter;

    newCtrl.setLabel();
    selectControl(newCtrl);

    // Incolla i figli (se presenti)
    if (data.children && data.children.length > 0) {
        data.children.forEach(childData => {
            pasteControlInternal(childData, offsetX, offsetY, newCtrl);
        });
    }
}

// Funzione per riordinare i controlli fratelli
function reorderSiblings(ctrlParent, refCtrl = '') {
    let parentElement;
    let siblings;
    if (ctrlParent === '') {
        parentElement = drawingArea;
    } else {
        parentElement = document.getElementById(ctrlParent);
        if (!parentElement) return; // Parent non trovato
    }

    if (parentElement.dataset.ctrlType === 'multipage') {
        const pageN = (refCtrl !== '' ? refCtrl.dataset.parentOptions : parentElement.dataset.activePage);
        let pPage = document.getElementById(parentElement.dataset.ctrlName + '_p' + pageN);
        siblings = Array.from(pPage.children).filter(child => child.classList.contains('control'));
    } else if (parentElement.dataset.ctrlType === 'flowbox') {
        const pageN = (refCtrl !== '' ? refCtrl.dataset.parentOptions : parentElement.dataset.activePage);
        let pPage = document.getElementById(parentElement.dataset.ctrlName + '_p' + pageN);
        siblings = Array.from(pPage.children).filter(child => child.classList.contains('control'));
    } else {
        siblings = Array.from(parentElement.children).filter(child => child.classList.contains('control'));
    }

    // Evita che altri controlli abbiano lo stesso zIndex del controllo di riferimento
    if (refCtrl !== '') {
        refIndex = refCtrl.style.zIndex;
        siblings.forEach((sibling) => {
            if ((sibling.style.zIndex >= refIndex) && (sibling.dataset.ctrlName !== refCtrl.dataset.ctrlName)) {
                sibling.style.zIndex++;
            }
        });
    }

    // Ordina i fratelli in base al loro z-index
    siblings.sort((a, b) => {
        const zIndexA = parseInt(a.style.zIndex) || 0;
        const zIndexB = parseInt(b.style.zIndex) || 0;
        return zIndexA - zIndexB;
    });

    // Assegna valori z-index univoci e progressivi
    siblings.forEach((sibling, index) => {
        sibling.style.zIndex = index + 1;
    });
}

//
function reorderInGrid(grid) {
    const siblings = Array.from(grid.children).filter(child => child.classList.contains('control'));
    siblings.sort((a, b) => {
        if (a.dataset.ctrlType === 'navigator') {
            return -1;
        }
        else if (b.dataset.ctrlType === 'navigator') {
            return 1;
        }
        else {
            const startA = parseInt(a.style.left) || 0;
            const startB = parseInt(b.style.left) || 0;
            return startA - startB;
        }
    });

    // Assegna valori z-index univoci e progressivi
    siblings.forEach((sibling, index) => {
        // Set zIndex
        sibling.style.zIndex = index;
        // Set parent options
        if (index <= 9) {
            index = '0' + index;
            }
        sibling.dataset.parentOptions =
         sibling.dataset.parentOptions.replace(/"\d+",\s*"\d+",\s*"\d+"/g,
                                               '"01", "' + index +'", "' + index + '"');

    });
}

// Funzione per visualizzare gli handle di dimensionamento del controllo
function attachResizeHandles(ctrl) {
    const handles = [
        { position: 'top', cursor: 'n-resize' },
        { position: 'bottom', cursor: 's-resize' },
        { position: 'left', cursor: 'w-resize' },
        { position: 'right', cursor: 'e-resize' },
        { position: 'top-left', cursor: 'nw-resize' },
        { position: 'top-right', cursor: 'ne-resize' },
        { position: 'bottom-left', cursor: 'sw-resize' },
        { position: 'bottom-right', cursor: 'se-resize' },
    ];

    handles.forEach(handle => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = `resize-handle ${handle.position}`;
        resizeHandle.style.cursor = handle.cursor;
        ctrl.appendChild(resizeHandle);
        enableResize(resizeHandle, ctrl, handle.position);
    });
}

// Funzione per gestire il click su un controllo
function handleControlClick(event, ctrl) {
    if (currentMode === 'create' && containerTypes[ctrl.dataset.ctrlType]) {
        event.stopPropagation();
        const containerCtrl = ctrl;
        // Diasable cration inside flobox
        if (containerCtrl.dataset.ctrlType === 'flowbox') {
            setMode();
            return;
        }
        const newCtrl = createControl(
            event.offsetX,
            event.offsetY,
            0, 0, containerCtrl.dataset.ctrlName
        );
        if (containerCtrl.dataset.ctrlType === 'multipage') {
            newCtrl.dataset.parentOptions = containerCtrl.dataset.activePage;
            let aP = document.getElementById(containerCtrl.dataset.ctrlName + '_p' + containerCtrl.dataset.activePage);
            aP.appendChild(newCtrl);
        } else if (containerCtrl.dataset.ctrlType === 'flowbox') {
            newCtrl.dataset.parentOptions = containerCtrl.dataset.activePage;
            let aP = document.getElementById(containerCtrl.dataset.ctrlName + '_p' + containerCtrl.dataset.activePage);
            aP.appendChild(newCtrl);
        } else {
            containerCtrl.appendChild(newCtrl);
        }
        newCtrl.setLabel();
        selectControl(newCtrl);
        saveStatus('create');
        setMode();
    }
}

// Funzione per abilitare il trascinamento di un controllo
function enableDrag(element) {

    element.addEventListener('mousedown', (e) => {
        isDragging = false;
        isMouseMoving = true;
        if (e.target === element && currentMode === 'select') {
            // Seleziona il controllo al mousedown
            if (!selectedControls.includes(element)) {
                selectControl(element);
            }

            e.preventDefault();
            const rect = drawingArea.getBoundingClientRect();
            offsets = selectedControls.map(ctrl => ({
                element: ctrl,
                offsetX: e.clientX - rect.left - ctrl.offsetLeft,
                offsetY: e.clientY - rect.top - ctrl.offsetTop
            }));
        }
    });

}

// Funzione per abilitare il ridimensionamento di un controllo
function enableResize(handle, ctrl, position) {

    handle.addEventListener('mousedown', (e) => {
        isResizing = false;
        isMouseSizing = true;
        if (e.target === handle && currentMode === 'select') {
            e.stopPropagation();
            offsets = selectedControls.map(ctrl => ({
                element: ctrl,
                position: position,
                cX: e.clientX,
                cY: e.clientY,
                x: ctrl.offsetLeft,
                y: ctrl.offsetTop,
                w: ctrl.offsetWidth,
                h: ctrl.offsetHeight
            }));
        }
    });

}

function alignControls(alignment) {
    if (selectedControls.length < 2) return;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    // Trova i valori minimi e massimi di X e Y
    selectedControls.forEach(ctrl => {
        const x = parseInt(ctrl.style.left);
        const y = parseInt(ctrl.style.top);
        const width = parseInt(ctrl.style.width);
        const height = parseInt(ctrl.style.height);

        if (x < minX) minX = x;
        if (x + width > maxX) maxX = x + width;
        if (y < minY) minY = y;
        if (y + height > maxY) maxY = y + height;
    });

    saveStatus('align');
    // Allinea i controlli in base alla scelta
    selectedControls.forEach(ctrl => {
        const width = parseInt(ctrl.style.width);
        const height = parseInt(ctrl.style.height);

        switch (alignment) {
            case 'left':
                ctrl.style.left = `${minX}px`;
                break;
            case 'right':
                ctrl.style.left = `${maxX - width}px`;
                break;
            case 'top':
                ctrl.style.top = `${minY}px`;
                break;
            case 'bottom':
                ctrl.style.top = `${maxY - height}px`;
                break;
        }
    });
    updatePropertiesForm();
}

function resizeControls(resizeType) {
    if (selectedControls.length < 2) return;

    let maxWidth = -Infinity, minWidth = Infinity;
    let maxHeight = -Infinity, minHeight = Infinity;

    // Trova i valori massimi e minimi di width e height
    selectedControls.forEach(ctrl => {
        const width = parseInt(ctrl.style.width);
        const height = parseInt(ctrl.style.height);

        if (width > maxWidth) maxWidth = width;
        if (width < minWidth) minWidth = width;
        if (height > maxHeight) maxHeight = height;
        if (height < minHeight) minHeight = height;
    });

    saveStatus('resize');
    // Modifica la larghezza o l'altezza dei controlli in base alla scelta
    selectedControls.forEach(ctrl => {
        switch (resizeType) {
            case 'max-width':
                ctrl.style.width = `${maxWidth}px`;
                break;
            case 'min-width':
                ctrl.style.width = `${minWidth}px`;
                break;
            case 'max-height':
                ctrl.style.height = `${maxHeight}px`;
                break;
            case 'min-height':
                ctrl.style.height = `${minHeight}px`;
                break;
        }
        ctrl.setLabel();
    });
    updatePropertiesForm();
}

function selectChildren(containerCtrl) {
    if (containerCtrl.dataset.container !== 'true') return; // Controlla se è un container

    // Deseleziona tutti i controlli attualmente selezionati
    deselectAllControls();

    // Seleziona tutti i figli del container
    let children;
    if (containerCtrl.dataset.ctrlType === 'multipage') {
        const aP = document.getElementById(containerCtrl.dataset.ctrlName + '_p' + containerCtrl.dataset.activePage);
        children = aP.querySelectorAll('.control');
    } else if (containerCtrl.dataset.ctrlType === 'flowbox') {
        const aP = document.getElementById(containerCtrl.dataset.ctrlName + '_p' + containerCtrl.dataset.activePage);
        children = aP.querySelectorAll('.control');
    } else {
        children = containerCtrl.querySelectorAll('.control');
    }
    isShiftPressed = true;
    children.forEach(child => selectControl(child));
    isShiftPressed = false;
    hideContextMenu();
}

// Create multipage content with defined pages
function mpSetPages(ctrl) {

    let pId = 1;
    let tabs = ctrl.getElementsByClassName('mp-tabs')[0];
    let pages = ctrl.getElementsByClassName('mp-pages')[0];
    tabs.replaceChildren();
    if (typeof ctrl.dataset.activePage == 'undefined') {
        ctrl.dataset.activePage = 1;
    }
    ctrl.dataset.pages.split('|').forEach(label => {
        const a = (ctrl.dataset.activePage == pId ? ' active' : '');
        const tab = document.createElement('div');
        tab.className = 'mp-tab' + a;
        tab.dataset.page = ctrl.dataset.ctrlName + '_p' + pId;
        tab.innerHTML = label;
        tabs.appendChild(tab);

        // Preserve pages that already exist
        let page = document.getElementById(ctrl.dataset.ctrlName + '_p' + pId);
        if (!page) {
            page = document.createElement('div');
            page.id = ctrl.dataset.ctrlName + '_p' + pId;
            pages.appendChild(page);
        }
        page.className = 'mp-page' + a;

        pId++;
    });
    tabs = tabs.children;
    pages = pages.children;
    for (let tab of tabs) {
        tab.addEventListener('click', function() {
            aP = this.dataset.page;
            // Rimuovi la classe 'active' da tutte le tab e pagine
            for (t of tabs) {
                t.classList.remove('active');
            }
            for (p of pages) {
                p.classList.remove('active');
                if (p.id === aP) {
                    targetPage = p;
                }
            }
            // Aggiungi la classe 'active' alla tab cliccata
            this.classList.add('active');
            // Mostra la pagina corrispondente
            targetPage.classList.add('active');
            this.parentNode.parentNode.dataset.activePage = aP.slice(aP.lastIndexOf('_') + 2);
            updatePropertiesForm();
        });
    }

}

// Create flowbox content with defined pages and frames
function fbSetPages(ctrl, createFrame = false) {

    let pId = 1;
    let tabs = ctrl.getElementsByClassName('fb-tabs')[0];
    let pages = ctrl.getElementsByClassName('fb-pages')[0];
    tabs.replaceChildren();
    if (typeof ctrl.dataset.activePage == 'undefined') {
        ctrl.dataset.activePage = 1;
    }
    if (ctrl.dataset.pages === '') {
        ctrl.dataset.pages = 'Page1';
        createFrame = true;
    }
    ctrl.dataset.pages.split('|').forEach(label => {
        a = (ctrl.dataset.activePage == pId ? ' active' : '');
        tab = document.createElement('div');
        tab.className = 'fb-tab' + a;
        tab.dataset.page = ctrl.dataset.ctrlName + '_p' + pId;
        tab.innerHTML = label;
        tabs.appendChild(tab);

        // Preserve pages that already exist
        let page = document.getElementById(ctrl.dataset.ctrlName + '_p' + pId);
        if (!page) {
            page = document.createElement('div');
            page.id = ctrl.dataset.ctrlName + '_p' + pId;
            pages.appendChild(page);
            if (createFrame) {
                // Create frame
                const frame = createControl(20, 20, 0, 0, ctrl.dataset.ctrlName, 'frame', pId);
                frame.dataset.parentOptions = pId;
                page.appendChild(frame);
            }
        }
        page.className = 'fb-page' + a;

        pId++;
    });
    tabs = tabs.children;
    pages = pages.children;
    for (let tab of tabs) {
        tab.addEventListener('click', function() {
            aP = this.dataset.page;
            // Rimuovi la classe 'active' da tutte le tab e pagine
            for (t of tabs) {
                t.classList.remove('active');
            }
            for (p of pages) {
                p.classList.remove('active');
                if (p.id === aP) {
                    targetPage = p;
                }
            }
            // Aggiungi la classe 'active' alla tab cliccata
            this.classList.add('active');
            // Mostra la pagina corrispondente
            targetPage.classList.add('active');
            this.parentNode.parentNode.dataset.activePage = aP.slice(aP.lastIndexOf('_') + 2);
            updatePropertiesForm();
        });
    }

}

document.addEventListener('mousemove', (e) => {
    if (isMouseMoving) {
        if (!isDragging) {
            saveStatus('move');
            isDragging = true
            document.body.classList.add('no-selection');
        }
        const rect = drawingArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        offsets.forEach(offsetData => {
            const ctrl = offsetData.element;
            let newX = mouseX - offsetData.offsetX;
            let newY = mouseY - offsetData.offsetY;
            newX = Math.round(newX / quantizationStep) * quantizationStep;
            newY = Math.round(newY / quantizationStep) * quantizationStep;

            const parentCtrl = ctrl.parentElement === drawingArea ? null : ctrl.parentElement;
            const maxX = parentCtrl ? parentCtrl.offsetWidth - ctrl.offsetWidth : drawingArea.clientWidth - ctrl.offsetWidth;
            const maxY = parentCtrl ? parentCtrl.offsetHeight - ctrl.offsetHeight : drawingArea.clientHeight - ctrl.offsetHeight;

            ctrl.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
            ctrl.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
        });

        updatePropertiesForm();

    } else if (isMouseSizing) {
        if (!isResizing) {
            saveStatus('resize');
            isResizing = true;
            document.body.classList.add('no-selection');
        }
        const rect = drawingArea.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        offsets.forEach(offsetData => {
            const ctrl = offsetData.element;
            const position = offsetData.position;
            const ctrlX = offsetData.x;
            const ctrlY = offsetData.y;
            const ctrlWidth = offsetData.w;
            const ctrlHeight = offsetData.h;
            let newX = mouseX - offsetData.cX;
            let newY = mouseY - offsetData.cY;
            newX = Math.round(newX / quantizationStep) * quantizationStep;
            newY = Math.round(newY / quantizationStep) * quantizationStep;

            switch (position) {
                case 'top':
                    ctrl.style.height = `${ctrlHeight - newY}px`;
                    ctrl.style.top = `${ctrlY + newY}px`;
                    break;
                case 'bottom':
                    ctrl.style.height = `${newY + ctrlHeight}px`;
                    break;
                case 'left':
                    ctrl.style.width = `${ctrlWidth - newX}px`;
                    ctrl.style.left = `${ctrlX + newX}px`;
                    break;
                case 'right':
                    ctrl.style.width = `${newX + ctrlWidth}px`;
                    break;
                case 'top-left':
                    ctrl.style.width = `${ctrlWidth - newX}px`;
                    ctrl.style.left = `${ctrlX + newX}px`;
                    ctrl.style.height = `${ctrlHeight - newY}px`;
                    ctrl.style.top = `${ctrlY + newY}px`;
                    break;
                case 'top-right':
                    ctrl.style.width = `${newX + ctrlWidth}px`;
                    ctrl.style.height = `${ctrlHeight - newY}px`;
                    ctrl.style.top = `${ctrlY + newY}px`;
                    break;
                case 'bottom-left':
                    ctrl.style.width = `${ctrlWidth - newX}px`;
                    ctrl.style.left = `${ctrlX + newX}px`;
                    ctrl.style.height = `${newY + ctrlHeight}px`;
                    break;
                case 'bottom-right':
                    ctrl.style.width = `${newX + ctrlWidth}px`;
                    ctrl.style.height = `${newY + ctrlHeight}px`;
                    break;
            }
            ctrl.setLabel();
        });
        updatePropertiesForm();
    }

});

document.addEventListener('mouseup', (e) => {
    if (isDragging || isResizing) {
        document.body.classList.remove('no-selection');
        // Reset columns when moving/resizing controls inside a grid
        const parent = document.getElementById(e.target.dataset.ctrlParent);
        if (parent.dataset.ctrlType === 'tab') {
            reorderInGrid(parent);
        }
        updatePropertiesForm();
    }
    offsets = [];
    isDragging = false;
    isMouseMoving = false;
    isResizing = false;
    isMouseSizing = false;
});
