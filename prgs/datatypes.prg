<?php
//2.9
//o2def::module("");
//o2def::folder("repository");
/*
o2def::prgnotes("");
*/

o2def::prg("datatypes", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("datatypes", false, "", "datatypes_post", 1, 0);
o2def::view("objstatus", false, "", "", 1, 0);
o2def::act("checkin");
o2def::act("checkout");
o2def::act("datatypes_delete");
o2def::act("datatypes_insert");
o2def::act("datatypes_post");
o2def::act("datatypes_undo");
o2def::act("discard");
o2def::act("edit");
o2def::act("exit");
o2def::act("save");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::form("datatypes", "", False, "true", false);

?>
