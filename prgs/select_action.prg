<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_action", "start", "", __FILE__);

o2def::view("actions", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::view("views", false, "", "", 0, 0);
o2def::act("change_loop_view");
o2def::act("create");
o2def::act("save");
o2def::act("save_for_execute");
o2def::act("save_new_action");
o2def::act("start");
o2def::act("zoom_loop_view");
o2def::form("actions", "", False, "select_action_exp_10()", false);
o2def::form("actions_for_exe", "", False, "select_action_exp_11()", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "actname", "actname");
o2def::par(4, "for_execute", "_o2logical");
o2def::par(5, "loop_view", "viewname");
o2def::par(6, "end_condition", "end_condition");
o2def::par(7, "exd_expression", "idexpr");


?>
