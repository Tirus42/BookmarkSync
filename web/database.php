<?php

function DBConnect() {
	$host = "127.1";
	$port = 5432;
	$user = "bookmarksync";
	$password = "123123";
	$database = "BookmarkSync";

	return pg_connect("host=$host port=$port user=$user password=$password dbname=$database options='--application_name=BookmarkSyncServer'");
}

function DBAddChange($db, $type, $changeset) {
	$result = pg_query_params($db,
		'INSERT INTO changeset (id, commitdate, changetype, change) VALUES
			(nextval(\'seq_changeset\'), current_timestamp, $1, $2)',

		array($type, $changeset));
}

function DBGetChanges($db, $since) {
	$query = pg_query($db, 'SELECT commitdate, changetype, change FROM changeset');

	/*
	$query = pg_query_params($db,
		'SELECT commitdate, changetype, change FROM changeset WHERE commitdate > $1',
		array($since)
	);
	*/

	$result = array();

	while ($row = pg_fetch_row($query)) {
		$obj = new stdClass;

		$obj->commitdate = $row[0];
		$obj->changetype = $row[1];
		$obj->change = $row[2];

		array_push($result, $obj);
	}

	return $result;
}

?>
