<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_view_table", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tables", False, "", "");
o2def::view("tmp_edit_vars", False, "", "");
o2def::act("start", "");
o2def::act("tmp_edit_vars_select", "");
o2def::form("select_table", "", False, "true");
o2def::par(1, "userid","_o2alpha");
o2def::par(2, "prgname","prgname");
o2def::par(3, "viewname","viewname");
o2def::par(4, "selected_table","tablename");

?>
