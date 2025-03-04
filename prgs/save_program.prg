<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("save_program", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prg", False, "", "");
o2def::view("obj_status", False, "", "");
o2def::view("prgvars", False, "", "");
o2def::view("views", False, "", "");
o2def::view("acts", False, "", "");
o2def::view("forms", False, "", "");
o2def::view("iofiles", False, "", "");
o2def::view("protocols", False, "", "");
o2def::view("params", False, "", "");
o2def::view("combo_datatypes", False, "", "");
o2def::view("datatypes_status", False, "", "");
o2def::view("operations", False, "", "");
o2def::view("expressions", False, "", "");
o2def::view("oper_detail", False, "", "");
o2def::act("acts_delete", "");
o2def::act("acts_insert", "");
o2def::act("acts_post", "");
o2def::act("acts_undo", "");
o2def::act("expressions_delete", "");
o2def::act("expressions_insert", "");
o2def::act("expressions_post", "");
o2def::act("expressions_undo", "");
o2def::act("operations_delete", "");
o2def::act("operations_detail", "");
o2def::act("operations_insert", "");
o2def::act("operations_post", "");
o2def::act("operations_select", "");
o2def::act("operations_undo", "");
o2def::act("params_delete", "");
o2def::act("params_insert", "");
o2def::act("params_post", "");
o2def::act("params_undo", "");
o2def::act("prgvars_delete", "");
o2def::act("prgvars_insert", "");
o2def::act("prgvars_post", "");
o2def::act("prgvars_undo", "");
o2def::act("select_param_datatype", "");
o2def::act("select_var_datatype", "");
o2def::act("show_actions", "");
o2def::act("show_main", "");
o2def::act("show_views", "");
o2def::act("start", "");
o2def::act("views_delete", "");
o2def::act("views_insert", "");
o2def::act("views_post", "");
o2def::act("views_undo", "");
o2def::form("save_program_1", "", False, "true");
o2def::par(1, "prgname","prgname");

?>
