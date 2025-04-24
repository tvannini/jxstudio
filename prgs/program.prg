<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prg", false, "", "", 1, 0);
o2def::view("obj_status", false, "", "", 1, 0);
o2def::view("views", false, "", "", 1, 0);
o2def::view("acts", false, "", "", 1, 0);
o2def::view("forms", false, "", "", 1, 0);
o2def::view("params", false, "", "params_post", 1, 0);
o2def::view("combo_datatypes", false, "", "", 1, 0);
o2def::view("datatypes_status", false, "", "", 1, 0);
o2def::view("controls", false, "", "", 0, 0);
o2def::act("add_act_from_ctrls");
o2def::act("add_act_from_form");
o2def::act("add_act_from_view");
o2def::act("add_form");
o2def::act("add_subactions");
o2def::act("add_view");
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("close_all");
o2def::act("discard_program");
o2def::act("exit");
o2def::act("load_actions");
o2def::act("load_forms");
o2def::act("load_views");
o2def::act("on_prgname_change");
o2def::act("params_delete");
o2def::act("params_insert");
o2def::act("params_post");
o2def::act("params_select");
o2def::act("params_undo");
o2def::act("prg_post");
o2def::act("save_program");
o2def::act("set_prg_modified");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::act("zoom_start_action");
o2def::form("main", "", False, "true", false);
o2def::par(1, "prgname", "prgname");

?>
