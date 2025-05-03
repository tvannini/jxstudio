// jxcore.js

function getResponse() {
    let res = decodeURIComponent(window.location.search.substring(1));
    if (res !== '') {
        res = JSON.parse(res);
        // Return focus to the main window while waiting for a response
        if (res['wait']) {
            setTimeout(function() {
                window.onerror = function(message, url, lineNumber) {
                    return false;
                };
            }, 50); // sets a slight delay and then restores normal error reporting
            window.onerror = function(message, url, lineNumber) {
                return true;
            };
            throw new Error('Fake error to stop the script');
        }
        // Response to F5 - Editing / Selection
        else if (res['res'] && (selectedControls.length > 0)) {
            selectedControls.forEach(ctrl => {
                updateControlProperty(ctrl, res['res']['prop'], res['res']['value']);
            });
            const field = document.getElementById(res['res']['prop']);
            if (field && field.focus) {
                field.focus();
            }
        }
    }
}

function start() {
    // Set select-icon
    selectIcon = document.querySelectorAll('.palette-icon[data-ctrl-type=select]')[0];
    // Check if there are existing controls
    if (drawingArea.children.length === 0) {
        const savedControlsData = sessionStorage.getItem('controlEditorData');
        // Try to load controls from localStorage
        if (savedControlsData && (savedControlsData.length > 4)) {
            loadControlsFromStorage();
        }
        else {
            // Create a default "Window" control
            const defaultWindow = createControl(100, 100, 600, 400, '', 'window');
            defaultWindow.dataset.ctrlName = 'win0';
            selectControl(defaultWindow);
            controlCounter.window = 1;
        }
    }
    getResponse();
    setMode();
}

function setMode(select = true) {
    if (select) {
        if (selectedIcon) {
            selectedIcon.classList.remove('selected');
            }
        selectIcon.classList.add('selected');
        currentMode = 'select';
        updatePropertiesForm();
    } else {
        deselectAllControls();
        updatePropertiesForm();
        selectIcon.classList.remove('selected');
        currentMode = 'create';
    }
}

