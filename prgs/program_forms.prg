<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program_forms", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("obj_status", false, "", "", 1, 0);
o2def::view("prgexps", false, "", "", 0, 0);
o2def::view("prgforms", false, "", "", 0, 0);
o2def::view("prgacts", false, "", "", 0, 0);
o2def::view("prgctrls", false, "", "", 0, 0);
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("close_editor");
o2def::act("discard");
o2def::act("edit_form");
o2def::act("exit");
o2def::act("load_ctrl_in_editor");
o2def::act("load_form_in_editor");
o2def::act("prgforms_delete");
o2def::act("prgforms_insert");
o2def::act("save");
o2def::act("set_prg_modified");
o2def::act("set_size");
o2def::act("show_prg_part");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::form("prg_forms", "", False, "program_forms_exp_8()", false);
o2def::form("gui_editor", "", False, "program_forms_exp_9()", "program_forms_exp_7()");
o2def::par(1, "prgname", "prgname");
o2def::par(2, "menu_item", "_o2alpha");


?>
