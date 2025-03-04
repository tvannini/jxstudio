<?php
//1.4
//o2def::module("");
//o2def::folder("");
/*
o2def::prgnotes("");
*/

o2def::prg("select_app_archive", "start", "", __FILE__);

o2def::view('prg§_§var');
o2def::act("connections_post", "");
o2def::act("from_engine2detail", "");
o2def::act("quit", "");
o2def::act("select_dbfile", "");
o2def::act("start", "");
o2def::form("as400", "", False, "select_app_archive_exp_8()");
o2def::form("db2", "", False, "select_app_archive_exp_9()");
o2def::form("mssql", "", False, "select_app_archive_exp_10()");
o2def::form("mysql", "", False, "select_app_archive_exp_11()");
o2def::form("oracle", "", False, "select_app_archive_exp_12()");
o2def::form("postgres", "", False, "select_app_archive_exp_13()");
o2def::form("sqlite", "", False, "select_app_archive_exp_14()");
o2def::form("engine", "", False, "select_app_archive_exp_15()");
o2def::par(1, "type","conn_type");
o2def::par(2, "host","conn_host");
o2def::par(3, "user","conn_db_info");
o2def::par(4, "password","conn_db_info");
o2def::par(5, "db","conn_db_info");
o2def::par(6, "schema","conn_db_info");








?>
