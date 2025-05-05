<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_css", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prgexps", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::view("app_props", false, "", "", 0, 0);
o2def::act("save");
o2def::act("select_expr");
o2def::act("start");
o2def::form("css", "", False, "true", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "css_class", "cssstyle");
o2def::par(4, "expid", "idexpr");
o2def::par(5, "readonly", "_o2logical");
o2def::par(6, "modified", "_o2logical");

?>
