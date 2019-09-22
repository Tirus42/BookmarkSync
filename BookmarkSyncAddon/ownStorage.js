var LocalBookmarkStorageRoot = null;
var LocalBookmarkStorageMap = new Map();

function StorageBookmarkAdd(id, info) {
	let node = new Object();
	node.id = id;
	node.type = info.type;
	node.title = info.title;

	if (info.url)
		node.url = info.url;

	LocalBookmarkStorageMap.set(id, node);
}

function StorageBookmarkChange(id, info) {
	let node = StorageBookmarkGet(id);

	if (info.title)
		node.title = info.title;

	if (info.url)
		node.url = info.url;
}

function StorageBookmarkRemove(id, info) {
	LocalBookmarkStorageMap.delete(id);
}

function StorageBookmarkGet(id) {
	return LocalBookmarkStorageMap.get(id);
}
