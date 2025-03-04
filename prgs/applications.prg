<?php
//2.9
//o2def::module("");
//o2def::folder("application");
/*
o2def::prgnotes("");
*/

o2def::prg("applications", "", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("recents", false, "", "", 1, 0);
o2def::act("add");
o2def::act("close");
o2def::act("close_add");
o2def::act("default_archive");
o2def::act("newproject");
o2def::act("on_archive_change");
o2def::act("on_prj_shortcut");
o2def::act("recents_add");
o2def::act("recents_delete");
o2def::act("recents_post");
o2def::act("recents_select");
o2def::act("recents_undo");
o2def::act("select_archive");
o2def::act("select_project");
o2def::act("set_statusbar");
o2def::act("start");
o2def::form("prjlist", "", False, "applications_exp_38()", false);
o2def::form("select_prj", "", False, "applications_exp_22()", false);
o2def::par(1, "started", "_o2logical");


?>
