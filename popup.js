// Initialize toggle with user's preferred settings
let toggleTier = document.getElementById("toggleTier");
chrome.storage.sync.get("useTier", ({ useTier }) => {
  toggleTier.checked = useTier;
});

let toggleUSCF = document.getElementById("toggleUSCF");
chrome.storage.sync.get("useUSCF", ({ useUSCF }) => {
  toggleUSCF.checked = useUSCF;
});

let toggleNoRating = document.getElementById("toggleNoRating");
chrome.storage.sync.get("useNoRating", ({ useNoRating }) => {
  toggleNoRating.checked = useNoRating ?? false;
});


// When the toggleTier button is clicked, swap useTier
toggleTier.addEventListener("click", async () => {
  chrome.storage.sync.get("useTier", ({ useTier }) => {
  	if (useTier === undefined || useTier === true) {
      chrome.storage.sync.set({ 'useTier': false });
  	} else {
	  chrome.storage.sync.set({ 'useTier': true });
  	}
  });
});

// When the toggleUSCF button is clicked, swap useUSCF
toggleUSCF.addEventListener("click", async () => {
  chrome.storage.sync.get("useUSCF", ({ useUSCF }) => {
  	if (useUSCF === undefined || useUSCF === true) {
      chrome.storage.sync.set({ 'useUSCF': false });
  	} else {
	  chrome.storage.sync.set({ 'useUSCF': true });
  	}
  });
});

// When the toggleNoRating button is clicked, swap useNoRating
toggleNoRating.addEventListener("click", async () => {
  chrome.storage.sync.get("useNoRating", ({ useNoRating }) => {
  	if (useNoRating === undefined || useNoRating === true) {
      chrome.storage.sync.set({ 'useNoRating': false });
  	} else {
	  chrome.storage.sync.set({ 'useNoRating': true });
  	}
  });
});