

let enabled = true;
let block_ads = true;
let block_jobs = false;
let block_addfeed = false;
let block_events = false;
var block_freshpps = false;
var block_hiring = false;
var block_startpost = false;

var block_all = false;

let feed_reminder = true;


chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.get("enabled", ({ enabled }) => {
		if (enabled == "undefined") {
			
			chrome.storage.sync.set({ enabled });
			chrome.storage.sync.set({ block_all });
			
			chrome.storage.sync.set({ block_ads });
			chrome.storage.sync.set({ block_jobs });
			chrome.storage.sync.set({ block_addfeed });
			chrome.storage.sync.set({ block_events });
			chrome.storage.sync.set({ block_freshpps });
			
			chrome.storage.sync.set({ block_hiring });
			chrome.storage.sync.set({ block_startpost });
	
			chrome.storage.sync.set({ feed_reminder });
			
		}
	});
});


