<?php
//1.2.1
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("provaprg", "", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("view1", False, "", "");
o2def::view("view2", False, "", "");
o2def::act("closeform", "");
o2def::act("refreshform", "");
o2def::act("sbm_change", "");
o2def::act("view1_delete", "");
o2def::act("view1_detail", "");
o2def::act("view1_insert", "");
o2def::act("view1_post", "");
o2def::act("view1_select", "");
o2def::act("view1_undo", "");
o2def::form("provaprg_1", "", False, "provaprg_exp_12()", "provaprg_exp_13()");
o2def::form("provaprg_2", "", True, "true");
o2def::io("prova_io", "F", provaprg_exp_5(), "O");
o2def::protocol("prova_protocol", "XML");
o2def::par(1, "par_1","_o2number");
o2def::par(2, "par_2","_o2text");



?>
