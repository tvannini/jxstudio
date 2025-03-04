<?php
//2.9
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program_vars", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("obj_status", false, "", "", 1, 0);
o2def::view("prgvars", false, "", "prgvars_post", 1, 0);
o2def::view("combo_datatypes", false, "", "", 1, 0);
o2def::view("datatypes_status", false, "", "", 1, 0);
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("discard");
o2def::act("exit");
o2def::act("prgvars_delete");
o2def::act("prgvars_insert");
o2def::act("prgvars_post");
o2def::act("prgvars_undo");
o2def::act("save");
o2def::act("set_prg_modified");
o2def::act("show_prg_part");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::form("prg_vars", "", False, "true", false);
o2def::par(1, "prgname", "prgname");
o2def::par(2, "menu_item", "_o2alpha");

?>
