<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("If parameter "concat_ser" is array with elements then formula is a CONCAT, else it is an SQL formula.
In case of CONCAT parameter "formula_exp" shows the number of elements in CONCAT.
In case of SQL formula parameter "formula_exp" is the effective expression-ID for the formula.");
*/

o2def::prg("sql_formula", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tmp_concat", false, "", "tmp_concat_post", 0, 0);
o2def::view("prg_status", false, "", "", 0, 0);
o2def::view("prg_exp_decode", false, "", "", 0, 0);
o2def::view("combo_view_fields", false, "", "", 0, 0);
o2def::act("add_concat_element");
o2def::act("cancel");
o2def::act("concat_elements");
o2def::act("read_element");
o2def::act("save");
o2def::act("serialize_concat");
o2def::act("sql_expression");
o2def::act("start");
o2def::act("tmp_concat_delete");
o2def::act("tmp_concat_insert");
o2def::act("tmp_concat_post");
o2def::act("tmp_concat_undo");
o2def::act("zoom_concat_expr");
o2def::act("zoom_concat_field");
o2def::act("zoom_formula_expr");
o2def::form("sql_formula", "", False, "true", false);
o2def::par(1, "prg_name", "prgname");
o2def::par(2, "view_name", "viewname");
o2def::par(3, "formula_exp", "idexpr");
o2def::par(4, "concat_ser", "serialized");
o2def::par(5, "prg_modified", "_o2logical");

?>
