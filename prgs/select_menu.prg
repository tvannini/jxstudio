<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_menu", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("menu", false, "", "", 1, 0);
o2def::view("tables_check", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::act("start");
o2def::act("tmp_edit_vars_select");
o2def::form("select_table", "", False, "true", false);
o2def::par(1, "selected_menu", "menuname");

?>
