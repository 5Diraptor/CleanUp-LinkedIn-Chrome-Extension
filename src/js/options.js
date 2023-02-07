chrome.storage.sync.get("installed", ({ installed }) => {
	
	// Unless the popup is installed, don't run anything ===========================
	if (installed) { 
		
		console.log("CleanUp LinkedIn is installed and running")

		vers = chrome.runtime.getManifest().version;
		versEl = document.getElementById("versioning");
		
		console.info(vers)
		console.info(versEl)

		versEl.textContent = vers;


		var freshinstall = 0;


		chrome.storage.onChanged.addListener(function (changes, namespace) {
			window.location.href="options.html";
			for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
				console.log(
					`Storage key "${key}" in namespace "${namespace}" changed.`,
					`Old value was "${oldValue}", new value is "${newValue}".`
				);
				freshinstall++;
				if (freshinstall >8 ) { document.getElementById("loading").style.display = "none"; } ;
			}
		});



		function addOptionBox(parentid, checkboxid) {
			var parent = document.getElementById(parentid);
			let newInput = document.createElement('input');
			newInput.className = "fuseOptChk";
			newInput.id = checkboxid;
			newInput.type = "checkbox";
			parent.prepend(newInput);
		};



		chrome.storage.sync.get("enabled", ({ enabled }) => {
			addOptionBox("optEnable", "optChkEnable");
			let checkEl = document.getElementById("optChkEnable");
			checkEl.checked = enabled;
			checkEl.addEventListener("change", function() {
				let enabled = checkEl.checked;
				chrome.storage.sync.set({ enabled });
			});
		});




		/*
		
		chrome.storage.sync.get("block_all", ({ block_all }) => {
			addOptionBox("optLiEntire", "optChkblall");
			let checkEl = document.getElementById("optChkblall");
			checkEl.checked = block_all;
			checkEl.addEventListener("change", function() {
				let block_all = checkEl.checked;
				chrome.storage.sync.set({ block_all });
			});
		});

		chrome.storage.sync.get("block_ads", ({ block_ads }) => {
			addOptionBox("optLiPromo", "optChkblads");
			let checkEl = document.getElementById("optChkblads");
			checkEl.checked = block_ads;
			checkEl.addEventListener("change", function() {
				let block_ads = checkEl.checked;
				chrome.storage.sync.set({ block_ads });
			});
		});

		chrome.storage.sync.get("block_jobs", ({ block_jobs }) => {
			addOptionBox("optLiJobs", "optChkbljobs");
			let checkEl = document.getElementById("optChkbljobs");
			checkEl.checked = block_jobs;
			checkEl.addEventListener("change", function() {
				let block_jobs = checkEl.checked;
				chrome.storage.sync.set({ block_jobs });
			});
		});

		chrome.storage.sync.get("block_addfeed", ({ block_addfeed }) => {
			addOptionBox("optLiAddFeed", "optChkbladdfeed");
			let checkEl = document.getElementById("optChkbladdfeed");
			checkEl.checked = block_addfeed;
			checkEl.addEventListener("change", function() {
				let block_addfeed = checkEl.checked;
				chrome.storage.sync.set({ block_addfeed });
			});
		});

		chrome.storage.sync.get("block_events", ({ block_events }) => {
			addOptionBox("optLiEvents", "optChkblevents");
			let checkEl = document.getElementById("optChkblevents");
			checkEl.checked = block_events;
			checkEl.addEventListener("change", function() {
				let block_events = checkEl.checked;
				chrome.storage.sync.set({ block_events });
			});
		});


		chrome.storage.sync.get("block_freshpps", ({ block_freshpps }) => {
			addOptionBox("optLiFreshpp", "optChkblFreshpp");
			let checkEl = document.getElementById("optChkblFreshpp");
			checkEl.checked = block_freshpps;
			checkEl.addEventListener("change", function() {
				let block_freshpps = checkEl.checked;
				chrome.storage.sync.set({ block_freshpps });
			});
		});


		chrome.storage.sync.get("block_hiring", ({ block_hiring }) => {
			addOptionBox("optLiHiring", "optChkblHiring");
			let checkEl = document.getElementById("optChkblHiring");
			checkEl.checked = block_hiring;
			checkEl.addEventListener("change", function() {
				let block_hiring = checkEl.checked;
				chrome.storage.sync.set({ block_hiring });
			});
		});


		chrome.storage.sync.get("block_startpost", ({ block_startpost }) => {
			addOptionBox("optLiStartPost", "optChkblStartpost");
			let checkEl = document.getElementById("optChkblStartpost");
			checkEl.checked = block_startpost;
			checkEl.addEventListener("change", function() {
				let block_startpost = checkEl.checked;
				chrome.storage.sync.set({ block_startpost });
			});
		});




		chrome.storage.sync.get("feed_reminder", ({ feed_reminder }) => {
			addOptionBox("optLiAlert", "optChkfeedreminder");
			let checkEl = document.getElementById("optChkfeedreminder");
			checkEl.checked = feed_reminder;
			checkEl.addEventListener("change", function() {
				let feed_reminder = checkEl.checked;
				chrome.storage.sync.set({ feed_reminder });
			});
		});
		
		*/




		chrome.storage.sync.get("level", ({ level }) => {
			if (level != undefined) {
				document.getElementById("optLevel_"+level).checked = true;
			}
			
			let radios = document.querySelectorAll('.fuseOptRdo')
			for (var radio of radios) {
				radio.onclick = (e) => {
					let level = e.target.value;
					optLevel = level;
					chrome.storage.sync.set({ level });
				}
			}
		});



		setTimeout(function() {
			var chassis = document.getElementById('chassis');
			var chassisH = chassis.clientHeight;
			chassis.setAttribute("style", 'height: ' + chassisH + 'px');
		} , 100);







		// Script for adding the current version to the html popup ================
		
		vers = chrome.runtime.getManifest().version;
		versEl = document.getElementById("versioning");
		versEl.textContent = vers;

		// =========================================================================
		
		
		
		// Script for showing and hiding the help text popups ====================
		
		var helpTriggers = document.getElementsByClassName("helpTextTrigger");
		var helpTexts = document.getElementsByClassName("helpText");
		
		for (let i=0; i < helpTriggers.length; i++) {
			helpTriggers[i].addEventListener("mouseover", function() {
				helpTexts[i].style.display = "block";
			});
			helpTriggers[i].addEventListener("mouseout", function() {
				helpTexts[i].style.display = "none";
			});
		}
		
		// =========================================================================
		
		
	}
});






