<?php
//1.4
//o2def::module("");
//o2def::folder("repository");
/*
o2def::prgnotes("");
*/

o2def::prg("menu", "", "", __FILE__);

o2def::view("menu", False, "", "");
o2def::view("obj_status", False, "", "");
o2def::act("checkin", "");
o2def::act("checkout", "");
o2def::act("checkstatus", "");
o2def::act("menu_delete", "");
o2def::act("menu_detail", "");
o2def::act("menu_insert", "");
o2def::act("menu_post", "");
o2def::act("menu_undo", "");
o2def::act("save", "");
o2def::act("uncheck", "");
o2def::act("up", "");
o2def::form("menu_1", "", False, "true");
o2def::par(1, "parentname","name");

?>
