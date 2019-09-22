serverHost = "10.1.0.3"
serverUrl = "BookmarkSync/"



function GetURL() {
	return "http://" + serverHost + "/" + serverUrl;
}

function SubmitChangeset(action, jsObject) {
	let jsonData = JSON.stringify(jsObject)

	let xhttp = new XMLHttpRequest();

	xhttp.open("POST", GetURL() + "?action=" + action, true);
	xhttp.send(jsonData);
}

function onBookmarkAdd(id, info) {
	console.log("Added bookmark")

	console.log("id: " + id);
	console.log("Info: " + info);
	console.log(info);

	var data = new Object();
	data.title = info.title;
	data.dateAdded = info.dateAdded;
	data.type = info.type;
	data.url = info.url;

	SubmitChangeset("add", data);

	//browser.bookmarks.update(id, {syncId: "42"});

	StorageBookmarkAdd(id, info);
}

function onBookmarkRemove(id, info) {
	console.log("Removed bookmark " + id);
	console.log(info);

	let node = StorageBookmarkGet(id);

	let data = new Object();
	data.title = node.title;
	data.type = node.type;
	data.url = node.url;

	SubmitChangeset("remove", data)

	StorageBookmarkRemove(id, info);
}

function onBookmarkMoved(id, info) {
	console.log("Moved");
	console.log(info);

	StorageBookmarkChange(id, info);
}

function onBookmarkChanged(id, info) {
	console.log("Changed id: " + id);
	console.log(info);

	let node = StorageBookmarkGet(id);

	let data = new Object();

	if (info.title) {
		data.oldTitle = node.title;
		data.newTitle = info.title;
	}

	if (info.url) {
		data.oldUrl = node.url;
		data.newUrl = info.url;
	}

	SubmitChangeset("update", data);

	StorageBookmarkChange(id, info);
}

// ===============
// == Init code ==
// ===============

function Init() {
	// Set bookmark event callbacks
	browser.bookmarks.onCreated.addListener(onBookmarkAdd);
	browser.bookmarks.onRemoved.addListener(onBookmarkRemove);
	browser.bookmarks.onMoved.addListener(onBookmarkMoved);
	browser.bookmarks.onChanged.addListener(onBookmarkChanged);

	// Read bookmarks in own storage
	function ReadTreeIntoOwnStorage() {
		function WalkTree(item, depth, parentObject) {
			let node = new Object();

			node.id = item.id;
			node.title = item.title;

			if (item.url) {
				node.url = item.url;
			}

			StorageBookmarkAdd(item.id, item);

			//console.log("Title: " + item.title + "; id: " + item.id);

			if (item.children) {
				node.children = new Map();
				for (child of item.children) {
					let childNode = WalkTree(child, depth + 1, node);
					node.children.set(child.id, childNode);
				}
			}

			return node;
		}

		function WalkTreeRoot(item) {
			LocalBookmarkStorageRoot = WalkTree(item[0], 0, LocalBookmarkStorageRoot);

			console.log(LocalBookmarkStorageRoot);
			console.log(LocalBookmarkStorageMap);
		}

		function onError(error) {
			console.log("Bookmark retrieve error: " + error);
		}

		browser.bookmarks.getTree().then(WalkTreeRoot, onError);
	};

	ReadTreeIntoOwnStorage();
}

Init();

console.log("Init complete");

