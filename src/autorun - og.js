// get user defined cleanup level
var cLevel = null;
var CULhits = null;
var CULclean = null;
var culOldUrl = false;


function log(str, type="log") {
	str = "CleanUp Linkedin: "+str;
	console.log(str);
};

chrome.storage.sync.get("clean", ({ clean }) => {
	CULclean = clean;
	log("Clean ");
	info(CULclean);
});
chrome.storage.sync.get("hits",  ({ hits  }) => {
	CULhits = (hits || 0);
	log("Hits");
	info(CULhits);
})





log("level check 28");



// Listen to changes to chrome storage and update window if mismatched =====
var culLevel = null;
chrome.storage.onChanged.addListener(function (changes, namespace) {
	
	let change = false;

	if (changes.level != undefined) {
		if (changes.level.newValue != culLevel) {
			log("Level has changed and is different");
			alert("CleanUp Level changed");
		} else {
			log("Level has changed and matches");
		};
	};
	culLevel = changes.level;
});



log("level check 51");



// list of vars for blocking feed items (in the loop)
var blockads = null;
var blockjobs = null;
var blockaddfeed = null;
var blockevents = null;
var blockfreshpps = null;
var blocksavedcourse = null;

// list of vars for blocking static items
var blockhiring = null;
var blockstartpost = null;
var blocklinews = null;
var blocktrypremium = null;

var blockall = null;
var reminder = null;


log("level check 73");

// set up the vars according to the user settings
chrome.storage.sync.get("level", ({ level }) => {
	cLevel = level;
	
	log("level check 79");
	
	
	if (cLevel == "custom" || cLevel == null) {
														
		chrome.storage.sync.get("block_ads", ({ block_ads }) => { blockads = block_ads; });
		chrome.storage.sync.get("block_jobs", ({ block_jobs }) => { blockjobs = block_jobs; });
		chrome.storage.sync.get("block_addfeed", ({ block_addfeed }) => { blockaddfeed = block_addfeed; });
		chrome.storage.sync.get("block_events", ({ block_events }) => { blockevents = block_events; });
		chrome.storage.sync.get("block_freshpps", ({ block_freshpps }) => { blockfreshpps = block_freshpps; });
		
		chrome.storage.sync.get("block_hiring", ({ block_hiring }) => { blockhiring = block_hiring; });
		chrome.storage.sync.get("block_startpost", ({ block_startpost }) => { blockstartpost = block_startpost; });
		
		chrome.storage.sync.get("block_all", ({ block_all }) => { blockall = block_all; });

		chrome.storage.sync.get("feed_reminder", ({ feed_reminder }) => { reminder = feed_reminder; });
	} else if (cLevel == "basic") {
		blockads = true;
		blockjobs = false;
		blockaddfeed = true;
		blockevents = false;
		blockfreshpps = false;
		blocksavedcourse = false;

		blockhiring = true;
		blockstartpost = false;
		blocklinews = false;
		blocktrypremium = false;

		blockall = false;
		reminder = true;
	} else if (cLevel == "extreme") {
		blockads = true;
		blockjobs = true;
		blockaddfeed = true;
		blockevents = true;
		blockfreshpps = true;
		blocksavedcourse = true;

		blockhiring = true;
		blockstartpost = true;
		blocklinews = true;
		blocktrypremium = true;

		blockall = false;
		reminder = true;
	} else if (cLevel == "space") {
		blockads = true;
		blockjobs = true;
		blockaddfeed = true;
		blockevents = true;
		blockfreshpps = true;
		blocksavedcourse = true;

		blockhiring = true;
		blockstartpost = false;
		blocklinews = true;
		blocktrypremium = true;

		blockall = true;
		reminder = false;
	}
	
	//log("CleanUp LinkedIn starting now2...")
	//console.info(blockads)
	
	
});


log("level check 147");

console.log("CleanUp LinkedIn starting now...")
// console.info(blockads)


// var valuesdump = [cLevel, blockads, blockjobs, blockaddfeed, blockevents, blockfreshpps, blockhiring, blockstartpost, blockall, reminder];
// console.info(valuesdump)



