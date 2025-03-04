<?php
// Voci menu
o2def::menu_item("", "M", "base", "", "", True, True, "");
o2def::menu_item("base", "M", "mfile", "File", "", True, True, "");
o2def::menu_item("mfile", "P", "projects", "Projects", "applications", True, True, "prjbar/jxapp16.png");
o2def::menu_item("mfile", "S", "sep4", "", "", True, True, "");
o2def::menu_item("mfile", "P", "exit", "Exit Janox", "app_exit", True, True, "prjbar/exit16.png");
o2def::menu_item("base", "M", "mapp", "Application", "", True, True, "");
o2def::menu_item("mapp", "P", "appprop", "Properties", "app_properties", True, True, "appbar/properties16.png");
o2def::menu_item("mapp", "P", "datatype", "Datatypes", "datatypes", True, True, "appbar/datatypes16.png");
o2def::menu_item("mapp", "P", "appvars", "Global variables", "app_vars", True, True, "appbar/vars16.png");
o2def::menu_item("mapp", "S", "sep1", "", "", True, True, "");
o2def::menu_item("mapp", "P", "connect", "Servers & Databases", "connectivity", True, True, "appbar/servers16.png");
o2def::menu_item("mapp", "P", "tables", "Tables", "tables", True, True, "appbar/tables16.png");
o2def::menu_item("mapp", "S", "sep2", "", "", True, True, "");
o2def::menu_item("mapp", "P", "prgs", "Programs", "programs", True, True, "appbar/programs16.png");
o2def::menu_item("mapp", "S", "sep3", "", "", True, True, "");
o2def::menu_item("mapp", "P", "menu", "Menu", "menu", True, True, "appbar/menu16.png");

o2def::menu_item("base", "M", "muti", "Utility", "", True, True, "");
o2def::menu_item("muti", "P", "guiedit", "GUI editor", "gui_editor", True, True, "");
o2def::menu_item("muti", "P", "test", "Test menu", "provacalcmemu", True, True, "");
o2def::menu_item("muti", "P", "loadprg", "Prova load prg", "test_load_prg", True, True, "");
o2def::menu_item("muti", "P", "tables_full", "Full table repository", "tables_x_tommy", True, True, "");

o2def::menu_item("base", "M", "mcvs", "CVS", "", True, True, "");
o2def::menu_item("mcvs", "P", "checkedobj", "Checked Objects", "checked_objects", True, True, "");
o2def::menu_item("mcvs", "P", "refreshprg", "Refresh program list", "refresh_programs_list", True, True, "");

o2def::menu_item("base", "M", "mhelp", "Help", "", True, True, "");
o2def::menu_item("mhelp", "P", "hfunc", "Janox functions", "functions_reference", True, True, "helpbar/help16.png");
o2def::menu_item("mhelp", "S", "sep5", "", "", True, True, "");
o2def::menu_item("mhelp", "P", "about", "About Janox", "about", True, True, "helpbar/about16.png");
?>
