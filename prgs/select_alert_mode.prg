<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_alert_mode", "start", "", __FILE__);

o2def::view("tmp_edit_vars", false, "", "", 0, 0);
o2def::act("start");
o2def::act("tmp_edit_vars_select");
o2def::form("select_alert_mode", "", False, "true", false);
o2def::par(1, "alert_mode", "msg_type");

?>