chrome.storage.sync.get("level", ({ level }) => {
	log("Check is enabled");
	console.info(level);
	if (level) {
		
		log("Enabled, running CUL");
		
		// Beta - check for changes in DOM tree rather then fire on scrolling - https://stackoverflow.com/questions/2844565/is-there-a-javascript-jquery-dom-change-listener

		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		var observer = new MutationObserver(function(mutations, observer) {
			// fired when a mutation occurs
			// log(mutations, observer);
			log("CleanUp LinkedIn: DOM mutated, checking for unwanted items.")
			cleanUpByUrl();
			// ...
		});

		// define what element should be observed by the observer
		// and what types of mutations trigger the callback
		observer.observe(document, {
		  subtree: true,
		  attributes: true
		  //...
		});


		if (blockall) {
			let main = document.getElementById("main");
			main.children[1].style.display = "none";
			main.children[2].style.display = "none";
			window.addEventListener("scroll", function(e) {
					main.children[1].style.display = "none";
					main.children[2].style.display = "none";
			});
			window.addEventListener("load", function(e) {
					main.children[1].style.display = "none";
					main.children[2].style.display = "none";
			});
			window.addEventListener("onload", function(e) {
					main.children[1].style.display = "none";
					main.children[2].style.display = "none";
			});
			
		} else {
			window.addEventListener("scroll", clearAds);
		};
		
		if (blockfreshpps) {
			blockfreshperspectives();
			window.addEventListener("load", blockfreshperspectives);
		};
		if (blockstartpost) {
			window.addEventListener("load", blockstartnewpost);
		};
	};

});


log("level check 222");


function cleanUpByUrl() {
	
	log("starting clean by url fctn");
	cleanAllPages();
	
	let culNewUrl = window.location.href;
	
	if (culNewUrl == "https://www.linkedin.com/feed/") {
		cleanPageFeed ();
	};
	
};


log("level check 239");

// function to clear static elements across all pages

function cleanAllPages() {
	
};


log("level check 248");


// function to clear elements on only feed page