function updatePropertiesForm() {
    // No control selected or window selected
    if ((selectedControls.length === 0) || (selectedControls[0].dataset.ctrlType === 'window')) {
        propertiesForm.reset();
        propertiesForm.style.display = 'none';
        return;
    // Something else selected
    } else {
        propertiesForm.style.display = 'grid';
    }

    const firstControl = selectedControls[0];
    const commonValues = {
        ctrl_name: firstControl.dataset.ctrlName || '',
        ctrl_parent: firstControl.dataset.ctrlParent || '',
        ctrl_type: firstControl.dataset.ctrlType || 'label',
        x: parseInt(firstControl.style.left),
        y: parseInt(firstControl.style.top),
        width: parseInt(firstControl.style.width),
        height: parseInt(firstControl.style.height),
        visible: firstControl.dataset.visible || '',
        expand: firstControl.dataset.expand || '',
        parent_options: firstControl.dataset.parentOptions || '',
        order: parseInt(firstControl.style.zIndex) || 0
    };

    for (let i = 1; i < selectedControls.length; i++) {
        const ctrl = selectedControls[i];
        if (ctrl.dataset.ctrlName !== commonValues.ctrl_name) commonValues.ctrl_name = '';
        if (ctrl.dataset.ctrlParent !== commonValues.ctrl_parent) commonValues.ctrl_parent = '';
        if (ctrl.dataset.ctrlType !== commonValues.ctrl_type) commonValues.ctrl_type = '';
        if (parseInt(ctrl.style.left) !== commonValues.x) commonValues.x = 0;
        if (parseInt(ctrl.style.top) !== commonValues.y) commonValues.y = 0;
        if (parseInt(ctrl.style.width) !== commonValues.width) commonValues.width = 0;
        if (parseInt(ctrl.style.height) !== commonValues.height) commonValues.height = 0;
        if (ctrl.dataset.visible !== commonValues.visible) commonValues.visible = '';
        if (ctrl.dataset.expand !== commonValues.expand) commonValues.expand = '';
        if (ctrl.dataset.parentOptions !== commonValues.parent_options) commonValues.parent_options = '';
        if (parseInt(ctrl.style.zIndex) !== commonValues.order) commonValues.order = '';
    }

    const controlProperties = document.querySelectorAll('.control-property');
    controlProperties.forEach(element => { element.style.display = 'none'; });

    // Caption
    if (['label', 'button', 'img'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="caption"], #caption').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.caption.value = firstControl.dataset.caption || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.caption !== propertiesForm.caption.value) propertiesForm.caption.value = '';
        }
    }

    // Enable
    if (['edit', 'button', 'check', 'text', 'img', 'listcombo', 'multipage', 'file', 'tab', 'frame'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="enable"], #enable').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.enable.value = firstControl.dataset.enable || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.enable !== propertiesForm.enable.value) propertiesForm.enable.value = '';
        }
    }

    // Action
    if (['edit', 'button', 'check', 'text', 'img', 'listcombo', 'file', 'tree', 'imglist'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="action"], #action').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.action.value = firstControl.dataset.action || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.action !== propertiesForm.action.value) propertiesForm.action.value = '';
        }
    }

    // Submit on change
    if (['edit', 'check', 'text', 'listcombo', 'file'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="submit"], #submit').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.submit.value = firstControl.dataset.submit || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.submit !== propertiesForm.submit.value) propertiesForm.submit.value = '';
        }
    }

    // View
    if (['edit', 'check', 'text', 'listcombo', 'multipage', 'file', 'tab', 'navigator', 'tree', 'imglist'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="view"], #view').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.view.value = firstControl.dataset.view || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.view !== propertiesForm.view.value) propertiesForm.view.value = '';
        }
    }

    // Field
    if (['edit', 'check', 'text', 'listcombo', 'multipage', 'file', 'tree', 'imglist'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="field"], #field').forEach(element => {
            element.style.display = 'grid'; // Mostra la proprietà "field"
        });
        propertiesForm.field.value = firstControl.dataset.field || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.field !== propertiesForm.field.value) propertiesForm.field.value = '';
        }
    }

    // Data model
    if (['edit', 'text', 'listcombo'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="model"], #model').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.model.value = firstControl.dataset.model || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.model !== propertiesForm.model.value) propertiesForm.model.value = '';
        }
    }


    // Zoom action
    if (['edit', 'text', 'listcombo'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="zoom"], #zoom').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.zoom.value = firstControl.dataset.zoom || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.zoom !== propertiesForm.zoom.value) propertiesForm.zoom.value = '';
        }
    }

    // Password
    if (commonValues.ctrl_type === 'edit') {
        document.querySelectorAll('[for="password"], #password').forEach(element => {
            element.style.display = 'grid'; // Mostra la proprietà "password"
        });
        propertiesForm.password.value = firstControl.dataset.password || 'false';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.password !== propertiesForm.password.value) propertiesForm.password.value = '';
        }
    }

    // Confirm message
    if (['button', 'img'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="confirm_msg"], #confirm_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.confirm_msg.value = firstControl.dataset.confirmMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.confirmMsg !== propertiesForm.confirm_msg.value) propertiesForm.confirm_msg.value = '';
        }
    }

    // Tooltip
    if (['label', 'edit', 'button', 'check', 'text', 'listcombo'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="tooltip"], #tooltip').forEach(element => {
            element.style.display = 'grid'; // Mostra la proprietà "tooltip"
        });
        propertiesForm.tooltip.value = firstControl.dataset.tooltip || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tooltip !== propertiesForm.tooltip.value) propertiesForm.tooltip.value = '';
        }
    }

    // Button style
    if (commonValues.ctrl_type === 'button') {
        document.querySelectorAll('[for="btn_style"], #btn_style').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.btn_style.value = firstControl.dataset.btnStyle || 'Standard';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.btnStyle !== propertiesForm.btn_style.value) propertiesForm.btn_style.value = '';
        }
    }

    // CSS
    if (['label', 'edit', 'button', 'check', 'text', 'img', 'line', 'listcombo', 'file', 'htmlarea', 'document', 'tree', 'imglist', 'progress', 'flowbox', 'frame'].includes(commonValues.ctrl_type)) {
        document.querySelectorAll('[for="css"], #css').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.css.value = firstControl.dataset.css || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.css !== propertiesForm.css.value) propertiesForm.css.value = '';
        }
    }

    // Navigator direction
    if (commonValues.ctrl_type === 'navigator') {
        document.querySelectorAll('[for="nav_style"], #nav_style').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_style.value = firstControl.dataset.navStyle || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navStyle !== propertiesForm.nav_style.value) propertiesForm.nav_style.value = '';
        }
    }

    if (['multipage', 'flowbox'].includes(commonValues.ctrl_type)) {
        // Pages
        document.querySelectorAll('[for="pages"], #pages').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.pages.value = firstControl.dataset.pages || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.pages !== propertiesForm.pages.value) propertiesForm.pages.value = '';
        }

        // Active page
        document.querySelectorAll('[for="active_page"], #active_page').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.active_page.value = firstControl.dataset.activePage || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.activePage !== propertiesForm.active_page.value) propertiesForm.active_page.value = '';
        }

    }

    // List-combo ONLY
    if (commonValues.ctrl_type === 'listcombo') {
        // List-combo items
        document.querySelectorAll('[for="combo_items"], #combo_items').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.combo_items.value = firstControl.dataset.comboItems || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.comboItems !== propertiesForm.combo_items.value) propertiesForm.combo_items.value = '';
        }
        // List-combo rows
        document.querySelectorAll('[for="combo_rows"], #combo_rows').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.combo_rows.value = firstControl.dataset.comboRows || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.comboRows !== propertiesForm.combo_rows.value) propertiesForm.combo_rows.value = '';
        }
    }

    // Rich text format
    if (commonValues.ctrl_type === 'text') {
        document.querySelectorAll('[for="rtf"], #rtf').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.rtf.value = firstControl.dataset.rtf || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.rtf !== propertiesForm.rtf.value) propertiesForm.rtf.value = '';
        }
    }

    // Image ONLY
    if (commonValues.ctrl_type === 'img') {
        // Image file
        document.querySelectorAll('[for="img_file"], #img_file').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.img_file.value = firstControl.dataset.imgFile || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imgFile !== propertiesForm.img_file.value) propertiesForm.img_file.value = '';
        }

        // Image file expression
        document.querySelectorAll('[for="img_file_exp"], #img_file_exp').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.img_file_exp.value = firstControl.dataset.imgFileExp || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imgFileExp !== propertiesForm.img_file_exp.value) propertiesForm.img_file_exp.value = '';
        }

        // Image hover expression
        document.querySelectorAll('[for="img_hover_exp"], #img_hover_exp').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.img_hover_exp.value = firstControl.dataset.imgHoverExp || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imgHoverExp !== propertiesForm.img_hover_exp.value) propertiesForm.img_hover_exp.value = '';
        }

    }

    // Multipage ONLY
    if (commonValues.ctrl_type === 'multipage') {
        // CSS body
        document.querySelectorAll('[for="mp_css_body"], #mp_css_body').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.mp_css_body.value = firstControl.dataset.mpCssBody || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.mpCssBody !== propertiesForm.mp_css_body.value) propertiesForm.mp_css_body.value = '';
        }

        // CSS border
        document.querySelectorAll('[for="mp_css_border"], #mp_css_border').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.mp_css_border.value = firstControl.dataset.mpCssBorder || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.mpCssBorder !== propertiesForm.mp_css_border.value) propertiesForm.mp_css_border.value = '';
        }

        // CSS label ON
        document.querySelectorAll('[for="mp_css_label_on"], #mp_css_label_on').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.mp_css_label_on.value = firstControl.dataset.mpCssLabelOn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.mpCssLabelOn !== propertiesForm.mp_css_label_on.value) propertiesForm.mp_css_label_on.value = '';
        }

        // CSS label OFF
        document.querySelectorAll('[for="mp_css_label_off"], #mp_css_label_off').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.mp_css_label_off.value = firstControl.dataset.mpCssLabelOff || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.mpCssLabelOff !== propertiesForm.mp_css_label_off.value) propertiesForm.mp_css_label_off.value = '';
        }

    }

    // File upload ONLY
    if (commonValues.ctrl_type === 'file') {
        // Multiple upload
        document.querySelectorAll('[for="upload_multi"], #upload_multi').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.upload_multi.value = firstControl.dataset.uploadMulti || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.uploadMulti !== propertiesForm.upload_multi.value) propertiesForm.upload_multi.value = '';
        }

        // Save as
        document.querySelectorAll('[for="upload_save_as"], #upload_save_as').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.upload_save_as.value = firstControl.dataset.uploadSaveAs || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.uploadSaveAs !== propertiesForm.upload_save_as.value) propertiesForm.upload_save_as.value = '';
        }
    }

    // HTML-area ONLY
    if (commonValues.ctrl_type === 'htmlarea') {
        // HTML code
        document.querySelectorAll('[for="html_code"], #html_code').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.html_code.value = firstControl.dataset.htmlCode || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.htmlCode !== propertiesForm.html_code.value) propertiesForm.html_code.value = '';
        }
    }

    // Document ONLY
    if (commonValues.ctrl_type === 'document') {
        // Document URL
        document.querySelectorAll('[for="doc_url"], #doc_url').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.doc_url.value = firstControl.dataset.docUrl || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.docUrl !== propertiesForm.doc_url.value) propertiesForm.doc_url.value = '';
        }
    }

    // Navigator ONLY
    if (commonValues.ctrl_type === 'navigator') {
        // Show navigation buttons
        document.querySelectorAll('[for="nav_show_nav"], #nav_show_nav').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_show_nav.value = firstControl.dataset.navShowNav || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navShowNav !== propertiesForm.nav_show_nav.value) propertiesForm.nav_show_nav.value = '';
        }
        // New visible
        document.querySelectorAll('[for="nav_new_vis"], #nav_new_vis').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_new_vis.value = firstControl.dataset.navNewVis || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navNewVis !== propertiesForm.nav_new_vis.value) propertiesForm.nav_new_vis.value = '';
        }
        // New enabled
        document.querySelectorAll('[for="nav_new_en"], #nav_new_en').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_new_en.value = firstControl.dataset.navNewEn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navNewEn !== propertiesForm.nav_new_en.value) propertiesForm.nav_new_en.value = '';
        }
        // New action
        document.querySelectorAll('[for="nav_new_act"], #nav_new_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_new_act.value = firstControl.dataset.navNewAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navNewAct !== propertiesForm.nav_new_act.value) propertiesForm.nav_new_act.value = '';
        }
        // New confirm message
        document.querySelectorAll('[for="nav_new_msg"], #nav_new_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_new_msg.value = firstControl.dataset.navNewMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navNewMsg !== propertiesForm.nav_new_msg.value) propertiesForm.nav_new_msg.value = '';
        }
        // Save visible
        document.querySelectorAll('[for="nav_save_vis"], #nav_save_vis').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_save_vis.value = firstControl.dataset.navSaveVis || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSaveVis !== propertiesForm.nav_save_vis.value) propertiesForm.nav_save_vis.value = '';
        }
        // Save enabled
        document.querySelectorAll('[for="nav_save_en"], #nav_save_en').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_save_en.value = firstControl.dataset.navSaveEn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSaveEn !== propertiesForm.nav_save_en.value) propertiesForm.nav_save_en.value = '';
        }
        // Save action
        document.querySelectorAll('[for="nav_save_act"], #nav_save_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_save_act.value = firstControl.dataset.navSaveAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSaveAct !== propertiesForm.nav_save_act.value) propertiesForm.nav_save_act.value = '';
        }
        // Save confirm message
        document.querySelectorAll('[for="nav_save_msg"], #nav_save_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_save_msg.value = firstControl.dataset.navSaveMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSaveMsg !== propertiesForm.nav_save_msg.value) propertiesForm.nav_save_msg.value = '';
        }
        // Delete visible
        document.querySelectorAll('[for="nav_del_vis"], #nav_del_vis').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_del_vis.value = firstControl.dataset.navDelVis || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDelVis !== propertiesForm.nav_del_vis.value) propertiesForm.nav_del_vis.value = '';
        }
        // Delete enabled
        document.querySelectorAll('[for="nav_del_en"], #nav_del_en').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_del_en.value = firstControl.dataset.navDelEn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDelEn !== propertiesForm.nav_del_en.value) propertiesForm.nav_del_en.value = '';
        }
        // Delete action
        document.querySelectorAll('[for="nav_del_act"], #nav_del_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_del_act.value = firstControl.dataset.navDelAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDelAct !== propertiesForm.nav_del_act.value) propertiesForm.nav_del_act.value = '';
        }
        // Delete confirm message
        document.querySelectorAll('[for="nav_del_msg"], #nav_del_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_del_msg.value = firstControl.dataset.navDelMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDelMsg !== propertiesForm.nav_del_msg.value) propertiesForm.nav_del_msg.value = '';
        }
        // Undo visible
        document.querySelectorAll('[for="nav_undo_vis"], #nav_undo_vis').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_undo_vis.value = firstControl.dataset.navUndoVis || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navUndoVis !== propertiesForm.nav_undo_vis.value) propertiesForm.nav_undo_vis.value = '';
        }
        // Undo enabled
        document.querySelectorAll('[for="nav_undo_en"], #nav_undo_en').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_undo_en.value = firstControl.dataset.navUndoEn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navUndoEn !== propertiesForm.nav_undo_en.value) propertiesForm.nav_undo_en.value = '';
        }
        // Undo action
        document.querySelectorAll('[for="nav_undo_act"], #nav_undo_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_undo_act.value = firstControl.dataset.navUndoAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navUndoAct !== propertiesForm.nav_undo_act.value) propertiesForm.nav_undo_act.value = '';
        }
        // Undo confirm message
        document.querySelectorAll('[for="nav_undo_msg"], #nav_undo_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_undo_msg.value = firstControl.dataset.navUndoMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navUndoMsg !== propertiesForm.nav_undo_msg.value) propertiesForm.nav_undo_msg.value = '';
        }
        // Detail visible
        document.querySelectorAll('[for="nav_det_vis"], #nav_det_vis').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_det_vis.value = firstControl.dataset.navDetVis || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDetVis !== propertiesForm.nav_det_vis.value) propertiesForm.nav_det_vis.value = '';
        }
        // Detail enabled
        document.querySelectorAll('[for="nav_det_en"], #nav_det_en').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_det_en.value = firstControl.dataset.navDetEn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDetEn !== propertiesForm.nav_det_en.value) propertiesForm.nav_det_en.value = '';
        }
        // Detail action
        document.querySelectorAll('[for="nav_det_act"], #nav_det_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_det_act.value = firstControl.dataset.navDetAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDetAct !== propertiesForm.nav_det_act.value) propertiesForm.nav_det_act.value = '';
        }
        // Detail confirm message
        document.querySelectorAll('[for="nav_det_msg"], #nav_det_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_det_msg.value = firstControl.dataset.navDetMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navDetMsg !== propertiesForm.nav_det_msg.value) propertiesForm.nav_det_msg.value = '';
        }
        // Select visible
        document.querySelectorAll('[for="nav_sel_vis"], #nav_sel_vis').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_sel_vis.value = firstControl.dataset.navSelVis || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSelVis !== propertiesForm.nav_sel_vis.value) propertiesForm.nav_sel_vis.value = '';
        }
        // Select enabled
        document.querySelectorAll('[for="nav_sel_en"], #nav_sel_en').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_sel_en.value = firstControl.dataset.navSelEn || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSelEn !== propertiesForm.nav_sel_en.value) propertiesForm.nav_sel_en.value = '';
        }
        // Select action
        document.querySelectorAll('[for="nav_sel_act"], #nav_sel_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_sel_act.value = firstControl.dataset.navSelAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSelAct !== propertiesForm.nav_sel_act.value) propertiesForm.nav_sel_act.value = '';
        }
        // Select confirm message
        document.querySelectorAll('[for="nav_sel_msg"], #nav_sel_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_sel_msg.value = firstControl.dataset.navSelMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navSelMsg !== propertiesForm.nav_sel_msg.value) propertiesForm.nav_sel_msg.value = '';
        }
        // CSS space
        document.querySelectorAll('[for="nav_css_space"], #nav_css_space').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_space.value = firstControl.dataset.navCssSpace || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssSpace !== propertiesForm.nav_css_space.value) propertiesForm.nav_css_space.value = '';
        }
        // CSS slice
        document.querySelectorAll('[for="nav_css_slide"], #nav_css_slide').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_slide.value = firstControl.dataset.navCssSlide || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssSlide !== propertiesForm.nav_css_slide.value) propertiesForm.nav_css_slide.value = '';
        }
        // CSS navigation bar
        document.querySelectorAll('[for="nav_css_navbar"], #nav_css_navbar').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_navbar.value = firstControl.dataset.navCssNavbar || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssNavbar !== propertiesForm.nav_css_navbar.value) propertiesForm.nav_css_navbar.value = '';
        }
        // CSS first
        document.querySelectorAll('[for="nav_css_first"], #nav_css_first').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_first.value = firstControl.dataset.navCssFirst || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssFirst !== propertiesForm.nav_css_first.value) propertiesForm.nav_css_first.value = '';
        }
        // CSS previous page
        document.querySelectorAll('[for="nav_css_ppage"], #nav_css_ppage').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_ppage.value = firstControl.dataset.navCssPpage || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssPpage !== propertiesForm.nav_css_ppage.value) propertiesForm.nav_css_ppage.value = '';
        }
        // CSS previous record
        document.querySelectorAll('[for="nav_css_prev"], #nav_css_prev').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_prev.value = firstControl.dataset.navCssPrev || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssPrev !== propertiesForm.nav_css_prev.value) propertiesForm.nav_css_prev.value = '';
        }
        // CSS next record
        document.querySelectorAll('[for="nav_css_next"], #nav_css_next').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_next.value = firstControl.dataset.navCssNext || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssNext !== propertiesForm.nav_css_next.value) propertiesForm.nav_css_next.value = '';
        }
        // CSS next page
        document.querySelectorAll('[for="nav_css_npage"], #nav_css_npage').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_npage.value = firstControl.dataset.navCssNpage || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssNpage !== propertiesForm.nav_css_npage.value) propertiesForm.nav_css_npage.value = '';
        }
        // CSS last
        document.querySelectorAll('[for="nav_css_last"], #nav_css_last').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_last.value = firstControl.dataset.navCssLast || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssLast !== propertiesForm.nav_css_last.value) propertiesForm.nav_css_last.value = '';
        }
        // CSS new
        document.querySelectorAll('[for="nav_css_new"], #nav_css_new').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_new.value = firstControl.dataset.navCssNew || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssNew !== propertiesForm.nav_css_new.value) propertiesForm.nav_css_new.value = '';
        }
        // CSS save
        document.querySelectorAll('[for="nav_css_save"], #nav_css_save').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_save.value = firstControl.dataset.navCssSave || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssSave !== propertiesForm.nav_css_save.value) propertiesForm.nav_css_save.value = '';
        }
        // CSS delete
        document.querySelectorAll('[for="nav_css_del"], #nav_css_del').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_del.value = firstControl.dataset.navCssDel || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssDel !== propertiesForm.nav_css_del.value) propertiesForm.nav_css_del.value = '';
        }
        // CSS undo
        document.querySelectorAll('[for="nav_css_undo"], #nav_css_undo').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_undo.value = firstControl.dataset.navCssUndo || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssUndo !== propertiesForm.nav_css_undo.value) propertiesForm.nav_css_undo.value = '';
        }
        // CSS details
        document.querySelectorAll('[for="nav_css_det"], #nav_css_det').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_det.value = firstControl.dataset.navCssDet || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssDet !== propertiesForm.nav_css_det.value) propertiesForm.nav_css_det.value = '';
        }
        // CSS select
        document.querySelectorAll('[for="nav_css_sel"], #nav_css_sel').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.nav_css_sel.value = firstControl.dataset.navCssSel || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.navCssSel !== propertiesForm.nav_css_sel.value) propertiesForm.nav_css_sel.value = '';
        }
    }

    // Grid ONLY
    if (commonValues.ctrl_type === 'tab') {
        // Hide row marker
        document.querySelectorAll('[for="tab_hide_mark"], #tab_hide_mark').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_hide_mark.value = firstControl.dataset.tabHideMark || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabHideMark !== propertiesForm.tab_hide_mark.value) propertiesForm.tab_hide_mark.value = '';
        }
        // Grid options
        document.querySelectorAll('[for="tab_options"], #tab_options').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_options.value = firstControl.dataset.tabOptions || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabOptions !== propertiesForm.tab_options.value) propertiesForm.tab_options.value = '';
        }
        // Pinned columns
        document.querySelectorAll('[for="tab_pin_cols"], #tab_pin_cols').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_pin_cols.value = firstControl.dataset.tabPinCols || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabPinCols !== propertiesForm.tab_pin_cols.value) propertiesForm.tab_pin_cols.value = '';
        }
        // No records message
        document.querySelectorAll('[for="tab_norec_msg"], #tab_norec_msg').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_norec_msg.value = firstControl.dataset.tabNorecMsg || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabNorecMsg !== propertiesForm.tab_norec_msg.value) propertiesForm.tab_norec_msg.value = '';
        }
        // CSS container
        document.querySelectorAll('[for="tab_css_out"], #tab_css_out').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_out.value = firstControl.dataset.tabCssOut || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssOut !== propertiesForm.tab_css_out.value) propertiesForm.tab_css_out.value = '';
        }
        // CSS grid
        document.querySelectorAll('[for="tab_css_grid"], #tab_css_grid').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_grid.value = firstControl.dataset.tabCssGrid || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssGrid !== propertiesForm.tab_css_grid.value) propertiesForm.tab_css_grid.value = '';
        }
        // CSS header
        document.querySelectorAll('[for="tab_css_head"], #tab_css_head').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_head.value = firstControl.dataset.tabCssHead || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssHead !== propertiesForm.tab_css_head.value) propertiesForm.tab_css_head.value = '';
        }
        // CSS footer
        document.querySelectorAll('[for="tab_css_foot"], #tab_css_foot').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_foot.value = firstControl.dataset.tabCssFoot || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssFoot !== propertiesForm.tab_css_foot.value) propertiesForm.tab_css_foot.value = '';
        }
        // CSS body
        document.querySelectorAll('[for="tab_css_body"], #tab_css_body').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_body.value = firstControl.dataset.tabCssBody || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssBody !== propertiesForm.tab_css_body.value) propertiesForm.tab_css_body.value = '';
        }
        // CSS row
        document.querySelectorAll('[for="tab_css_row"], #tab_css_row').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_row.value = firstControl.dataset.tabCssRow || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssRow !== propertiesForm.tab_css_row.value) propertiesForm.tab_css_row.value = '';
        }
        // CSS alternative row
        document.querySelectorAll('[for="tab_css_alt"], #tab_css_alt').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_alt.value = firstControl.dataset.tabCssAlt || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssAlt !== propertiesForm.tab_css_alt.value) propertiesForm.tab_css_alt.value = '';
        }
        // CSS mouse over row
        document.querySelectorAll('[for="tab_css_over"], #tab_css_over').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_over.value = firstControl.dataset.tabCssOver || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tabCssOver !== propertiesForm.tab_css_over.value) propertiesForm.tab_css_over.value = '';
        }
        // CSS selected row
        document.querySelectorAll('[for="tab_css_sel"], #tab_css_sel').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tab_css_sel.value = firstControl.dataset.tabCssSel || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.tab_css_sel !== propertiesForm.tab_css_sel.value) propertiesForm.tab_css_sel.value = '';
        }
    }

    // Treeview ONLY
    if (commonValues.ctrl_type === 'tree') {
        // Items
        document.querySelectorAll('[for="tree_items"], #tree_items').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tree_items.value = firstControl.dataset.treeItems || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.treeItems !== propertiesForm.tree_items.value) propertiesForm.tree_items.value = '';
        }
        // Selection
        document.querySelectorAll('[for="tree_sel"], #tree_sel').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.tree_sel.value = firstControl.dataset.treeSel || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.treeSel !== propertiesForm.tree_sel.value) propertiesForm.tree_sel.value = '';
        }
    }

    // Images-list ONLY
    if (commonValues.ctrl_type === 'imglist') {
        // Items
        document.querySelectorAll('[for="imglist_items"], #imglist_items').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.imglist_items.value = firstControl.dataset.imglistItems || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imglistItems !== propertiesForm.imglist_items.value) propertiesForm.imglist_items.value = '';
        }
        // Item width
        document.querySelectorAll('[for="imglist_item_w"], #imglist_item_w').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.imglist_item_w.value = firstControl.dataset.imglistItemW || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imglistItemW !== propertiesForm.imglist_item_w.value) propertiesForm.imglist_item_w.value = '';
        }
        // Item height
        document.querySelectorAll('[for="imglist_item_h"], #imglist_item_h').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.imglist_item_h.value = firstControl.dataset.imglistItemH || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imglistItemH !== propertiesForm.imglist_item_h.value) propertiesForm.imglist_item_h.value = '';
        }
        // Delete action
        document.querySelectorAll('[for="imglist_del_act"], #imglist_del_act').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.imglist_del_act.value = firstControl.dataset.imglistDelAct || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.imglistDelAct !== propertiesForm.imglist_del_act.value) propertiesForm.imglist_del_act.value = '';
        }
    }

    // Progress-bar ONLY
    if (commonValues.ctrl_type === 'progress') {
        // Progress value
        document.querySelectorAll('[for="progress_val"], #progress_val').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.progress_val.value = firstControl.dataset.progressVal || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.progressVal !== propertiesForm.progress_val.value) propertiesForm.progress_val.value = '';
        }
        // Start action
        document.querySelectorAll('[for="progress_start"], #progress_start').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.progress_start.value = firstControl.dataset.progressStart || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.progressStart !== propertiesForm.progress_start.value) propertiesForm.progress_start.value = '';
        }
        // End action
        document.querySelectorAll('[for="progress_end"], #progress_end').forEach(element => {
            element.style.display = 'grid';
        });
        propertiesForm.progress_end.value = firstControl.dataset.progressEnd || '';
        for (let i = 1; i < selectedControls.length; i++) {
            const ctrl = selectedControls[i];
            if (ctrl.dataset.progressEnd !== propertiesForm.progress_end.value) propertiesForm.progress_end.value = '';
        }
    }

    propertiesForm.ctrl_name.value = commonValues.ctrl_name;
    propertiesForm.ctrl_parent.value = commonValues.ctrl_parent;
    propertiesForm.ctrl_type.value = commonValues.ctrl_type;
    propertiesForm.x.value = commonValues.x;
    propertiesForm.y.value = commonValues.y;
    propertiesForm.width.value = commonValues.width;
    propertiesForm.height.value = commonValues.height;
    propertiesForm.visible.value = commonValues.visible;
    propertiesForm.expand.value = commonValues.expand;
    propertiesForm.parent_options.value = commonValues.parent_options;
    propertiesForm.order.value = commonValues.order;

}

