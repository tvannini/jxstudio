<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("programs", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("workset", false, "", "", 1, 0);
o2def::view("programs", false, "", "", 1, 0);
o2def::act("add_prg");
o2def::act("add_prg_to_workset");
o2def::act("close");
o2def::act("load_workset");
o2def::act("prg_show");
o2def::act("programs_delete");
o2def::act("programs_insert");
o2def::act("programs_select");
o2def::act("start");
o2def::act("tree_select");
o2def::act("workset_delete");
o2def::act("workset_select");
o2def::form("programs", "", False, "true", false);

?>
