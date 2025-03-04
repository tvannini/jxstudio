<?php
//1.4
//o2def::module("");
//o2def::folder("export");
/*
o2def::prgnotes("");
*/

o2def::prg("save_app_vars", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("appvars", False, "", "");
o2def::view("ts_obj", False, "", "");
o2def::act("set_ts", "");
o2def::act("start", "");
o2def::act("write_var", "");
?>
