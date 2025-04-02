<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_prg_field", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prgviews", false, "", "", 1, 0);
o2def::view("prgvars", false, "", "", 1, 0);
o2def::view("prgfields", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::view("appvars", false, "", "", 0, 0);
o2def::view("appvars_status", false, "", "", 0, 0);
o2def::act("save_and_close");
o2def::act("start");
o2def::act("view_change");
o2def::form("select_prg_field", "", False, "true", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "field_view", "viewname");
o2def::par(4, "field_name", "field_name");

?>
