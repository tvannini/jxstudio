<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("project", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("workset", false, "", "", 0, 0);
o2def::act("add_prg");
o2def::act("goto_items");
o2def::act("load_workset");
o2def::act("refresh_menu_items");
o2def::act("start");
o2def::par(1, "menu_item", "path");
o2def::par(2, "prg", "prgname");
?>
