<?php
//2.9
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program_exps", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("obj_status", false, "", "", 1, 0);
o2def::view("prgexps", false, "", "", 0, 0);
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("discard");
o2def::act("exit");
o2def::act("prgexps_delete");
o2def::act("prgexps_detail");
o2def::act("prgexps_insert");
o2def::act("save");
o2def::act("set_prg_modified");
o2def::act("show_prg_part");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::form("prg_exps", "", False, "true", false);
o2def::par(1, "prgname", "prgname");
o2def::par(2, "menu_item", "_o2alpha");

?>
