<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("calc_menu_level", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("menu", False, "", "");
o2def::act("check", "");
o2def::act("start", "");
o2def::par(1, "userid","_o2alpha");
o2def::par(2, "menu_name","name");
o2def::par(3, "level_out","_o2number");
?>
