<?php
//2.9
//o2def::module("");
//o2def::folder("repository");
/*
o2def::prgnotes("");
*/

o2def::prg("app_vars", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("vars", false, "", "vars_post", 1, 0);
o2def::view("objstatus", false, "", "", 1, 0);
o2def::view("datatypes", false, "", "", 0, 0);
o2def::view("datatypes_status", false, "", "", 1, 0);
o2def::act("check_status");
o2def::act("checkin");
o2def::act("checkout");
o2def::act("datatype_zoom");
o2def::act("discard");
o2def::act("edit");
o2def::act("exit");
o2def::act("save");
o2def::act("select_datatype");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::act("vars_delete");
o2def::act("vars_insert");
o2def::act("vars_post");
o2def::act("vars_undo");
o2def::form("app_vars", "", False, "true", false);

?>
