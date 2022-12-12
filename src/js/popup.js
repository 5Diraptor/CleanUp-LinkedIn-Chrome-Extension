chrome.storage.sync.get("installed", ({ installed }) => {
	
	// Unless the popup is installed, don't run anything ===========================
	if (installed) { 
		
		// Set up a bunch of standard variables ====================================
		
		var freshinstall = 0,
			optEnabled,
			optLevel;
			
		const loadEl = document.getElementById("loading")

		// =========================================================================
		
		
		
		// Update standard variables from chrome storage ===========================
		
		chrome.storage.sync.get("enabled", ({ enabled }) => { optEnabled = enabled; });
		chrome.storage.sync.get("level", ({ level }) => { optLevel = level; });


		
		// =========================================================================

			
		/*
			// default values on first install
			let enabled = true;
			let feed_reminder = true;
			let level = "basic";

			// default custom in-feed values for first install
			let block_ads = true;
			let block_jobs = false;
			let block_addfeed = false;
			let block_events = false;
			let block_freshpps = false;
			
			// default custom out of feed values for first install
			let block_all = false;
			let block_hiring = true;
		*/


		// =========================================================================
		
		
		
		// Listen to changes to chrome storage and update window if don't match ====
		
		chrome.storage.onChanged.addListener(function (changes, namespace) {
			
			let change = false;
			//console.info(changes);
			
			if (changes.enabled != undefined) { 
				if (changes.enabled.newValue != optEnabled) {
					console.log("Level has changed and is different");
				} else {
					console.log("Level has changed and matches");
					change = true;
				};
			};
			
			if (changes.level != undefined) {
				if (changes.level.newValue != optLevel) {
					console.log("Level has changed and is different");
				} else {
					console.log("Level has changed and matches");
					change = true;
				};
			};
			
			for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
				/* console.log(
					`Storage key "${key}" in namespace "${namespace}" changed.`,
					`Old value was "${oldValue}", new value is "${newValue}".`
				); */
				// console.log("key:"+key+" ns: "+namespace+" ov: "+oldValue+" nv: "+newValue);
				freshinstall++;
				if (freshinstall >8 ) { document.getElementById("loading").style.display = "none"; } ;
			}
			
			if (change) {
				window.location.href="popup.html";
			};
		});
		
		
		// =========================================================================
		
		
		
		// Add option boxes onces the chrome storgae var has loaded ================

		function addOptionBox(parentid, checkboxid) {
			var parent = document.getElementById(parentid);
			let newInput = document.createElement('input');
			newInput.className = "fuseOptChk";
			newInput.id = checkboxid;
			newInput.type = "checkbox";
			//parent.appendChild(newInput);
			//parent.insertBefore(newInput, parent.firstChild);
			parent.prepend(newInput);
		};



		chrome.storage.sync.get("enabled", ({ enabled }) => {
			addOptionBox("optEnable", "optChkEnable");
			let checkEl = document.getElementById("optChkEnable");
			checkEl.checked = enabled;
			checkEl.addEventListener("change", function() {
				let enabled = checkEl.checked;
				optEnabled = enabled;
				chrome.storage.sync.set({ enabled });
			});
		});

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

		// =========================================================================
		
		

		// Script for switching tabs on the html popup =============================
		
		var tabsetting = document.getElementById("ch-tab-s");
		var tabhelp = document.getElementById("ch-tab-h");

		var sectsetting = document.getElementById("chassis-s");
		var secthelp = document.getElementById("chassis-h");

		function clearTabs () {
			console.log("Unswitching tabs");
			tabsetting.classList.remove("activetab");
			tabhelp.classList.remove("activetab");
			
			sectsetting.style.display = "none";
			secthelp.style.display = "none";
		}

		tabsetting.addEventListener("click", function(evt) {
			clearTabs();
			this.classList.add("activetab");
			sectsetting.style.display = "block";
			console.log("Switching to the Settings tab");
		});

		tabhelp.addEventListener("click", function(evt) {
			clearTabs();
			this.classList.add("activetab");
			secthelp.style.display = "block";
			console.log("Switching to the Help tab");
		});

		tabsetting.click();
		
		// =========================================================================
		
		
		
		// Script for adding the current version to the html popup ================
		
		vers = chrome.runtime.getManifest().version;
		versEl = document.getElementById("versioning");
		versEl.textContent = vers;

		// =========================================================================
		
		
		
		// Script for correcting the html popup height ============================
		
		setTimeout(function() {
			var chassis = document.getElementById('chassis');
			var chassisH = chassis.clientHeight;
			chassis.setAttribute("style", 'height: ' + chassisH + 'px');
		} , 100);

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