function cleanPageFeed () {
	
	feedReminder();
	
	let CULhitsOld = CULhits;
	
	// log("CleanUp LinkedIn: Analysing new posts and removing if not wanted")
	var valuesdump = [cLevel, blockads, blockjobs, blockaddfeed, blockevents, blockfreshpps, blockhiring, blockstartpost, blockall, reminder];
	console.info(valuesdump)

	//if (cLevel == null || reminder == null) {
	if (cLevel == null ) {
		log("CleanUp Linkedin: Exiting as Chrome Storage not ready yet")
		return
	};
	
	if (reminder == null ) {
		log("CleanUp Linkedin: Exiting as Chrome Storage not ready yet")
		return
	};
	
	if (blockfreshpps) {
		blockfreshperspectives();
		window.addEventListener("load", blockfreshperspectives);
	};
	if (blockstartpost) {
		window.addEventListener("load", blockstartnewpost);
	};
	
	// ==================================================================
	// Setup
	// define a bunch of standard variables and suchlike
	let main = document.getElementById("main");
	let posts = main.getElementsByClassName("scaffold-finite-scroll__content")[0] // list of post elements which makes up the feed
	// console.info(posts.children[0])
	
	// ==================================================================
	// FEED REMINDER
	// run the reminder function - this adds in a reminder if conditions are met
	var url = window.location.href;
	var q = "/feed/";
	var remEl = document.getElementById("cleanUp_LinkedIn_feed_reminder_wrapper");
	if (reminder && url.search(q) > 0 && remEl != null) {
		let reminderEl = '<div id="cleanUp_LinkedIn_feed_reminder_wrapper" class="launchpad-v2 artdeco-card mb2" style="border-radius: 10px; padding: 15px; background-color: white; margin: 0 0 10px;"><img src="chrome-extension://nnnfnopmhgdpnnlbpnjkplimibbihdop/assets/logo128.png" style="height: 24px; width:24px; margin:0 5px; float:left; object-fit:contain;">Enjoy your uncluttered feed, courtesy of CleanUp LinkedIn!</div>';
	
		// main.children[0].insertAdjacentHTML('afterbegin', reminderEl);
		main.insertAdjacentHTML('afterbegin', reminderEl);
	};
	
	
	// ==================================================================
	// try and remove "are you hiring" at top of feed
	// let allText = post.textContent.replace(/\s/g,'')
	
	
	
	
	// ==================================================================
	// TRY PREMIUM REMOVE
	// remove the ad to try premium
	
	var sidebarleft = document.querySelector('.scaffold-layout__sidebar')
	
	if (blocktrypremium) {
		// log("try premium")
		
		// console.info(sidebarleft)
		if (sidebarleft.children[0].children[2]) {
			
			let textTest = sidebarleft.children[0].children[2].textContent.trim()
			
			if (textTest.search("Premium") >= 0) {
				let premSB = sidebarleft.children[0].children[2]
				log(premSB)
				let myItems = sidebarleft.children[0].children[3]
				log(myItems)
				
				let savedItems = myItems.cloneNode(true)
				savedItems.children[0].textContent = "Saved Posts"
				savedItems.href = "/my-items/saved-posts/"
				
				let myLearning = myItems.cloneNode(true)
				myLearning.children[0].textContent = "My Learning"
				myLearning.href = "/my-items/learning/"
				
				myItems.after(savedItems, myLearning)
				
				// console.info(premSB)
				premSB.remove()
				console.log("Removed Try Premium ad on sidebar")
			}
		}
	};
	
	// ==================================================================
	// POST LOOP
	// loop through posts and remove if they're a blocked element
	
	// log("return post")
	if (!posts) {
		log("CleanUp LinkedIn: Exiting as posts element not ready yet")
		return
	};
	// log("return postss")
	// let allLiAds = document.getElementsByClassName("feed-shared-update-v2");
	// for (var i = 0; i < allLiAds.length; i++) {
	for (var i = 0; i < posts.children.length; i++) {
		
		let post = posts.children[i];
		// console.info(post)
		
		if (blockall) {
			post.remove()
			continue;
		};
		
		let allText = post.textContent.replace(/\s/g,'')
				
		// if post has already been evaluated, or there is no text, skip this post
		if (allText == "" || post.classList.contains("evaluated_by_CleanUp_LinkedIn")) {
			continue;
		} else {
			post.classList.add("evaluated_by_CleanUp_LinkedIn")
		};
		
		log("CleanUp LinkedIn: CleanUp LinkedIn is analysing the following post")
		console.info(post)
		
		allText = post.textContent.replace(/\s/g,' ')
		let textList = allText.replace(/\s{2,}/g,'[|]')
		textList = textList.split('[|]')
		
		console.info(textList)

		if (! Array.isArray(textList)) {
			continue;
		}
		
		// Remove posts that are "Promoted"
		if (blockads && textList.includes('Promoted')) {
			post.remove()
			CULhits++;
			log("CleanUp LinkedIn: removed a post")
		} else {
			// log("ad blocking turned off");
		};
		
		// Remove posts that are "Start your saved course"
		if (blocksavedcourse && textList.includes('Start your saved course')) {
			post.remove()
			CULhits++;
			log("CleanUp LinkedIn: removed a post")
		} else {
			// log("ad blocking turned off");
		};
		
		// Remove posts that are "Jobs recommended for you"
		if (blockjobs && textList.includes('Jobs recommended for you')) {
			post.remove()
			CULhits++;
			log("CleanUp LinkedIn: removed a post")
		} else {
			// log("ad blocking turned off");
		};
		
		// Remove posts that are "Recommended for you"
		if (blockaddfeed && textList.includes('Recommended for you')) {
			post.remove()
			CULhits++;
			console.log("CleanUp LinkedIn: removed a post")
		} else {
			// console.log("ad blocking turned off");
		};
		
		// Remove posts that are "Events recommended for you"
		if (blockevents && textList.includes('Events recommended for you')) {
			post.remove();
			CULhits++;
			log("CleanUp LinkedIn: removed a post");
		} else {
			// log("ad blocking turned off");
		};
		
		if (blockads && (
			textList.includes('LinkedIn Ads') ||
			textList.includes('Optimize for ad results') ||
			textList.includes('Unlock more insights') ||
			textList.includes('Try Lead Gen Forms') ||
			textList.includes('Attract more customers') ||
			textList.includes('Measure what matters') ||
			textList.includes('Nurture your audience') ||
			textList.includes('Sharpen your skills')
		)) {
			post.remove();
			CULhits++;
			log("CleanUp LinkedIn: removed a post");
		} else {
			// log("ad blocking turned off");
		};
		
		continue;
		
		// post.classList.remove("feed-shared-update-v2");
		// post.style.margin = "0 0 8px";
		// post.style.padding = "0";
	};
	
	
	if (blockhiring) {
		try {
			let postPromo3 = main.querySelector('.feed-shared-text-view'); 
			let postSub3 = postPromo3.textContent.trim();
			if (postSub3 == "Add to your feed") {
				post.style.display = "none";
				CULhits++;
				log("cleared an `Are you hiring` post");
			};
		} catch (error) {
			// log(error);
		};
	}
	/*
	if (blockstartpost) {
		/// alert(blockstartpost);
		try {
			let block = main.getElementsByClassName("share-box-feed-entry__closed-share-box")[0];
			console.info(block);
			block.style.display = "none";
			//let postID7 = post.querySelector('.share-box-feed-entry__closed-share-box'); 
			//let postSub3 = postPromo3.textContent.trim();
			//if (postSub3 == "Add to your feed") {
			//	post.style.display = "none";
			//	log("cleared an `Start a new post` post");
			//};
		} catch (error) {
			log(error);
		};
	}*/
	
	if (CULhitsOld != CULhits) {
		let hits = CULhits;
		log("Setting hits as: "+hits);
		chrome.storage.sync.set({ hits });
	}
	
	
	
};