function saveStatus(action, forRedo = false, fromRedo = false) {
    const controlsData = [];
    if (forRedo) {
        const redoStack = JSON.parse(sessionStorage.getItem('redoStack')) || [];
        selectedControls.forEach(ctrl => saveDescend(ctrl, controlsData));
        redoStack.push({[action]: controlsData});
        sessionStorage.setItem('redoStack', JSON.stringify(redoStack));
    } else {
        const undoStack = JSON.parse(sessionStorage.getItem('undoStack')) || [];
        selectedControls.forEach(ctrl => saveDescend(ctrl, controlsData));
        undoStack.push({[action]: controlsData});
        if (undoStack.length > 10) {
            undoStack.splice(0, undoStack.length - 10);
        }
        sessionStorage.setItem('undoStack', JSON.stringify(undoStack));
        if (!fromRedo) {
            sessionStorage.setItem('redoStack', JSON.stringify([]));
        }
    }
}

function saveDescend(ctrl, controlsData) {
    controlsData.push(packCtrl(ctrl));
    // Aggiunge i figli (se il controllo è un container)
    if (ctrl.dataset.container === 'true') {
        const children = ctrl.querySelectorAll('.control');
        children.forEach(child => saveDescend(child, controlsData));
    }
}

function undo() {
    const undoStack = JSON.parse(sessionStorage.getItem('undoStack')) || [];
    if (undoStack.length < 1) {
        return;
    }
    let step = undoStack[undoStack.length - 1];
    let action = Object.keys(step)[0];
    undoStack.pop();
    sessionStorage.setItem('undoStack', JSON.stringify(undoStack));
    deselectAllControls();
    switch (action) {
        case 'delete':
            step[action].forEach((ctrl) => unpackCtrl(ctrl));
            prepareRedo();
            break;
        case 'create':
        case 'paste':
            prepareRedo();
            removeCtrls();
            break;
        default:
            prepareRedo();
            removeCtrls();
            step[action].forEach((ctrl) => unpackCtrl(ctrl));
            break;
    }
    hideContextMenu();

    function removeCtrls() {
        deselectAllControls();
        isShiftPressed = true;
        step[action].forEach((ctrlObj) => {
            let ctrlName = ctrlObj.ctrlName;
            const ctrl = document.getElementById(ctrlName);
            selectControl(ctrl);
        });
        isShiftPressed = false;
        if (selectedControls.length > 0) {
            selectedControls.forEach(ctrl => {
                const parent = ctrl.dataset.ctrlParent;
                ctrl.remove();
                reorderSiblings(parent);
            });
            selectedControls = [];
        }
    }

    function prepareRedo() {
        deselectAllControls();
        isShiftPressed = true;
        step[action].forEach((ctrl) => {
            let ctrlName = ctrl.ctrlName;
            const ctrlObj = document.getElementById(ctrlName);
            selectControl(ctrlObj);
        });
        isShiftPressed = false;
        // Add status for REDO
        saveStatus(action, true);
    }
}

