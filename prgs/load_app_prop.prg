<?php
//3.0
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("reg_exp OK
");
*/

o2def::prg("load_app_prop", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("appprop", false, "", "", 1, 0);
o2def::act("create_appprop");
o2def::act("delete_appprop");
o2def::act("set_repositories");
o2def::act("start");
?>
