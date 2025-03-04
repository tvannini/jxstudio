<?php
//2.9
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("menu_add_subactions", "start", "", __FILE__);

o2def::view("subactions", false, "", "", 0, 0);
o2def::view("action", false, "", "", 0, 0);
o2def::act("add_catch_action");
o2def::act("add_subaction");
o2def::act("start");
o2def::par(1, "userid", "_o2alpha");
o2def::par(2, "prgname", "prgname");
o2def::par(3, "actname", "actname");
o2def::par(4, "parent_menu_id", "path");
?>
