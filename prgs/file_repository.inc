<?php
o2def::tab("o2_users", "default", "o2sys_users", "o2user");

	o2def::field("o2user", "o2user", "_o2alpha");
	o2def::field("o2password", "o2password", "_o2sid");
	o2def::field("area", "asp_area", "_o2alpha");
	o2def::field("expire_date", "expire_date", "_o2date");
	o2def::field("last_date", "last_date", "_o2date");
	o2def::field("last_time", "last_time", "_o2time");
	o2def::field("login_type", "login_type", "o2sys_login_type");
	o2def::field("last_pwd_date", "last_pwd_date", "_o2date");
	o2def::field("force_pwd_change", "force_pwd_change", "_o2logical");
	o2def::field("pwds_history", "pwds_history", "o2sys_long_str");
	o2def::field("no_pwd_change", "no_pwd_change", "_o2logical");
	o2def::field("creation_date", "creation_date", "_o2date");
	o2def::field("admin", "admin", "_o2logical");
	o2def::field("poweruser", "poweruser", "_o2logical");
	o2def::field("hidden", "hidden", "_o2logical");

	o2def::index("asp_area", "area","A", "o2user","A");
	o2def::index("o2user", "o2user","A");


o2def::tab("o2_sessions", "default", "o2sys_sessions", "sid");

	o2def::field("sid", "sid", "_o2sid");
	o2def::field("o2user", "o2user", "_o2alpha");
	o2def::field("c_date", "c_date", "_o2date");
	o2def::field("c_time", "c_time", "_o2time");
	o2def::field("a_date", "a_date", "_o2date");
	o2def::field("a_time", "a_time", "_o2time");
	o2def::field("e_date", "e_date", "_o2date");
	o2def::field("e_time", "e_time", "_o2time");
	o2def::field("terminal_id", "terminal_id", "jxterminal_id");
	o2def::field("app_name", "app_name", "_o2alpha");
	o2def::field("run_mode", "run_mode", "o2sys_app_run_mode");
	o2def::field("host", "host", "jxhost");

	o2def::index("sid", "sid","A");
	o2def::index("expire", "e_date","A", "e_time","A", "sid","A");
	o2def::index("upd_desc", "a_date","D", "a_time","D", "sid","A");


o2def::tab("o2_options", "default", "o2sys_options", "id");

	o2def::field("o2user", "o2user", "_o2alpha");
	o2def::field("code", "code", "_o2alpha");
	o2def::field("value", "value", "_o2sid");

	o2def::index("id", "o2user","A", "code","A");


o2def::tab("o2_rights", "default", "o2sys_rights", "right_code");

	o2def::field("right_code", "right_code", "_o2alpha");

	o2def::index("right_code", "right_code","A");


o2def::tab("o2_roles", "default", "o2sys_roles", "role_name");

	o2def::field("role_name", "role_name", "_o2alpha");

	o2def::index("role_name", "role_name","A");


o2def::tab("o2_rights_per_role", "default", "o2sys_rights_per_role", "role_name");

	o2def::field("role_name", "role_name", "_o2alpha");
	o2def::field("right_code", "right_code", "_o2alpha");

	o2def::index("role_name", "role_name","A", "right_code","A");
	o2def::index("right_code", "right_code","A", "role_name","A");


o2def::tab("o2_roles_per_user", "default", "o2sys_roles_per_user", "o2user");

	o2def::field("o2user", "o2user", "_o2alpha");
	o2def::field("role_name", "role_name", "_o2alpha");

	o2def::index("o2user", "o2user","A", "role_name","A");
	o2def::index("role_name", "role_name","A", "o2user","A");


o2def::tab("o2_objs_rights", "default", "o2_objs_rights", "obj");

	o2def::field("obj_type", "obj_type", "o2sys_obj_type");
	o2def::field("obj_name", "obj_name", "_o2alpha");
	o2def::field("right_vis", "right_vis", "_o2alpha");
	o2def::field("right_enable", "right_enable", "_o2alpha");

	o2def::index("obj", "obj_type","A", "obj_name","A", "right_vis","A", "right_enable","A");


