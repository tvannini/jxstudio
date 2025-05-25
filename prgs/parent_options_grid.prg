<?php
//3.0
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("parent_options_grid", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("tmp_edit_vars", false, "", "", 0, 0);
o2def::view("prg_actions", false, "", "", 0, 0);
o2def::act("save");
o2def::act("start");
o2def::act("zoom_cell_css");
o2def::act("zoom_footer");
o2def::act("zoom_footer_css");
o2def::act("zoom_header_action");
o2def::act("zoom_header_css");
o2def::act("zoom_title");
o2def::act("zoom_tooltip");
o2def::form("parent_options_grid", "", False, "true", false);
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "parent_options", "propvalue");
o2def::par(4, "readonly", "_o2logical");
o2def::par(5, "modified", "_o2logical");

?>
