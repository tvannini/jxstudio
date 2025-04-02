<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_prg_param", "start", "", __FILE__);

o2def::view("params", false, "", "", 0, 0);
o2def::view("tmp_edit_vars", false, "", "", 0, 0);
o2def::act("start");
o2def::act("tmp_edit_vars_select");
o2def::form("select_prg_param", "", False, "true", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "parameter", "idparam");

?>
