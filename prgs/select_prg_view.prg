<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_prg_view", "start", "", __FILE__);

o2def::view("prgviews", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::act("save_and_close");
o2def::act("skip_separators");
o2def::act("start");
o2def::form("select_prg_view", "", False, "select_prg_view_exp_1()", false);
o2def::form("select_recordset_act", "", False, "select_prg_view_exp_2()", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "view", "viewname");
o2def::par(4, "for_recordset", "_o2logical");
o2def::par(5, "view_method", "recset_type");


?>
