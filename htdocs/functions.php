<?php

function ExpstrToExp($expstr, $prgname) {

	$expstr = trim(str_replace('"','',$expstr));
	$expstr = str_replace('(','',$expstr);
	$expstr = str_replace(')','',$expstr);
	// espressione del tipo [o2exp_5]
	if (strpos($expstr,'[o2exp_') != false) {
		$exp_local = substr($expstr, 7, 8);
		print "---------------".$exp_local;
		return $exp_local;
	    }
	else {
		// espressione del tipo [nomeprg_exp_5()]
	    $exp_local = substr($expstr, strlen($prgname) + 5, 8);
    	//print "---------------".$exp_local;
    	if (str_replace("()", "", $exp_local) != "") {
    		return str_replace("()", "", $exp_local);
    		}
    	else return "0";
    	}

    }


function FormProperty($formname, $formcontent, $propname) {

	$search = '/form_'.$formname.'->'.$propname.'\((.*?)\);/';
	preg_match($search, $formcontent, $res_local);

	$ret_local = str_replace('"','',$res_local[1]);
	return $ret_local;

    }


function jxStdName($name) {

	return preg_replace('/\W/', '_', $name)
	
	}

?>