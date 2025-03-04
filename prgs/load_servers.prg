<?php
//2.0
//o2def::module("");
//o2def::folder("import");
/*
o2def::prgnotes("reg_exp OK
");
*/

o2def::prg("load_servers", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("servers", False, "", "");
o2def::view("databases", False, "", "");
o2def::view("del_server", False, "", "");
o2def::view("del_database", False, "", "");
o2def::act("create_db", "");
o2def::act("create_server", "");
o2def::act("default", "");
o2def::act("delete_db", "");
o2def::act("delete_server", "");
o2def::act("load_servers_dbs", "");
o2def::act("start", "");
o2def::par(1, "userid","_o2alpha");
?>
