<?php
//2.0
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("");
*/

o2def::prg("load_menu", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("menu", False, "", "");
o2def::view("del_menu", False, "", "");
o2def::act("create_menu", "");
o2def::act("default", "");
o2def::act("del_menu", "");
o2def::act("load_menus", "");
o2def::act("start", "");
o2def::par(1, "userid","_o2alpha");
?>
