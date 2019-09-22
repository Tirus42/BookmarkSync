<?php

header("Access-Control-Allow-Origin: *");

if (!isset($_GET["action"]))
	die("Missing variable");

$action = $_GET["action"];
$since = isset($_GET["since"]) ? $_GET["since"] : 0;

include "database.php";


if ($action === "list") {
	header('Content-Type: application/json');

	ListChangeEntries($since);

	exit(0);
} else {
	$changeJsonString = file_get_contents('php://input');

	AddChangeEntry($action, $changeJsonString);
}


function ListChangeEntries($since) {
	$db = DBConnect();

	$result = DBGetChanges($db, $since);

	echo json_encode($result);
	foreach ($result as $change) {
	}
}

function AddChangeEntry($action, $changeJsonString) {
	$changeJson = json_decode($changeJsonString);

	switch ($action) {
		case 'add': {
			if (!CheckJsonKeys($changeJson, array("title", "dateAdded", "type", "url")))
				return false;
			break;
		}
		case 'update': {
			if (!CheckJsonKeys($changeJson, array("oldTitle", "newTitle", "oldUrl", "newUrl")))
				return false;
			break;
		}
		case 'remove': {
			if (!CheckJsonKeys($changeJson, array("title", "type")))
				return false;
			break;
		}
		case 'move': {
			//if (!CheckJsonKeys($changeJson, array("")))
			break;
		}

		default:
			return false;
	}

	$db = DBConnect();
	DBAddChange($db, $action, $changeJsonString);
}

function CheckJsonKeys($jsonObject, $allowedKeyList) {
	return true;	// TODO
}

?>
