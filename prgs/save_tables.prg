<?php
//1.4
//o2def::module("");
//o2def::folder("export");
/*
o2def::prgnotes("");
*/

o2def::prg("save_tables", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tables", False, "", "");
o2def::view("fields", False, "", "");
o2def::view("indexes", False, "", "");
o2def::view("segments", False, "", "");
o2def::view("ts_obj", False, "", "");
o2def::act("field", "");
o2def::act("index", "");
o2def::act("segment", "");
o2def::act("set_ts", "");
o2def::act("start", "");
o2def::act("table", "");
o2def::act("write_db", "");
o2def::act("write_server", "");
?>
