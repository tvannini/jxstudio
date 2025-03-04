<?php
//2.0
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("reg_exp OK");
*/

o2def::prg("load_app_vars", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("appvars", False, "", "");
o2def::view("del_appvars", False, "", "");
o2def::act("create_appvar", "");
o2def::act("default", "");
o2def::act("delete_appvar", "");
o2def::act("load_appvars", "");
o2def::act("start", "");
o2def::par(1, "userid","_o2alpha");
?>
