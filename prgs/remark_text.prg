<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("remark_text", "start", "", __FILE__);

o2def::view("tmp_edit_vars", false, "", "", 0, 0);
o2def::act("start");
o2def::act("tmp_edit_vars_select");
o2def::form("remark_text", "", False, "true", false);
o2def::par(1, "remark_text", "operation_txt");

?>