function feedReminder() {
	var url = window.location.href;
	var q = "/feed/";
	var remEl = document.getElementById("cleanUp_LinkedIn_feed_reminder_wrapper");
	if (reminder && url.search(q) > 0 && remEl != null) {
		let reminderEl = '<div id="cleanUp_LinkedIn_feed_reminder_wrapper" class="launchpad-v2 artdeco-card mb2" style="border-radius: 10px; padding: 15px; background-color: white; margin: 0 0 10px;"><img src="chrome-extension://nnnfnopmhgdpnnlbpnjkplimibbihdop/assets/logo128.png" style="height: 24px; width:24px; margin:0 5px; float:left; object-fit:contain;">Enjoy your uncluttered feed, courtesy of CleanUp LinkedIn!</div>';
		let main = document.getElementById("main");
	
		// main.children[0].insertAdjacentHTML('afterbegin', reminderEl);
		main.insertAdjacentHTML('afterbegin', reminderEl);
	};
	
	var newRemindParent = document.getElementById("feed-news-module");
	if (newRemindParent) {
		if (! newRemindParent.classList.contains("cleanup_linkedin_reminder_item")) {
			var newRemindEl = '<div style="padding:0 15px 10px;">'
				+'<h2 class="t-16">CleanUp LinkedIn</h2>'
				+'<span class="t-12 t-black--light t-normal">'
				+'CleanUp Linkedin is currently cleaning this page.  You can change '
				+'this by clicking on the extension icon or '
				+'<a class="t-12 t-black--light t-normal" style="cursor:pointer; text-decoration:underline;"'
				+' target="_blank" href="chrome-extension://inngggabfonncgogblefffnooohpopgm/options.html">on the options page here.'
				+'</a></span></div>';
		
			newRemindParent.insertAdjacentHTML('afterbegin', newRemindEl);
			newRemindParent.classList.add("cleanup_linkedin_reminder_item");
		};
	};
	
	log("Tried to add in the new reminder thingy");
	
}

function blockfreshperspectives() {
	var mainEl = document.getElementById("main");
	
	let freshEl = mainEl.getElementsByClassName("feed-welcome-back-feed");
	for (var i = 0; i < freshEl.length; i++) {
		
		let prefeed = freshEl.item(i);
		prefeed.style.display = "none";
	}
}

function blockstartnewpost() {
	try {
		let block = main.getElementsByClassName("share-box-feed-entry__closed-share-box")[0];
		console.info(block);
		block.style.display = "none";
	} catch (error) {
		log(error);
	};
}


// window.addEventListener("load", feedReminder);

