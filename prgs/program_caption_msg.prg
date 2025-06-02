<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program_caption_msg", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prgexps", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::act("save");
o2def::act("select_exp");
o2def::act("start");
o2def::form("expressions", "", False, "true", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "text", "operation_txt");
o2def::par(4, "readonly", "_o2logical");
o2def::par(5, "modified", "_o2logical");

?>
