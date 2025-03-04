<?php
//2.9
//o2def::module("");
//o2def::folder("application");
/*
o2def::prgnotes("");
*/

o2def::prg("new_project", "", "", __FILE__);

o2def::view('prg§_§var');
o2def::view("recents", false, "", "", 1, 0);
o2def::act("createproject");
o2def::act("select_folder");
o2def::form("new_project_1", "", False, "true", false);
o2def::par(1, "path_p", "path");

?>