function redo() {
    const redoStack = JSON.parse(sessionStorage.getItem('redoStack')) || [];
    if (redoStack.length < 1) {
        return;
    }
    let step = redoStack[redoStack.length - 1];
    let action = Object.keys(step)[0];
    redoStack.pop();
    sessionStorage.setItem('redoStack', JSON.stringify(redoStack));
    deselectAllControls();
    switch (action) {
        case 'delete':
            prepareUndo()
            removeCtrls();
            break;
        case 'create':
        case 'paste':
            step[action].forEach((ctrl) => unpackCtrl(ctrl));
            prepareUndo()
            break;
        default:
            prepareUndo()
            removeCtrls();
            step[action].forEach((ctrl) => unpackCtrl(ctrl));
            break;
    }
    hideContextMenu();

    function removeCtrls() {
        deselectAllControls();
        isShiftPressed = true;
        step[action].forEach((ctrlObj) => {
            let ctrlName = ctrlObj.ctrlName;
            const ctrl = document.getElementById(ctrlName);
            selectControl(ctrl);
        });
        isShiftPressed = false;
        if (selectedControls.length > 0) {
            selectedControls.forEach(ctrl => {
                const parent = ctrl.dataset.ctrlParent;
                ctrl.remove();
                reorderSiblings(parent);
            });
            selectedControls = [];
        }
    }

    function prepareUndo() {
        deselectAllControls();
        isShiftPressed = true;
        step[action].forEach((ctrl) => {
            let ctrlName = ctrl.ctrlName;
            const ctrlObj = document.getElementById(ctrlName);
            selectControl(ctrlObj);
        });
        isShiftPressed = false;
        // Add status for UNDO
        saveStatus(action, false, true);
    }
}

