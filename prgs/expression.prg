<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("expression", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("expressions", False, "", "");
o2def::view("exp_id", False, "", "");
o2def::act("assign_id", "");
o2def::act("cancel", "");
o2def::act("create", "");
o2def::act("done", "");
o2def::act("look4id", "");
o2def::act("start", "");
o2def::act("zoom", "");
o2def::form("exp", "", False, "true");
o2def::par(1, "userid","_o2alpha");
o2def::par(2, "prgname","prgname");
o2def::par(3, "exp_id","idexpr");
o2def::par(4, "readonly","_o2logical");
o2def::par(5, "modified","_o2logical");
o2def::par(6, "create","_o2logical");

?>
