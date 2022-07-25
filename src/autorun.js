var blockads = null;
var blockjobs = null;
var blockaddfeed = null;
var blockevents = null;
var blockfreshpps = null;

var blockall = null;
var reminder = null;



chrome.storage.sync.get("block_ads", ({ block_ads }) => {
	blockads = block_ads;
});

chrome.storage.sync.get("block_jobs", ({ block_jobs }) => {
	blockjobs = block_jobs;
});

chrome.storage.sync.get("block_addfeed", ({ block_addfeed }) => {
	blockaddfeed = block_addfeed;
});

chrome.storage.sync.get("block_events", ({ block_events }) => {
	blockevents = block_events;
});

chrome.storage.sync.get("block_freshpps", ({ block_freshpps }) => {
	blockfreshpps = block_freshpps;
});



chrome.storage.sync.get("block_all", ({ block_all }) => {
	blockall = block_all;
});

chrome.storage.sync.get("feed_reminder", ({ feed_reminder }) => {
	reminder = feed_reminder;
});





chrome.storage.sync.get("enabled", ({ enabled }) => {
	if (enabled) {
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
	};

});


	
function clearAds () {
	
	let allLiAds = document.getElementsByClassName("feed-shared-update-v2");
	for (var i = 0; i < allLiAds.length; i++) {
		
		let post = allLiAds.item(i);
		// alert("ads: "+ads+" // jobs: "+jobs);
		if (blockads) {
			try {
				let postPromo1 = post.querySelector('.feed-shared-actor__description'); 
				let postTitle1 = post.querySelector('.feed-shared-actor__title');
				postTitle1 = postTitle1.textContent.trim();
				let postSub1 = postPromo1.textContent.trim();
				if (postSub1 == "Promoted") {
					post.style.display = "none";
					console.log("cleared an ad from: " + postTitle1);
				};
			} catch (error) {
				console.log(error);
			};
			
			try {
				
				let postPromo2 = post.querySelector('.feed-shared-actor__sub-description'); 
				let postTitle2 = post.querySelector('.feed-shared-actor__title');
				postTitle2 = postTitle2.textContent.trim();
				let postSub2 = postPromo2.textContent.trim();
				if (postSub2 == "Promoted") {
					post.style.display = "none";
					console.log("cleared an ad from: " + postTitle2);
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			console.log("ad blocking turned off");
		};
		
		if (blockjobs) {
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Jobs recommended for you") {
					post.style.display = "none";
					console.log("cleared a `Jobs recommended` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			console.log("jobs blocking turned off");
		};
		
		if (blockaddfeed) {
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Add to your feed") {
					post.style.display = "none";
					console.log("cleared an `Add to your feed` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			console.log("jobs blocking turned off");
		};
		
		if (blockevents) {
			
			try {
			
				let postPromo3 = post.querySelector('.feed-shared-text-view'); 
				let postSub3 = postPromo3.textContent.trim();
				if (postSub3 == "Events recommended for you") {
					post.style.display = "none";
					console.log("cleared an `Events recommended` post");
				};
			} catch (error) {
				console.log(error);
			};
		} else {
			console.log("jobs blocking turned off");
		};
		
		
		post.classList.remove("feed-shared-update-v2");
		post.style.margin = "0 0 8px";
		post.style.padding = "0";

	};
 };


function feedReminder() {
	var url = window.location.href;
	var q = "/feed/";
	
	if (reminder && url.search(q) > 0) {
		let reminderEl = '<div style="border-radius: 10px; padding: 15px; background-color: white; margin: 0 0 10px;">CleanUp LinkedIn is currently cleaning your feed.</div>';
		let main = document.getElementById("main");
	
		main.children[0].insertAdjacentHTML('afterbegin', reminderEl);
	};
}

function blockfreshperspectives() {
	var mainEl = document.getElementById("main");
	
	let freshEl = mainEl.getElementsByClassName("feed-welcome-back-feed");
	for (var i = 0; i < freshEl.length; i++) {
		
		let prefeed = freshEl.item(i);
		prefeed.style.display = "none";
	}
	
	

}

window.addEventListener("load", feedReminder);

