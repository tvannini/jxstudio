<?php
//1.4
//o2def::module("");
//o2def::folder("repository");
/*
o2def::prgnotes("");
*/

o2def::prg("table_details", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("fields", False, "", "fields_post");
o2def::view("indexes", False, "", "indexes_post");
o2def::view("segments", False, "", "segments_post");
o2def::view("tables", False, "", "");
o2def::view("ts_object", False, "", "");
o2def::view("field_pos", False, "", "");
o2def::view("segment_pos", False, "", "");
o2def::view("index_pos", False, "", "");
o2def::view("previous_fields", False, "", "");
o2def::view("change_fields", False, "", "");
o2def::view("previous_indexes", False, "", "");
o2def::view("change_indexes", False, "", "");
o2def::view("prev_tab_segments", False, "", "");
o2def::view("prev_index_segments", False, "", "");
o2def::view("prev_field_segments", False, "", "");
o2def::view("change_tab_in_segments", False, "", "");
o2def::view("change_field_in_segments", False, "", "");
o2def::view("change_index_in_segments", False, "", "");
o2def::act("fields_delete", "");
o2def::act("fields_insert", "");
o2def::act("fields_post", "");
o2def::act("fields_select", "");
o2def::act("fields_undo", "");
o2def::act("indexes_delete", "");
o2def::act("indexes_insert", "");
o2def::act("indexes_post", "");
o2def::act("indexes_undo", "");
o2def::act("make_primary", "");
o2def::act("on_field_rename", "");
o2def::act("on_index_rename", "");
o2def::act("on_table_rename", "");
o2def::act("rename_field_in_segments", "");
o2def::act("rename_fields", "");
o2def::act("rename_index_in_segments", "");
o2def::act("rename_indexes", "");
o2def::act("rename_tab_in_segments", "");
o2def::act("save", "");
o2def::act("segments_delete", "");
o2def::act("segments_insert", "");
o2def::act("segments_post", "");
o2def::act("segments_select", "");
o2def::act("segments_undo", "");
o2def::act("start", "");
o2def::act("zoom_fields", "");
o2def::act("zoom_segments", "");
o2def::act("zoom_tables", "");
o2def::form("table_details_1", "", False, "true");
o2def::par(1, "table_name","name");
o2def::par(2, "modified","_o2logical");

?>
