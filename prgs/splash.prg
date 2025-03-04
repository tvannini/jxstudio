<?php
//2.9
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("Questo programma serve ad evitare che il primo programma chiamato ("app_pproperties")
abbia problemi di posizonamento verticale.

TODO:
Sembra che il primo programma online eseguito mantenga in memoria l'altezza del menu, 
per cui in tutte le visualizzazioni succesive questa altezza viene raddoppiata");
*/

o2def::prg("splash", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::act("start");
o2def::act("tree_select");
o2def::form("splash", "", False, "true", false);

?>
