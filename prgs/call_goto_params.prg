<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("call_goto_params", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tmp_params", false, "", "tmp_params_post", 0, 0);
o2def::view("caller_prg_status", false, "", "", 0, 0);
o2def::act("add_param");
o2def::act("create_parameter");
o2def::act("create_parameters");
o2def::act("save");
o2def::act("start");
o2def::act("tmp_params_post");
o2def::act("zoom_expression");
o2def::act("zoom_reference");
o2def::form("call_goto_params", "", False, "true", false);
o2def::par(1, "caller_prg", "prgname");
o2def::par(2, "called_prg", "prgname");
o2def::par(3, "params", "_o2text");
o2def::par(4, "goto", "_o2logical");
o2def::par(5, "ret_params_count", "_o2number");

?>
