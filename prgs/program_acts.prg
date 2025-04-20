<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program_acts", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("obj_status", false, "", "", 1, 0);
o2def::view("acts", false, "set_flag_catch", "", 1, 0);
o2def::view("forms", false, "", "", 1, 0);
o2def::view("iofiles", false, "", "", 1, 0);
o2def::view("protocols", false, "", "", 1, 0);
o2def::view("params", false, "", "", 1, 0);
o2def::view("combo_datatypes", false, "", "", 1, 0);
o2def::view("datatypes_status", false, "", "", 1, 0);
o2def::view("operations", false, "", "operations_post", 1, 0);
o2def::view("expressions", false, "", "", 1, 0);
o2def::view("operations_reorder", false, "", "", 1, 0);
o2def::view("acts_for_catch", false, "", "", 0, 0);
o2def::act("acts_delete");
o2def::act("acts_insert");
o2def::act("acts_post");
o2def::act("acts_undo");
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("create_catch_action");
o2def::act("discard_program");
o2def::act("exit");
o2def::act("obj_alert");
o2def::act("obj_call");
o2def::act("obj_close");
o2def::act("obj_confirm");
o2def::act("obj_execute");
o2def::act("obj_goto");
o2def::act("obj_io");
o2def::act("obj_menu");
o2def::act("obj_remark");
o2def::act("obj_report");
o2def::act("obj_return");
o2def::act("obj_script");
o2def::act("obj_update");
o2def::act("obj_view");
o2def::act("on_change_flag_catch");
o2def::act("on_opertype_change");
o2def::act("operations_delete");
o2def::act("operations_detail");
o2def::act("operations_insert");
o2def::act("operations_post");
o2def::act("operations_select");
o2def::act("operations_undo");
o2def::act("parexp_alert");
o2def::act("parexp_call");
o2def::act("parexp_confirm");
o2def::act("parexp_goto");
o2def::act("parexp_locate");
o2def::act("parexp_return");
o2def::act("parexp_script");
o2def::act("parexp_update");
o2def::act("remove_catch_action");
o2def::act("reorder_operation_add");
o2def::act("reorder_operations_dele");
o2def::act("save_new_operation");
o2def::act("save_program");
o2def::act("select_expression");
o2def::act("set_catch_action");
o2def::act("set_flag_catch");
o2def::act("set_prg_modified");
o2def::act("start");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::act("zoom_condition");
o2def::act("zoom_object");
o2def::act("zoom_param_exp");
o2def::form("prg_act", "", False, "true", false);
o2def::par(1, "prgname", "prgname");
o2def::par(2, "act_path", "path");

?>
