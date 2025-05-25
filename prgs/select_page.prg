<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_page", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tmp_edit_var", false, "", "", 0, 0);
o2def::act("select");
o2def::act("start");
o2def::form("select_page", "", False, "true", false);
o2def::par(1, "page", "_o2number");
o2def::par(2, "pages", "_o2text");

?>
