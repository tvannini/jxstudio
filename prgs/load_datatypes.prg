<?php
//2.0
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("reg_exp OK
");
*/

o2def::prg("load_datatypes", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("datatypes", False, "", "");
o2def::view("del_datatypes", False, "", "");
o2def::act("create_datatype", "");
o2def::act("delete_datatype", "");
o2def::act("load_datatypes", "");
o2def::act("start", "");
o2def::par(1, "userid","_o2alpha");
?>
