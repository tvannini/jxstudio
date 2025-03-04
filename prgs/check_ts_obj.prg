<?php
//2.9
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("");
*/

o2def::prg("check_ts_obj", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("ts_obj", false, "", "", 1, 0);
o2def::act("delete_ts");
o2def::act("execute");
o2def::act("reload_object");
o2def::act("start");
o2def::form("check_ts_obj", "", False, "true", false);
o2def::par(1, "obj_name", "_o2alpha");

?>