// Funzione per mostrare il menu contestuale
function showContextMenu(x, y) {
    if (contextMenu) {
        contextMenu.remove();
    }
    contextMenu = document.createElement('div');
    contextMenu.id = 'context-menu';
    const rect = drawingArea.getBoundingClientRect();
    contextMenu.style.left = `${x - rect.left}px`;
    contextMenu.style.top = `${y - rect.top}px`;
    let something = false;
    // Disable delete if control is a frame
    if (selectedControls.length === 1 && selectedControls[0].dataset.ctrlType === 'frame') {
        contextMenu.innerHTML += `
            <div class="context-menu-item" data-action="paste">Paste</div>
        `;
        something = true;
    } else if (selectedControls.length > 0) {
        contextMenu.innerHTML = `
            <div class="context-menu-item" data-action="copy">Copy</div>
            <div class="context-menu-item" data-action="paste">Paste</div>
            <div class="context-menu-item" data-action="delete">Delete</div>
        `;
        something = true;
    }

    // Aggiungi le nuove voci solo se ci sono più controlli selezionati
    if (selectedControls.length > 1) {
        contextMenu.innerHTML += `
            <hr style="border:none;border-top: 1px solid var(--jx-color-border);">
            <div class="context-menu-item" data-action="align-left">Left align</div>
            <div class="context-menu-item" data-action="align-right">Right align</div>
            <div class="context-menu-item" data-action="align-top">Top align</div>
            <div class="context-menu-item" data-action="align-bottom">Bottom align</div>
            <hr style="border:none;border-top: 1px solid var(--jx-color-border);">
            <div class="context-menu-item" data-action="max-width">Max width</div>
            <div class="context-menu-item" data-action="min-width">Min width</div>
            <div class="context-menu-item" data-action="max-height">Max height</div>
            <div class="context-menu-item" data-action="min-height">Min height</div>
        `;
        something = true;
    }

    // Aggiungi la voce "Select children" se il controllo è un container
    if (selectedControls.length === 1 && selectedControls[0].dataset.container === 'true') {
        contextMenu.innerHTML += `
            <hr style="border:none;border-top: 1px solid var(--jx-color-border);">
            <div class="context-menu-item" data-action="select-children">Select children</div>
        `;
        something = true;
    }
    // Aggiungi Undo/Redo se disponibili
    const undoStack = JSON.parse(sessionStorage.getItem('undoStack')) || [];
    const redoStack = JSON.parse(sessionStorage.getItem('redoStack')) || [];
    if ((undoStack.length + redoStack.length) > 0) {
        if (something) {
            contextMenu.innerHTML += '<hr style="border:none;border-top: 1px solid var(--jx-color-border);">';
        }
        if (undoStack.length > 0) {
            undoStep = undoStack[undoStack.length - 1];
            const label = Object.keys(undoStep)[0];
            contextMenu.innerHTML += `<div class="context-menu-item" data-action="undo">Undo ${label}</div>`;
        }
        if (redoStack.length > 0) {
            redoStep = redoStack[redoStack.length - 1];
            const label = Object.keys(redoStep)[0];
            contextMenu.innerHTML += `<div class="context-menu-item" data-action="redo">Redo ${label}</div>`;
        }
    }

    drawingArea.appendChild(contextMenu);

    contextMenu.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'copy') {
            copyControl();
        } else if (action === 'paste') {
            pasteControl(selectedControls[0].dataset.ctrlName);
        } else if (action === 'delete') {
            deleteControl();
        } else if (action === 'align-left') {
            alignControls('left');
        } else if (action === 'align-right') {
            alignControls('right');
        } else if (action === 'align-top') {
            alignControls('top');
        } else if (action === 'align-bottom') {
            alignControls('bottom');
        } else if (action === 'max-width') {
            resizeControls('max-width');
        } else if (action === 'min-width') {
            resizeControls('min-width');
        } else if (action === 'max-height') {
            resizeControls('max-height');
        } else if (action === 'min-height') {
            resizeControls('min-height');
        } else if (action === 'select-children') {
            selectChildren(selectedControls[0]);
        } else if (action === 'undo') {
            undo();
        } else if (action === 'redo') {
            redo(redoStep);
        }
    });
}

