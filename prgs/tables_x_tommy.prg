<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("tables_x_tommy", "", "", __FILE__);

o2def::view("tables", False, "", "table_post");
o2def::view("fields", False, "", "fields_post");
o2def::view("indexes", False, "", "indexes_post");
o2def::view("segments", False, "", "segments_post");
o2def::view("combo_fields", False, "", "");
o2def::view("combo_database", False, "", "");
o2def::act("fields_delete", "");
o2def::act("fields_insert", "");
o2def::act("fields_post", "");
o2def::act("fields_undo", "");
o2def::act("indexes_delete", "");
o2def::act("indexes_insert", "");
o2def::act("indexes_post", "");
o2def::act("indexes_undo", "");
o2def::act("segments_delete", "");
o2def::act("segments_insert", "");
o2def::act("segments_post", "");
o2def::act("segments_undo", "");
o2def::act("table_delete", "");
o2def::act("table_insert", "");
o2def::act("table_post", "");
o2def::act("table_select", "");
o2def::act("table_undo", "");
o2def::form("tables_x_tommy_1", "", False, "true");

?>
