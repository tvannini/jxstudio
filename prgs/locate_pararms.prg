<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("locate_pararms", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tmp_params", false, "", "params_post", 0, 0);
o2def::view("obj_status", false, "", "", 0, 0);
o2def::view("view", false, "", "", 0, 0);
o2def::act("add_field");
o2def::act("add_fields");
o2def::act("add_param");
o2def::act("params_post");
o2def::act("save");
o2def::act("start");
o2def::act("zoom_exp");
o2def::form("locate_pararms", "", False, "true", false);
o2def::par(1, "pgrname", "prgname");
o2def::par(2, "view", "viewname");
o2def::par(3, "params", "_o2text");
o2def::par(4, "params_count", "_o2number");

?>