// Funzione per nascondere il menu contestuale
function hideContextMenu() {
    if (contextMenu) {
        contextMenu.remove();
        contextMenu = null;
    }
}

propertiesForm.addEventListener('keydown', (e) => {
    if (e.key === 'F5') {
        e.preventDefault();
        if (e.target.tagName === 'INPUT' && e.target.type === 'text') {
            saveControlsToStorage();
            window.parent.o2jse.cmd.exe(e, 1, 'zoom_gui', e.target.name, e.target.value);
        }
    }
    if (e.key === 'ArrowDown') {
        // Passa al campo successivo
        e.preventDefault();
        const formElements = Array.from(propertiesForm.querySelectorAll('input, select'))
            .filter(element => !element.disabled && element.offsetParent !== null);
        const currentIndex = formElements.indexOf(e.target);
        const nextIndex = (currentIndex + 1) % formElements.length;
        formElements[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
        // Passa al campo precedente
        e.preventDefault();
        const formElements = Array.from(propertiesForm.querySelectorAll('input, select'))
            .filter(element => !element.disabled && element.offsetParent !== null);
        const currentIndex = formElements.indexOf(e.target);
        const prevIndex = (currentIndex - 1 + formElements.length) % formElements.length;
        formElements[prevIndex].focus();
    }

});

propertiesForm.addEventListener('change', (e) => {
    if (selectedControls.length > 0) {
        selectedControls.forEach(ctrl => {
            updateControlProperty(ctrl, e.target.id, e.target.value);
        });
    }
});

drawingArea.addEventListener('click', (e) => {
    if (e.target === drawingArea) {
        deselectAllControls();
        setMode();
    }
});

drawingArea.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.target === drawingArea) {
        deselectAllControls();
        showContextMenu(e.clientX, e.clientY);
    } else if (e.target.classList.contains('control') && currentMode === 'select') {
        if (!selectedControls.includes(e.target)) {
            selectControl(e.target);
        }
        showContextMenu(e.clientX, e.clientY);
    } else {
        hideContextMenu();
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu')) {
        hideContextMenu();
    }
});
