<?php

/**
 * Janox Studio Start script
 * PHP7/8
 *
 *
 * This file is part of Janox.
 *
 * Janox is free software; you can redistribute it and/or modify it under the
 * terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * Janox is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Start script
 * ============
 *
 * This script is used to start a Janox Studio instance, without need of installing it
 * in a WEB Server.
 *
 * This script uses Janox Mini Web Server: for more informations see here:
 *
 *  https://github.com/tvannini/janox/wiki/JXServer
 *
 *
 * Usage
 * =====
 *
 * To run this script just execute (CMD, Shell, ...):
 *
 *  <php-executable> <this-script-full-path>/start.php
 *
 * To start application logging in with a user registered name run:
 *
 *  <php-executable> <this-script-full-path>/start.php <myname>
 *
 *
 * @name      start.php
 * @package   janox/studio/start.php
 * @version   2.9
 * @copyright Tommaso Vannini (tvannini@janox.it) 2025
 * @author    Tommaso Vannini (tvannini@janox.it)
 */


/**
 * Run PHP script and return response text
 *
 * @param  $cmd PHP parameters to pass to PHP-binary (script name)
 * @return array
 */
function exe($cmd) {

    $res = array();
    exec(PHP_BINARY.' '.$cmd, $res);
    return $res;

    }


/**
 * Run PHP script and return response text
 *
 * @param  $cmd PHP parameters to pass to PHP-binary (script name)
 * @return array
 */
function srvstart() {

    return exe(__DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'jxserver.php');

    }


function srvstop() {

    return exe(__DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'jxserver.php stop');

    }


function show(string $url) {

    switch ( PHP_OS ) {
        // _______________________________________________________________________ Mac ___
        case 'Darwin':
            $command = 'open';
            // $redirect_output = '2>/dev/null';
            break;
        //____________________________________________________________________ Windows ___
        case 'WINNT':
            /**
             * NOTE: Double quotes are required, as the first parameter of "start" is the
             * title, which we leave empty.
             */
            $command = 'start ""';
            // $redirect_output = '2> nul';
            break;
        // ___________________________________________________ Linux (mostly portable) ___
        default:
            $command = 'xdg-open';
            // $redirect_output = '2>/dev/null';
        }
    @exec($command.' '.$url);

    }


srvstart();

if ($_SERVER['argc'] > 1) {
    show('http://localhost:8333/jxstudio/jxstudio.php?user='.$_SERVER['argv'][1]);
    }
else {
    show('http://localhost:8333/jxstudio/index.html');
    }

//srvstop();

?>