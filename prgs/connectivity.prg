<?php
//2.9
//o2def::module("");
//o2def::folder("repository");
/*
o2def::prgnotes("");
*/

o2def::prg("connectivity", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("servers", false, "", "servers_post", 1, 0);
o2def::view("databases", false, "", "databases_post", 1, 0);
o2def::view("objstatus", false, "", "", 1, 0);
o2def::view("servers4combo", false, "", "", 1, 0);
o2def::act("check_status");
o2def::act("checkin");
o2def::act("checkout");
o2def::act("databases_delete");
o2def::act("databases_insert");
o2def::act("databases_post");
o2def::act("databases_undo");
o2def::act("discard");
o2def::act("edit");
o2def::act("exit");
o2def::act("goto_appvars");
o2def::act("goto_datatypes");
o2def::act("goto_programs");
o2def::act("goto_tables");
o2def::act("save");
o2def::act("servers_delete");
o2def::act("servers_insert");
o2def::act("servers_post");
o2def::act("servers_undo");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::form("connectivity", "", False, "true", false);

?>
