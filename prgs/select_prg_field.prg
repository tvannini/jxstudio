<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_prg_field", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prgviews", False, "", "");
o2def::view("prgvars", False, "", "");
o2def::view("prgfields", False, "", "");
o2def::view("tmp_edit_vars", False, "", "");
o2def::act("save_and_close", "");
o2def::act("start", "");
o2def::form("select_prg_field", "", False, "true");
o2def::par(1, "userid","_o2alpha");
o2def::par(2, "prgname","prgname");
o2def::par(3, "field_view","viewname");
o2def::par(4, "field_name","field_name");
o2def::par(5, "field_desc","description");

?>
