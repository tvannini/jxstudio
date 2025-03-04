<?php
//2.9
//o2def::module("");
//o2def::folder("export");
/*
o2def::prgnotes("");
*/

o2def::prg("save_app_prop", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("appprop", false, "", "", 1, 0);
o2def::view("css", false, "", "", 1, 0);
o2def::view("services", false, "", "", 1, 0);
o2def::act("compose_ini_file");
o2def::act("compose_php_file");
o2def::act("start");
o2def::act("write_file");
o2def::par(1, "userid", "_o2alpha");
?>