o2def::tab("tables", "app", "tables", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("tabname", "tabname", "name");
	o2def::field("position", "position", "id");
	o2def::field("dbname", "dbname", "name");
	o2def::field("databasename", "databasename", "name");
	o2def::field("pkey", "pkey", "name");
	o2def::field("module", "module", "name");
	o2def::field("folder", "folder", "name");

	o2def::index("pos", "userid","A", "position","A");
	o2def::index("name", "userid","A", "tabname","A");


o2def::tab("fields", "app", "fields", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("tablename", "tablename", "name");
	o2def::field("fieldname", "fieldname", "name");
	o2def::field("position", "position", "id");
	o2def::field("dbname", "dbname", "name");
	o2def::field("datatype", "datatype", "name");

	o2def::index("pos", "userid","A", "tablename","A", "position","A");
	o2def::index("name", "userid","A", "tablename","A", "fieldname","A");


o2def::tab("indexes", "app", "indexes", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("tablename", "tablename", "name");
	o2def::field("idxname", "idxname", "name");
	o2def::field("unique", "unique", "_o2logical");
	o2def::field("position", "position", "id");
	o2def::field("dbname", "dbname", "name");

	o2def::index("pos", "userid","A", "tablename","A", "position","A");
	o2def::index("name", "userid","A", "tablename","A", "idxname","A");


o2def::tab("idxsegments", "app", "idxsegments", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("tablename", "tablename", "name");
	o2def::field("idxname", "idxname", "name");
	o2def::field("position", "position", "id");
	o2def::field("fieldname", "fieldname", "name");
	o2def::field("direction", "direction", "asc_desc");

	o2def::index("pos", "userid","A", "tablename","A", "idxname","A", "position","A");
	o2def::index("name", "userid","A", "tablename","A", "idxname","A", "fieldname","A");


o2def::tab("databases", "app", "databases", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("jxname", "jxname", "name");
	o2def::field("servername", "servername", "name");
	o2def::field("dbname", "dbname", "name");
	o2def::field("dbowner", "dbowner", "name");
	o2def::field("asp", "asp", "_o2logical");
	o2def::field("create_tables", "create_tables", "_o2logical");

	o2def::index("name", "userid","A", "jxname","A");


o2def::tab("appprop", "app", "appprop", "name");

	o2def::field("appname", "appname", "description");
	o2def::field("title", "title", "description");
	o2def::field("o2rntpath", "o2rntpath", "propvalue");
	o2def::field("activemenu", "activemenu", "name");
	o2def::field("validate", "validate", "validation");
	o2def::field("startprg", "startprg", "name");
	o2def::field("reqprg", "reqprg", "name");
	o2def::field("headerfile", "headerfile", "propvalue");
	o2def::field("footerfile", "footerfile", "path");
	o2def::field("timeout", "timeout", "id");
	o2def::field("nologinpage", "nologinpage", "propvalue");
	o2def::field("defaultpage", "defaultpage", "propvalue");
	o2def::field("reporterfile", "reporterfile", "propvalue");
	o2def::field("documentor", "documentor", "on_off");
	o2def::field("sharedir", "sharedir", "propvalue");
	o2def::field("menupos", "menupos", "menupos");
	o2def::field("chr_encoding", "chr_encoding", "propvalue");
	o2def::field("extra_inc", "extra_inc", "propvalue");
	o2def::field("html_head", "html_head", "propvalue");

	o2def::index("name", "appname","A");


o2def::tab("datatypes", "app", "datatypes", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("name", "name", "datatypename");
	o2def::field("type", "type", "datatype");
	o2def::field("mask", "mask", "description");
	o2def::field("module", "module", "name");
	o2def::field("folder", "folder", "name");
	o2def::field("zoom_prg", "zoom_prg", "prgname");

	o2def::index("name", "userid","A", "name","A");


o2def::tab("appvars", "app", "appvars", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("name", "name", "appvarname");
	o2def::field("datatype", "datatype", "datatypename");
	o2def::field("module", "module", "name");
	o2def::field("folder", "folder", "name");

	o2def::index("name", "userid","A", "name","A");


o2def::tab("servers", "app", "servers", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("servername", "servername", "name");
	o2def::field("engine", "engine", "engine");
	o2def::field("hostname", "hostname", "description");
	o2def::field("user", "o2user", "name");
	o2def::field("password", "o2password", "password");
	o2def::field("chunksize", "chunksize", "id");

	o2def::index("name", "userid","A", "servername","A");


o2def::tab("appcss", "app", "appcss", "pos");

	o2def::field("pos", "pos", "id");
	o2def::field("css", "css", "path");

	o2def::index("pos", "pos","A");


o2def::tab("appservices", "app", "appservices", "name");

	o2def::field("servicename", "servicename", "name");

	o2def::index("name", "servicename","A");


o2def::tab("modules", "app", "modules", "name");

	o2def::field("name", "name", "name");
	o2def::field("description", "description", "description");

	o2def::index("name", "name","A");


o2def::tab("folders", "app", "folders", "name");

	o2def::field("name", "name", "name");
	o2def::field("description", "description", "description");

	o2def::index("name", "name","A");


o2def::tab("recents", "default", "recents", "path");

	o2def::field("username", "username", "_o2alpha");
	o2def::field("path", "path", "path");
	o2def::field("lastdate", "lastdate", "_o2date");
	o2def::field("lasttime", "lasttime", "_o2time");
	o2def::field("conn_type", "conn_type", "conn_type");
	o2def::field("conn_host", "conn_host", "conn_host");
	o2def::field("conn_user", "conn_user", "conn_db_info");
	o2def::field("conn_password", "conn_password", "conn_db_info");
	o2def::field("conn_db", "conn_db", "conn_db_info");
	o2def::field("conn_schema", "conn_schema", "conn_db_info");

	o2def::index("path", "username","A", "path","A");
	o2def::index("pos", "username","A", "lastdate","D", "lasttime","D", "path","A");


o2def::tab("tstamp_obj", "app", "tstamp_obj", "obj");

	o2def::field("objname", "objname", "name");
	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("fdate", "fdate", "_o2date");
	o2def::field("ftime", "ftime", "_o2time");
	o2def::field("type", "type", "objecttype");

	o2def::index("obj", "objname","A", "userid","A");
	o2def::index("type", "type","A", "objname","A", "userid","A");


o2def::tab("active_modules", "app", "active_modules", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("module", "module", "name");
	o2def::field("active", "active", "_o2logical");

	o2def::index("name", "userid","A", "module","A");


o2def::tab("menu", "app", "menu", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("name", "name", "menuname");
	o2def::field("parentname", "parentname", "menuname");
	o2def::field("position", "position", "id");
	o2def::field("type", "type", "menutype");
	o2def::field("label", "label", "description");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("url", "url", "path");
	o2def::field("icon", "icon", "path");
	o2def::field("level", "level", "_o2number");

	o2def::index("name", "userid","A", "name","A");
	o2def::index("parent", "userid","A", "parentname","A", "position","A", "name","A");
	o2def::index("level", "userid","A", "level","A", "position","A", "name","A");


o2def::tab("programs_list", "jxsess_db", "programs_list", "name");

	o2def::field("prgname", "prgname", "prgname");
	o2def::field("type", "type", "prg_type");
	o2def::field("module", "module", "name");
	o2def::field("folder", "folder", "name");
	o2def::field("last_date", "last_date", "_o2date");
	o2def::field("last_time", "last_time", "_o2time");

	o2def::index("name", "prgname","A");
	o2def::index("pos", "last_date","D", "last_time","D", "prgname","A");


o2def::tab("programs", "app", "programs", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("type", "type", "prg_type");
	o2def::field("startaction", "startaction", "actname");
	o2def::field("notes", "notes", "_o2text");
	o2def::field("module", "module", "name");
	o2def::field("folder", "folder", "name");

	o2def::index("name", "userid","A", "prgname","A");


o2def::tab("prgvars", "app", "prgvars", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("name", "name", "prgvarname");
	o2def::field("datatype", "datatype", "datatypename");

	o2def::index("name", "userid","A", "prgname","A", "name","A");


o2def::tab("prgviews", "app", "prgviews", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("name", "name", "viewname");
	o2def::field("rowlimit", "rowlimit", "id");
	o2def::field("rowlimitexp", "rowlimitexp", "idexpr");
	o2def::field("readrowact", "readrowact", "actname");
	o2def::field("modrowact", "modrowact", "actname");
	o2def::field("autoaggregate", "autoaggregate", "_o2logical");
	o2def::field("preparedstmts", "preparedstmts", "id_small");
	o2def::field("custom_where", "custom_where", "idexpr");

	o2def::index("name", "userid","A", "prgname","A", "name","A");


o2def::tab("tablesinview", "app", "tablesinview", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("viewname", "viewname", "viewname");
	o2def::field("position", "pos", "id");
	o2def::field("name", "name", "tablealias");
	o2def::field("tablename", "tablename", "tablename");
	o2def::field("type", "type", "tableinview_type");
	o2def::field("keyname", "keyname", "keyname");
	o2def::field("keyexp", "keyexp", "idexpr");
	o2def::field("tabexp", "tabexp", "idexpr");
	o2def::field("dbexp", "dbexp", "idexpr");

	o2def::index("name", "userid","A", "prgname","A", "viewname","A", "name","A");
	o2def::index("pos", "userid","A", "prgname","A", "viewname","A", "position","A");


o2def::tab("tablesinview_link", "app", "tablesinview_link", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("viewname", "viewname", "viewname");
	o2def::field("tabname", "tabname", "tablealias");
	o2def::field("position", "pos", "id");
	o2def::field("field", "field", "fieldalias");
	o2def::field("exp_from", "exp_from", "idexpr");
	o2def::field("exp_to", "exp_to", "idexpr");
	o2def::field("exp_not", "exp_not", "idexpr");
	o2def::field("exp_like", "exp_like", "idexpr");

	o2def::index("pos", "userid","A", "prgname","A", "viewname","A", "tabname","A", "position","A");


o2def::tab("fieldsinview", "app", "fieldsinview", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("viewname", "viewname", "viewname");
	o2def::field("position", "position", "id");
	o2def::field("type", "type", "select_type");
	o2def::field("tablename", "tablename", "tablealias");
	o2def::field("fieldname", "fieldname", "fieldname");
	o2def::field("name", "name", "fieldalias");
	o2def::field("exp_calc", "exp_calc", "idexpr");
	o2def::field("concat_ser", "concat_ser", "serialized");
	o2def::field("exp_from", "exp_from", "idexpr");
	o2def::field("exp_to", "exp_to", "idexpr");
	o2def::field("exp_not", "exp_not", "idexpr");
	o2def::field("exp_like", "exp_like", "idexpr");

	o2def::index("pos", "userid","A", "prgname","A", "viewname","A", "position","A");
	o2def::index("name", "userid","A", "prgname","A", "viewname","A", "name","A");
	o2def::index("abs_name", "userid","A", "prgname","A", "name","A", "viewname","A");


o2def::tab("prgexpressions", "app", "prgexpressions", "id");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("idexp", "idexp", "idexpr");
	o2def::field("script", "script", "_o2text");
	o2def::field("result", "result", "_o2text");

	o2def::index("id", "userid","A", "prgname","A", "idexp","A");


o2def::tab("aggreagateinview", "app", "aggreagateinview", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("viewname", "viewname", "viewname");
	o2def::field("aggrfunction", "aggrfunction", "aggregate_function");
	o2def::field("field", "field", "fieldalias");
	o2def::field("fieldout", "fieldout", "prgvarname");

	o2def::index("name", "userid","A", "prgname","A", "viewname","A", "aggrfunction","A", "field","A");


o2def::tab("parameters", "app", "parameters", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("position", "position", "idparam");
	o2def::field("name", "parname", "name");
	o2def::field("datatype", "datatype", "datatypename");

	o2def::index("pos", "userid","A", "prgname","A", "position","A");


o2def::tab("actions", "app", "actions", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("name", "name", "actname");
	o2def::field("catch_action", "catch_action", "actname");

	o2def::index("name", "userid","A", "prgname","A", "name","A");


o2def::tab("operations", "app", "operations", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("actname", "actname", "actname");
	o2def::field("position", "position", "id");
	o2def::field("operation", "operation", "operation");
	o2def::field("condition_exp", "condition_exp", "idexpr");
	o2def::field("upd_viewname", "upd_viewname", "viewname");
	o2def::field("upd_fieldname", "upd_fieldname", "fieldalias");
	o2def::field("upd_value", "upd_value", "idexpr");
	o2def::field("call_prgname", "call_prgname", "prgname");
	o2def::field("call_expid", "call_expid", "idexpr");
	o2def::field("call_gototype", "call_gototype", "gototype");
	o2def::field("rec_viewname", "rec_viewname", "viewname");
	o2def::field("rec_type", "rec_type", "recset_type");
	o2def::field("retpar_parid", "retpar_parid", "idparam");
	o2def::field("retpar_value", "retpar_value", "idexpr");
	o2def::field("exeact_actname", "exeact_actname", "actname");
	o2def::field("exeact_endcond", "exeact_endcond", "end_condition");
	o2def::field("exeact_expr", "exeact_expr", "idexpr");
	o2def::field("exeact_view", "exeact_view", "viewname");
	o2def::field("exescr_value", "exescr_value", "idexpr");
	o2def::field("msg_type", "msg_type", "msg_type");
	o2def::field("msg_value", "msg_value", "idexpr");
	o2def::field("setmenu_name", "setmenu_name", "menuname");
	o2def::field("io_type", "io_type", "iotype");
	o2def::field("io_protocol", "io_protocol", "protocolname");
	o2def::field("io_file", "io_file", "ioname");
	o2def::field("print_template", "print_template", "idexpr");
	o2def::field("print_pdffile", "print_pdffile", "idexpr");
	o2def::field("print_printer", "print_printer", "idexpr");
	o2def::field("rem_text", "rem_text", "operation_txt");
	o2def::field("pars_exp", "pars_exp", "idexpr");
	o2def::field("serialized_detail", "serialized_detail", "_o2text");

	o2def::index("pos", "userid","A", "prgname","A", "actname","A", "position","A");
	o2def::index("back_pos", "userid","A", "prgname","A", "actname","A", "position","D");


o2def::tab("forms", "app", "forms", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("formname", "formname", "formname");
	o2def::field("position", "position", "id");
	o2def::field("parent", "parent", "formname");
	o2def::field("menu", "menu", "_o2logical");
	o2def::field("caption", "caption", "description");
	o2def::field("caption_exp", "caption_exp", "idexpr");
	o2def::field("visible", "visible", "idexpr");
	o2def::field("top_y", "top_y", "id");
	o2def::field("left_x", "left_x", "id");
	o2def::field("heightpx", "heightpx", "id");
	o2def::field("widthpx", "widthpx", "id");
	o2def::field("vert_align", "vert_align", "vertaling");
	o2def::field("horizz_align", "horizz_align", "horizzalign");
	o2def::field("title_visible", "title_visible", "idexpr");
	o2def::field("status_visible", "status_visible", "idexpr");
	o2def::field("top_exp", "top_exp", "idexpr");
	o2def::field("left_exp", "left_exp", "idexpr");
	o2def::field("height_exp", "height_exp", "idexpr");
	o2def::field("width_exp", "width_exp", "idexpr");
	o2def::field("url", "url", "idexpr");
	o2def::field("close_act", "close_act", "actname");
	o2def::field("refresh_act", "refresh_act", "actname");
	o2def::field("seconds_refresh", "seconds_refresh", "idexpr");
	o2def::field("css_window", "css_window", "cssstyle");
	o2def::field("css_title", "css_title", "cssstyle");
	o2def::field("css_titledis", "css_titledis", "cssstyle");
	o2def::field("css_body", "css_body", "cssstyle");
	o2def::field("css_statusbar", "css_statusbar", "cssstyle");
	o2def::field("css_doc", "css_doc", "cssstyle");
	o2def::field("css_open", "css_open", "cssstyle");
	o2def::field("css_close", "css_close", "cssstyle");
	o2def::field("css_resize", "css_resize", "cssstyle");
	o2def::field("css_window_exp", "css_window_exp", "idexpr");
	o2def::field("css_title_exp", "css_title_exp", "idexpr");
	o2def::field("css_titledis_exp", "css_titledis_exp", "idexpr");
	o2def::field("css_body_exp", "css_body_exp", "idexpr");
	o2def::field("css_statusbar_exp", "css_statusbar_exp", "idexpr");
	o2def::field("css_doc_exp", "css_doc_exp", "idexpr");
	o2def::field("css_open_exp", "css_open_exp", "idexpr");
	o2def::field("css_close_exp", "css_close_exp", "idexpr");
	o2def::field("css_resize_exp", "css_resize_exp", "idexpr");

	o2def::index("name", "userid","A", "prgname","A", "formname","A");
	o2def::index("pos", "userid","A", "prgname","A", "position","A", "formname","A");


o2def::tab("controls", "app", "controls", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("formname", "formname", "formname");
	o2def::field("controlname", "controlname", "controlname");
	o2def::field("type", "type", "ctrltype");
	o2def::field("parent", "parent", "controlname");
	o2def::field("taborder", "taborder", "id");
	o2def::field("top_y", "top_y", "id");
	o2def::field("left_x", "left_x", "id");
	o2def::field("heightpx", "heightpx", "id");
	o2def::field("widthpx", "widthpx", "id");
	o2def::field("visible", "visible", "idexpr");
	o2def::field("enable", "enable", "idexpr");
	o2def::field("label", "label", "description");
	o2def::field("labelexp", "labelexp", "idexpr");
	o2def::field("view", "view", "viewname");
	o2def::field("field", "field", "fieldalias");
	o2def::field("mask", "mask", "datatypename");
	o2def::field("maskexp", "maskexp", "idexpr");
	o2def::field("action", "action", "actname");
	o2def::field("submit", "submit", "idexpr");
	o2def::field("style", "style", "cssstyle");
	o2def::field("style_exp", "style_exp", "idexpr");
	o2def::field("tab_hideind", "tab_hideind", "idexpr");
	o2def::field("tab_norecsmsg", "tab_norecsmsg", "description");
	o2def::field("tab_norecmsgexp", "tab_norecmsgexp", "idexpr");
	o2def::field("ed_pswd", "ed_pswd", "true_false");
	o2def::field("combo_row", "combo_row", "id");
	o2def::field("combo_view", "combo_view", "viewname");
	o2def::field("combo_key", "combo_key", "fieldalias");
	o2def::field("combo_descr", "combo_descr", "fieldalias");
	o2def::field("combo_exp", "combo_exp", "idexpr");
	o2def::field("btn_type", "btn_type", "btn_type");
	o2def::field("btn_msg", "btn_msg", "propvalue");
	o2def::field("btn_msg_exp", "btn_msg_exp", "idexpr");
	o2def::field("code_wide", "code_wide", "ctrl_wide");
	o2def::field("code_exp", "code_exp", "idexpr");
	o2def::field("upl_saveas", "upl_saveas", "idexpr");
	o2def::field("doc_path", "doc_path", "idexpr");
	o2def::field("img_file", "img_file", "path");
	o2def::field("img_fileexp", "img_fileexp", "idexpr");
	o2def::field("img_fileexprh", "img_fileexprh", "idexpr");
	o2def::field("mp_pages", "mp_pages", "propvalue");
	o2def::field("mp_activep", "mp_activep", "id");
	o2def::field("mp_tabpos", "mp_tabpos", "mptabpos");
	o2def::field("dbn_orient", "dbn_orient", "hori_vert");
	o2def::field("dbn_nbv", "dbn_nbv", "idexpr");
	o2def::field("dbn_iv", "dbn_iv", "idexpr");
	o2def::field("dbn_ie", "dbn_ie", "idexpr");
	o2def::field("dbn_iact", "dbn_iact", "actname");
	o2def::field("dbn_imsg", "dbn_imsg", "propvalue");
	o2def::field("dbn_imsgexp", "dbn_imsgexp", "idexpr");
	o2def::field("dbn_pv", "dbn_pv", "idexpr");
	o2def::field("dbn_pe", "dbn_pe", "idexpr");
	o2def::field("dbn_pact", "dbn_pact", "actname");
	o2def::field("dbn_pmsg", "dbn_pmsg", "propvalue");
	o2def::field("dbn_pmsgexp", "dbn_pmsgexp", "idexpr");
	o2def::field("dbn_dv", "dbn_dv", "idexpr");
	o2def::field("dbn_de", "dbn_de", "idexpr");
	o2def::field("dbn_dact", "dbn_dact", "actname");
	o2def::field("dbn_dmsg", "dbn_dmsg", "propvalue");
	o2def::field("dbn_dmsgexp", "dbn_dmsgexp", "idexpr");
	o2def::field("dbn_uv", "dbn_uv", "idexpr");
	o2def::field("dbn_ue", "dbn_ue", "idexpr");
	o2def::field("dbn_uact", "dbn_uact", "actname");
	o2def::field("dbn_umsg", "dbn_umsg", "propvalue");
	o2def::field("dbn_umsgexp", "dbn_umsgexp", "idexpr");
	o2def::field("dbn_dtv", "dbn_dtv", "idexpr");
	o2def::field("dbn_dte", "dbn_dte", "idexpr");
	o2def::field("dbn_dtact", "dbn_dtact", "actname");
	o2def::field("dbn_dtmsg", "dbn_dtmsg", "propvalue");
	o2def::field("dbn_dtmsgexp", "dbn_dtmsgexp", "idexpr");
	o2def::field("dbn_sv", "dbn_sv", "idexpr");
	o2def::field("dbn_se", "dbn_se", "idexpr");
	o2def::field("dbn_sact", "dbn_sact", "actname");
	o2def::field("dbn_smsg", "dbn_smsg", "propvalue");
	o2def::field("dbn_smsgexp", "dbn_smsgexp", "idexpr");

	o2def::index("name", "userid","A", "prgname","A", "formname","A", "controlname","A");
	o2def::index("taborder", "userid","A", "prgname","A", "formname","A", "taborder","A", "controlname","A");
	o2def::index("parent", "userid","A", "prgname","A", "formname","A", "parent","A", "taborder","A", "controlname","A");


o2def::tab("controls_css", "app", "controls_css", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("formname", "formname", "formname");
	o2def::field("controlname", "controlname", "controlname");
	o2def::field("propname", "propname", "name");
	o2def::field("cssstyle", "cssstyle", "cssstyle");
	o2def::field("cssexp", "cssexp", "idexpr");

	o2def::index("name", "userid","A", "prgname","A", "formname","A", "controlname","A", "propname","A");


o2def::tab("controls_parinfo", "app", "controls_parinfo", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("formname", "formname", "formname");
	o2def::field("controlname", "controlname", "controlname");
	o2def::field("line", "line", "id");
	o2def::field("from_column", "from_column", "id");
	o2def::field("to_column", "to_column", "id");
	o2def::field("column_title", "column_title", "propvalue");
	o2def::field("column_titleexp", "column_titleexp", "idexpr");
	o2def::field("column_style", "column_style", "cssstyle");
	o2def::field("column_styleexp", "column_styleexp", "idexpr");
	o2def::field("cell_style", "cell_style", "cssstyle");
	o2def::field("cell_styleexp", "cell_styleexp", "idexpr");
	o2def::field("hide_sort_btn", "hide_sort_btn", "true_false");
	o2def::field("hide_rep_val", "hide_rep_val", "true_false");
	o2def::field("idpage", "idpage", "id");

	o2def::index("name", "userid","A", "prgname","A", "formname","A", "controlname","A");


o2def::tab("controls_comboitems", "app", "controls_comboitems", "name");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("formname", "formname", "formname");
	o2def::field("controlname", "controlname", "controlname");
	o2def::field("code", "code", "name");
	o2def::field("description", "description", "propvalue");

	o2def::index("name", "userid","A", "prgname","A", "formname","A", "controlname","A", "code","A");


o2def::tab("prg_iofiles", "app", "prg_iofiles", "ioname");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("ioname", "ioname", "ioname");
	o2def::field("iotype", "iotype", "iotype");
	o2def::field("ioresource", "ioresource", "description");
	o2def::field("iodirection", "iodirection", "iodirection");

	o2def::index("ioname", "userid","A", "prgname","A", "ioname","A");


o2def::tab("prg_protocols", "app", "prg_protocols", "protname");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("protocol_name", "protocol_name", "protocolname");
	o2def::field("protocol_type", "protocol_type", "protocoltype");

	o2def::index("protname", "userid","A", "prgname","A", "protocol_name","A");


o2def::tab("operation_detail", "app", "operation_detail", "pos");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("actname", "actname", "actname");
	o2def::field("position", "position", "id");
	o2def::field("operation", "operation", "operation");
	o2def::field("operation_detail", "operation_detail", "_o2text");

	o2def::index("pos", "userid","A", "prgname","A", "actname","A", "position","A", "operation","A");


o2def::tab("base_tab", "app", "base_tab", "id");

	o2def::field("id", "id", "_o2alpha");

	o2def::index("id", "id","A");


o2def::tab("tmp_edit_vars", "jxsess_db", "tmp_edit_vars", "id");

	o2def::field("id", "id", "_o2logical");
	o2def::field("idexpr", "idexpr", "idexpr");
	o2def::field("table_name", "table_name", "tablename");
	o2def::field("fieldalias", "fieldalias", "fieldalias");
	o2def::field("actname", "actname", "actname");
	o2def::field("viewname", "viewname", "viewname");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("actname2", "actname_ii", "actname");
	o2def::field("int_number", "int_number", "_o2number");
	o2def::field("long_str", "long_str", "operation_txt");

	o2def::index("id", "id","A");


o2def::tab("work_set", "jxsess_db", "work_set", "id");

	o2def::field("userid", "userid", "_o2alpha");
	o2def::field("prgname", "prgname", "prgname");
	o2def::field("last_date", "last_date", "_o2date");
	o2def::field("last_time", "last_time", "_o2time");

	o2def::index("id", "userid","A", "prgname","A");
	o2def::index("recent", "userid","A", "last_date","D", "last_time","D", "prgname","A");


o2def::tab("tmp_locate", "jxsess_db", "tmp_locate", "pos");

	o2def::field("position", "position", "id");
	o2def::field("fieldname", "fieldname", "fieldalias");
	o2def::field("idexpr", "idexpr", "idexpr");

	o2def::index("pos", "position","A");
	o2def::index("fieldname", "fieldname","A");


o2def::tab("tmp_call", "jxsess_db", "tmp_call", "pos");

	o2def::field("position", "position", "id");
	o2def::field("param_name", "param_name", "name");
	o2def::field("param_type", "param_type", "datatypename");
	o2def::field("var_view", "var_view", "viewname");
	o2def::field("var_name", "var_name", "prgvarname");
	o2def::field("idexpr", "idexpr", "idexpr");
	o2def::field("field_desc", "field_desc", "description");

	o2def::index("pos", "position","A");


o2def::tab("tmp_concat", "jxsess_db", "tmp_concat", "pos");

	o2def::field("pos", "pos", "id");
	o2def::field("expression", "expression", "idexpr");
	o2def::field("field", "field", "fieldalias");

	o2def::index("pos", "pos","A");


?>
