<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("expressions", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prgexps", False, "", "");
o2def::view("tmp_edit_vars", False, "", "");
o2def::act("create", "");
o2def::act("edit", "");
o2def::act("save", "");
o2def::act("start", "");
o2def::form("expressions", "", False, "true");
o2def::par(1, "userid","_o2alpha");
o2def::par(2, "prgname","prgname");
o2def::par(3, "expid","idexpr");
o2def::par(4, "readonly","_o2logical");
o2def::par(5, "modified","_o2logical");

?>
