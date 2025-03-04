<?php
//2.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_datatype", "start", "", __FILE__);

o2def::view("datatypes", False, "", "");
o2def::view("tables_check", False, "", "");
o2def::act("datatypes_select", "");
o2def::act("start", "");
o2def::form("select_table", "", False, "true", false);
o2def::par(1, "selected_datatype","datatypename");

?>
