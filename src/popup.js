var freshinstall = 0;

function installVars() {

	let installed = true;
	let enabled = true;

	let block_ads = true;
	let block_jobs = true;
	let block_addfeed = true;
	let block_events = true;
	let block_freshpps = false;

	let block_all = false;

	let feed_reminder = true;
	
	let loadEl = document.getElementById("loading")

	chrome.storage.sync.get("installed", ({ installed }) => {
		if (!installed) {
			chrome.storage.sync.set({ enabled });
			chrome.storage.sync.set({ block_all });
			
			chrome.storage.sync.set({ block_ads });
			chrome.storage.sync.set({ block_jobs });
			chrome.storage.sync.set({ block_addfeed });
			chrome.storage.sync.set({ block_events });
			chrome.storage.sync.set({ block_freshpps });
	
			chrome.storage.sync.set({ feed_reminder });
		} else {
			loadEl.style.display = "none"
		}
	});
	
	chrome.storage.sync.set({ installed });
}
installVars();


chrome.storage.onChanged.addListener(function (changes, namespace) {
	window.location.href="popup.html";
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
	parent.appendChild(newInput);
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



var tabsetting = document.getElementById("ch-tab-s");
var tabhelp = document.getElementById("ch-tab-a");
var tababout = document.getElementById("ch-tab-h");

var sectsetting = document.getElementById("chassis-s");
var secthelp = document.getElementById("chassis-a");
var sectabout = document.getElementById("chassis-h");

function clearTabs () {
	tabsetting.classList.remove("activetab");
	tabhelp.classList.remove("activetab");
	tababout.classList.remove("activetab");
	
	sectsetting.style.display = "none";
	secthelp.style.display = "none";
	sectabout.style.display = "none";
}

tabsetting.addEventListener("click", function(evt) {
	clearTabs();
	this.classList.add("activetab");
	sectsetting.style.display = "block";
});

tabhelp.addEventListener("click", function(evt) {
	clearTabs();
	this.classList.add("activetab");
	secthelp.style.display = "block";
});

tababout.addEventListener("click", function(evt) {
	clearTabs();
	this.classList.add("activetab");
	sectabout.style.display = "block";
});

tabsetting.click();


vers = chrome.runtime.getManifest().version;
versEl = document.getElementById("versioning");

versEl.textContent = vers;



setTimeout(function() {
	var chassis = document.getElementById('chassis');
	var chassisH = chassis.clientHeight;
	chassis.setAttribute("style", 'height: ' + chassisH + 'px');
} , 100);















