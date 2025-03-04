<?php
//2.9
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("program_complete", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("prg", false, "", "fields_post", 1, 0);
o2def::view("obj_status", false, "", "", 1, 0);
o2def::view("prgvars", false, "", "prgvars_post", 1, 0);
o2def::view("views", false, "", "", 1, 0);
o2def::view("acts", false, "", "", 1, 0);
o2def::view("forms", false, "", "", 1, 0);
o2def::view("iofiles", false, "", "", 1, 0);
o2def::view("protocols", false, "", "", 1, 0);
o2def::view("params", false, "", "params_post", 1, 0);
o2def::view("combo_datatypes", false, "", "", 1, 0);
o2def::view("datatypes_status", false, "", "", 1, 0);
o2def::view("operations", false, "", "operations_post", 1, 0);
o2def::view("expressions", false, "", "expressions_post", 1, 0);
o2def::view("view_tables", false, "", "view_tables_post", 1, 0);
o2def::view("main_tab", false, "", "", 1, 0);
o2def::view("link_tab", false, "", "", 1, 0);
o2def::view("link_fields", false, "", "link_fields_post", 1, 0);
o2def::view("fields", false, "", "fields_post", 1, 0);
o2def::view("tables_status", false, "", "", 1, 0);
o2def::view("combo_link_fields", false, "", "", 1, 0);
o2def::view("transl_field_tab", false, "", "", 1, 0);
o2def::view("tmp_edit_vars", false, "", "", 1, 0);
o2def::view("operations_reorder", false, "", "", 1, 0);
o2def::view("tmp_actions_var", false, "", "", 1, 0);
o2def::act("acts_delete");
o2def::act("acts_insert");
o2def::act("acts_post");
o2def::act("acts_undo");
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("close_all");
o2def::act("discard_program");
o2def::act("edit_operation");
o2def::act("exit");
o2def::act("expr_edit");
o2def::act("expressions_delete");
o2def::act("expressions_insert");
o2def::act("expressions_post");
o2def::act("expressions_undo");
o2def::act("fields_delete");
o2def::act("fields_detail");
o2def::act("fields_insert");
o2def::act("fields_post");
o2def::act("fields_undo");
o2def::act("link_fields_delete");
o2def::act("link_fields_detail");
o2def::act("link_fields_insert");
o2def::act("link_fields_post");
o2def::act("link_fields_undo");
o2def::act("on_fieldtype_change");
o2def::act("on_opertype_change");
o2def::act("on_prg_shortcut");
o2def::act("on_prgname_change");
o2def::act("on_view_change");
o2def::act("on_viewname_change");
o2def::act("operations_delete");
o2def::act("operations_detail");
o2def::act("operations_insert");
o2def::act("operations_post");
o2def::act("operations_select");
o2def::act("operations_undo");
o2def::act("params_delete");
o2def::act("params_insert");
o2def::act("params_post");
o2def::act("params_select");
o2def::act("params_undo");
o2def::act("prg_detail");
o2def::act("prg_post");
o2def::act("prgvars_delete");
o2def::act("prgvars_insert");
o2def::act("prgvars_post");
o2def::act("prgvars_undo");
o2def::act("rename_tab_in_fields");
o2def::act("rename_tab_in_linkfields");
o2def::act("reorder_operation_add");
o2def::act("reorder_operations_dele");
o2def::act("save_new_operation");
o2def::act("save_program");
o2def::act("select_expression");
o2def::act("select_field_like_exp");
o2def::act("select_field_max_exp");
o2def::act("select_field_min_exp");
o2def::act("select_field_not_exp");
o2def::act("select_field_table");
o2def::act("select_field_table_field");
o2def::act("select_index_in_view");
o2def::act("select_limit_exp");
o2def::act("select_prefix_action");
o2def::act("select_suffix_action");
o2def::act("select_table_in_view");
o2def::act("select_view_tab_key_exp");
o2def::act("set_prg_modified");
o2def::act("show_actions");
o2def::act("show_expressions");
o2def::act("show_forms");
o2def::act("show_main");
o2def::act("show_views");
o2def::act("start");
o2def::act("uncheck");
o2def::act("view_tables_delete");
o2def::act("view_tables_detail");
o2def::act("view_tables_insert");
o2def::act("view_tables_post");
o2def::act("view_tables_undo");
o2def::act("views_delete");
o2def::act("views_detail");
o2def::act("views_insert");
o2def::act("views_post");
o2def::act("views_select");
o2def::act("views_undo");
o2def::act("zoom_formula");
o2def::act("zoom_select");
o2def::form("main", "", False, "program_complete_exp_24()", false);
o2def::form("views", "", False, "program_complete_exp_25()", false);
o2def::form("actions", "", False, "program_complete_exp_26()", false);
o2def::form("forms", "", False, "program_complete_exp_107()", false);
o2def::form("expressions", "", False, "program_complete_exp_27()", false);
o2def::form("view", "", False, "program_complete_exp_42()", false);
o2def::par(1, "prgname", "prgname");






?>
