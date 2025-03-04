<?php
//2.9
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("app_properties", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("appprop", false, "", "", 1, 0);
o2def::act("close");
o2def::act("exit");
o2def::act("goto_appvars");
o2def::act("goto_datatypes");
o2def::act("goto_programs");
o2def::act("goto_tables");
o2def::act("save");
o2def::act("select_menu");
o2def::act("select_prg_start");
o2def::act("select_request_prg");
o2def::act("select_runtime_folder");
o2def::act("set_modified");
o2def::act("start");
o2def::act("tree_select");
o2def::form("app_prop", "", False, "true", false);

?>
