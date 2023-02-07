// check if this is a fresh install and setup with defaults if so
// also checks for missing chrome storage variables and sets them up if not available



function installVars() {
	
	/*
	// default values on first install
	let level = "basic";
	let hits = 0;
	let clean = {};
		clean.level = "basic";
		clean.item = {};
			clean.item.ads = true;
			clean.item.jobs = true;
			clean.item.events = true;
		clean.custom = {};
	let cleanDefault = clean;
	
	// deprecated chrome vars, remain for backwards compatibility
	let enabled = true;
	let feed_reminder = true;
	

	// default custom in-feed values for first install
	let block_ads = true;
	let block_jobs = false;
	let block_addfeed = false;
	let block_events = false;
	let block_freshpps = false;
	
	// default custom out of feed values for first install
	let block_all = false;
	let block_hiring = true;

	chrome.storage.sync.get("installed", ({ installed }) => {
		if (!installed) {
			
			let installed = true;
			chrome.storage.sync.set({ installed });
			
			// deprecated vars below, in future clean will be an object to hold all custom data
			chrome.storage.sync.set({ enabled });
			chrome.storage.sync.set({ feed_reminder });
			
			chrome.storage.sync.set({ block_ads });
			chrome.storage.sync.set({ block_jobs });
			chrome.storage.sync.set({ block_addfeed });
			chrome.storage.sync.set({ block_events });
			chrome.storage.sync.set({ block_freshpps });
			
			chrome.storage.sync.set({ block_all });
			chrome.storage.sync.set({ block_hiring });
			
			setTimeout(
				() => {window.location.href="popup.html"},
				1000
			);
			
		} else {
			chrome.storage.sync.get("level", ({ level }) => {
				if (!level) {
					level = "custom";
					chrome.storage.sync.set({ level });
				};
			});
			let loadEl = document.getElementById("loading")
			loadEl.style.display = "none"
		}
	});
	*/
	
	var countVars = 0;
	
	chrome.storage.sync.get("installed", ({ installed }) => {
		if (!installed) {
			let installed = true;
			chrome.storage.sync.set({ installed });
		};
		countVars++;
		removeLoading(countVars);
	});
	chrome.storage.sync.get("level", ({ level }) => {
		if (!level) {
			let level = "basic";
			chrome.storage.sync.set({ level });
		};
		countVars++;
		removeLoading(countVars);
	});
	chrome.storage.sync.get("hits", ({ hits }) => {
		if (!hits) {
			let hits = 0;
			chrome.storage.sync.set({ hits });
		};
		countVars++;
		removeLoading(countVars);
	});
	chrome.storage.sync.get("clean", ({ clean }) => {
		if (!clean) {
			let clean = {
				level: "basic",
				item: {
					ads: true,
					jobs: true,
					events: true
				},
				custom: {}
			}
			chrome.storage.sync.set({ clean });
		};
		countVars++;
		removeLoading(countVars);
	});
}

function removeLoading(i) {
	if (i > 2) {
		let loadEl = document.getElementById("loading");
		loadEl.style.display = "none";
	};
};

installVars();




