<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("new_action", "start", "", __FILE__);

o2def::view("tmp_edit_vars", False, "", "");
o2def::act("start", "");
o2def::act("tmp_edit_vars_select", "");
o2def::form("new_action", "", False, "true");
o2def::par(1, "action_name","actname");

?>
