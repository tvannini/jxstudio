<?php
//2.9
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("reg_exp OK
");
*/

o2def::prg("load_tables", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tables", false, "", "", 1, 0);
o2def::view("fields", false, "", "", 1, 0);
o2def::view("indexes", false, "", "", 1, 0);
o2def::view("segments", false, "", "", 1, 0);
o2def::view("del_tables", false, "", "", 1, 0);
o2def::act("create_field");
o2def::act("create_index");
o2def::act("create_segment");
o2def::act("create_table");
o2def::act("default");
o2def::act("del_field");
o2def::act("del_index");
o2def::act("del_segment");
o2def::act("del_tables");
o2def::act("load_tables");
o2def::act("single_table");
o2def::act("start");
o2def::par(1, "userid", "_o2alpha");
?>
