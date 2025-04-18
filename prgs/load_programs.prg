<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("load_programs", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("programs", false, "", "", 1, 0);
o2def::view("workset", false, "", "", 0, 0);
o2def::act("add_prg");
o2def::act("add_to_workset");
o2def::act("execute");
o2def::act("start");
o2def::form("load_programs_1", "", False, "true", false);

?>
