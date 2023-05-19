
//=================================================================================================
// Developer stuff here: deactivate in live.
//=================================================================================================


// add a log function unique to this plugin
function log(str, type="log") {
	str = "CleanUp Linkedin: "+str;
	console.log(str);
};
function info(obj, type="log") {
	console.log("CleanUp Linkedin object");
	console.info(obj);
};


// loop through everything in chrome storage and plump it in console for review
/*
console.log("CleanUp LinkedIn beta starting ");


async function enumStorage() {
  const all = await chrome.storage.sync.get();
  for (const [key, val] of Object.entries(all)) {
    // do something
	log("storage data: ");
	info(key);
	info(val);
	
  }
}

enumStorage();
*/




//=================================================================================================
// Load the chrome storage details that we require
//=================================================================================================

var CULhits = false;
var CULclean = false;

// get a chrome storage variable that contains all cleaning data
chrome.storage.sync.get("clean", ({ clean }) => {
	CULclean = clean;
	log("Clean ");
	info(CULclean);
});
// get a chrome storage variable that contains number of hits
chrome.storage.sync.get("hits",  ({ hits  }) => {
	CULhits = (hits || 0);
	log("Hits");
	info(CULhits);
})





//=================================================================================================
// Run the CleanUp functions whenever the DOM Tree mutates.
//=================================================================================================

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





//=================================================================================================
// When DOM changes, we run cleanUpByUrl function, this changes cleanup rules depending on the url
//=================================================================================================


function cleanUpByUrl() {
	if (CULhits !== false && CULclean !== false) { // only run CleanUp functions if the Chrome storage variables have been loaded
		
		log("starting clean by url fctn");
		
		let culNewUrl = window.location.href;
		
		if (culNewUrl == "https://www.linkedin.com/feed/") {
			cleanPageFeed ();
		};
	} else {
		log("Chrome variables aren't loaded yet, can't run CUL")
	};
	
};


//=================================================================================================
// List of possible cleanup functions available depending on which page is loaded
//=================================================================================================


function cleanPageFeed() {
	
	// ==================================================================
	// Setup - need to positively identify certain elements
	
		
	// get the element that holds list of posts
	var postsParent = document.getElementsByClassName("scaffold-finite-scroll__content")[0] // list of post elements which makes up the feed
	// get the element that wraps the left column
	var leftCol = document.getElementsByClassName("scaffold-layout__sidebar")[0];
	// get the element that wraps the main column
	var mainCol = document.getElementsByClassName("scaffold-layout__main")[0];
	// get the element that wraps the right column
	var rghtCol = document.getElementsByClassName("scaffold-layout__aside")[0];
	
	/* info(main)
	info(postsParent)
	info(leftCol)
	info(mainCol)
	info(rghtCol)*/
	
	var remEl = document.getElementById("cleanUp_LinkedIn_feed_reminder_wrapper");
	if (remEl == null) {
		let reminderEl = '<div id="cleanUp_LinkedIn_feed_reminder_wrapper" class="launchpad-v2 artdeco-card mb2" style="border-radius: 10px; padding: 15px; background-color: white; margin: 0 0 10px;"><img src="chrome-extension://nnnfnopmhgdpnnlbpnjkplimibbihdop/assets/logo128.png" style="height: 24px; width:24px; margin:0 5px; float:left; object-fit:contain;">Enjoy your uncluttered feed, courtesy of CleanUp LinkedIn!</div>';
		
		rghtCol.insertAdjacentHTML('beforeend', reminderEl);
	};
	
	
	if (postsParent) {
		for (var i = 0; i < postsParent.children.length; i++) {
			let post = postsParent.children[i];
			info(post)
			
			
			
			let allText = post.textContent.replace(/\s/g,'')
			
			
				
			// if post has already been evaluated, or there is no text, skip this post
			if (allText == "" || post.classList.contains("evaluated_by_CleanUp_LinkedIn")) {
				continue;
			} else {
				post.classList.add("evaluated_by_CleanUp_LinkedIn")
			};
			
			allText = post.textContent.replace(/\s/g,' ')
			let textList = allText.replace(/\s{2,}/g,'[|]')
			textList = textList.split('[|]')
			
			log("This posts allText is:");
			info(textList)
			
		};
	};
};