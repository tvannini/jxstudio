<?php
//2.9
//o2def::module("");
//o2def::folder("repository");
/*
o2def::prgnotes("");
*/

o2def::prg("tables", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tables", false, "", "table_post", 1, 0);
o2def::view("objstatus", false, "", "", 1, 0);
o2def::view("last_pos", false, "", "", 1, 0);
o2def::view("fields", false, "", "", 0, 0);
o2def::view("indexes", false, "", "", 0, 0);
o2def::view("idx_segments", false, "", "", 0, 0);
o2def::view("datatypes_status", false, "", "", 0, 0);
o2def::view("combo_datatypes", false, "", "", 0, 0);
o2def::view("dbs_status", false, "", "", 0, 0);
o2def::view("combo_databases", false, "", "", 0, 0);
o2def::view("combo_tab_fields", false, "", "", 0, 0);
o2def::act("checkin");
o2def::act("checkout");
o2def::act("close");
o2def::act("discard");
o2def::act("exit");
o2def::act("fields_delete");
o2def::act("fields_insert");
o2def::act("fields_post");
o2def::act("fields_undo");
o2def::act("goto_appvars");
o2def::act("goto_datatypes");
o2def::act("goto_programs");
o2def::act("goto_tables");
o2def::act("idx_segments_delete");
o2def::act("idx_segments_insert");
o2def::act("idx_segments_post");
o2def::act("idx_segments_undo");
o2def::act("indexes_delete");
o2def::act("indexes_insert");
o2def::act("indexes_post");
o2def::act("indexes_undo");
o2def::act("save");
o2def::act("start");
o2def::act("table_delete");
o2def::act("table_detail");
o2def::act("table_insert");
o2def::act("table_post");
o2def::act("table_undo");
o2def::act("tree_select");
o2def::act("uncheck");
o2def::act("zoom_database");
o2def::act("zoom_datatype");
o2def::act("zoom_seg_field");
o2def::form("tables", "", False, "true", false);

?>
