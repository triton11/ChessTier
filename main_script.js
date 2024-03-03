// This is needed to prevent infinite looping when the mutation observer is
// triggered.
let globalRatings = new Map();
let useTier = true;
let useUSCF = false;
let useNoRating = false;
const emptyRating = '∅';

function run() {
  // Hide end user rating
  const newRatingNode = document.querySelector('span.new-rating-component');
  if (newRatingNode) {
    newRatingNode.style.display = 'none';
  }
  const ratingChangeNode = document.querySelector('div.rating-change-right');
  if (ratingChangeNode) {
    ratingChangeNode.style.display = 'none';
  }

  // Replace user rating with a tier
  const tagline = document.querySelectorAll('div.user-tagline-component:not(.archive-tab-player)');
  for (let i = 0; i < tagline.length; i++) {
    const rating = tagline[i].querySelector('span.user-tagline-rating');
    if (rating !== null) {
      const ratingNum = parseInt(rating.innerHTML.replace(/\D/g,''), 10);
      const username = tagline[i].querySelector('.user-username-component').innerHTML; 
      if (!isNaN(ratingNum) && globalRatings.get(username) !== ratingNum) {
        swapNewRating(tagline[i], rating, ratingNum, username);
      }
    }
  }

  // Replace end user rating (and rating change) with a tier
  const endRating = document.querySelector('div.rating-value-value');
  if (endRating !== null) {
    const rating = endRating.querySelector('span.new-rating-component');
    const ratingNum = parseInt(rating.innerHTML.replace(/\D/g, ''), 10);
    const ratingChange = endRating.querySelector('div.rating-change-right');
    const ratingChangeNum = parseInt(ratingChange.innerHTML.replace(/[^\d.-]/g, ''), 10);
    const mapKey = 'endRating';
    const oldRatingNum = globalRatings.get(mapKey);
    if (!isNaN(ratingNum) && oldRatingNum !== ratingNum) {
      swapNewRating(endRating, rating, ratingNum, mapKey);
      swapChangeNode(endRating, ratingChange, ratingNum, ratingChangeNum);
    }
  }

  // Hide chat ratings
  const chatStartRatings = document.querySelectorAll('div.live-game-start-component')
  for (let i = 0; i < chatStartRatings.length; i++) {
    // TODO: Change chat ratings with jQuery
    chatStartRatings[i].style.display = 'none';
  }
  const chatEndRatings = document.querySelectorAll('div.live-game-over-component')
  for (let i = 0; i < chatEndRatings.length; i++) {
    // TODO: Change chat ratings with jQuery
    chatEndRatings[i].style.display = 'none';
  }
}

function swapNewRating(parentNode, ratingNode, ratingNum, globalKey) {
  const newTierNode = makeRatingNode(ratingNum, globalKey);
  const previousTierNode = parentNode.querySelector('#previous-rating');
  if (previousTierNode !== null) {
    parentNode.removeChild(previousTierNode);
  }
  parentNode.insertBefore(newTierNode, ratingNode);
  ratingNode.style.display = 'none';
  globalRatings.set(globalKey, ratingNum);
}

function makeRatingNode(ratingNum, globalKey) {
  let childNodeText = document.createTextNode(`(${calculateTier(ratingNum)})`);
  if (globalKey === 'endRating') {
    childNodeText = document.createTextNode(calculateTier(ratingNum));
  }
  const childNode = document.createElement('span');
  childNode.setAttribute('id', 'previous-rating');
  childNode.style.color = 'hsla(0,0%,100%,.65)';
  if (globalKey === 'endRating') {
    childNode.style.color = '#000';
  }
  childNode.appendChild(childNodeText);
  return childNode;
}

function swapChangeNode(endRating, rantingChange, ratingNum, ratingChangeNum) {
  if (calculateTier(ratingNum) !== calculateTier(ratingNum - ratingChangeNum)) {
    const previousChangeNode = endRating.querySelector('#previous-rating-change');
    if (previousChangeNode !== null) {
      endRating.removeChild(previousChangeNode);
    }
    if (ratingChangeNum > 0) {
      let changeNodeText = document.createTextNode('Promoted!');
      const childNode = document.createElement('span');
      childNode.setAttribute('id', 'previous-rating-change');
      childNode.style.color = '#85a94e';
      childNode.style.fontSize = '1.4rem';
      childNode.appendChild(changeNodeText);
      endRating.insertBefore(childNode, rantingChange);
    } else {
      let changeNodeText = document.createTextNode('Demoted.');
      const childNode = document.createElement('span');
      childNode.setAttribute('id', 'previous-rating-change');
      childNode.style.color = '#a7a6a2';
      childNode.style.fontSize = '1.4rem';
      childNode.appendChild(changeNodeText);
      endRating.insertBefore(childNode, rantingChange);
    }
  }
}

function calculateTier(ratingNum) {
  timeControl = getTimeControl();
  if (timeControl === 'blitz') {
    return useUSCF ? uscfNormalizedBlitzTier(ratingNum) : calculateBlitzTier(ratingNum);
  } else if (timeControl === 'rapid') {
    return useUSCF ? uscfNormalizedRapidTier(ratingNum) : calculateRapidTier(ratingNum);
  } else {
    return useUSCF ? uscfNormalizedRapidTier(ratingNum) : calculateDailyTier(ratingNum);
  }
}

function getTimeControl() {
  let timeControlNode = document.querySelector('span.time-selector-icon') || document.querySelector('span.tabs-icon')
  if (timeControlNode !== null) {
    if (timeControlNode.classList.contains('bullet') || timeControlNode.classList.contains('blitz')) {
      return 'blitz';
    } else if (timeControlNode.classList.contains('rapid')) {
      return 'rapid';
    } else {
      return 'daily';
    }
  }
  return 'blitz';
}

function calculateBlitzTier(ratingNum) {
  if (useNoRating) return emptyRating
  if (ratingNum < 200) {
    return '🔔 Bronze I';
  } else if (ratingNum < 300) {
    return '🔔 Bronze II';
  } else if (ratingNum < 400) {
    return '🔔 Bronze III';
  } else if (ratingNum < 500) {
    return '🔔 Bronze IV';
  } else if (ratingNum < 550) {
    return '🥄 Silver I';
  } else if (ratingNum < 600) {
    return '🥄 Silver II';
  } else if (ratingNum < 650) {
    return '🥄 Silver III';
  } else if (ratingNum < 700) {
    return '🥄 Silver IV';
  } else if (ratingNum < 775) {
    return '⚜ Gold I';
  } else if (ratingNum < 850) {
    return '⚜ Gold II';
  } else if (ratingNum < 925) {
    return '⚜ Gold III';
  } else if (ratingNum < 1000) {
    return '⚜ Gold IV';
  } else if (ratingNum < 1075) {
    return '⚔️ Platinum I';
  } else if (ratingNum < 1150) {
    return '⚔️ Platinum II';
  } else if (ratingNum < 1225) {
    return '⚔️ Platinum III';
  } else if (ratingNum < 1300) {
    return '⚔️ Platinum IV';
  } else if (ratingNum < 1400) {
    return '💎 Diamond I';
  } else if (ratingNum < 1500) {
    return '💎 Diamond II';
  } else if (ratingNum < 1600) {
    return '💎 Diamond III';
  } else if (ratingNum < 1700) {
    return '💎 Diamond IV';
  } else if (ratingNum < 1800) {
    return '👑 Champion I';
  } else if (ratingNum < 1900) {
    return '👑 Champion II';
  } else if (ratingNum < 2000) {
    return '👑 Champion III';
  } else if (ratingNum < 2100) {
    return '👑 Champion IV';
  } else if (ratingNum < 2225) {
    return '🔮 Legendary I';
  } else if (ratingNum < 2350) {
    return '🔮 Legendary II';
  } else if (ratingNum < 2475) {
    return '🔮 Legendary III';
  } else if (ratingNum < 2600) {
    return '🔮 Legendary IV';
  } else if (ratingNum < 2850) {
    return 'Legendary 🏆 Champion';
  } else if (ratingNum < 3000) {
    return 'Mythical 🏆 Champion'
  } else {
    return '✨ Supreme Champion ✨'
  }
}

function calculateRapidTier(ratingNum) {
  if (useNoRating) return emptyRating
  if (ratingNum < 200) {
    return '🔔 Bronze I';
  } else if (ratingNum < 300) {
    return '🔔 Bronze II';
  } else if (ratingNum < 400) {
    return '🔔 Bronze III';
  } else if (ratingNum < 500) {
    return '🔔 Bronze IV';
  } else if (ratingNum < 550) {
    return '🥄 Silver I';
  } else if (ratingNum < 600) {
    return '🥄 Silver II';
  } else if (ratingNum < 650) {
    return '🥄 Silver III';
  } else if (ratingNum < 700) {
    return '🥄 Silver IV';
  } else if (ratingNum < 775) {
    return '⚜ Gold I';
  } else if (ratingNum < 850) {
    return '⚜ Gold II';
  } else if (ratingNum < 925) {
    return '⚜ Gold III';
  } else if (ratingNum < 1000) {
    return '⚜ Gold IV';
  } else if (ratingNum < 1050) {
    return '⚔️ Platinum I';
  } else if (ratingNum < 1100) {
    return '⚔️ Platinum II';
  } else if (ratingNum < 1150) {
    return '⚔️ Platinum III';
  } else if (ratingNum < 1200) {
    return '⚔️ Platinum IV';
  } else if (ratingNum < 1275) {
    return '💎 Diamond I';
  } else if (ratingNum < 1350) {
    return '💎 Diamond II';
  } else if (ratingNum < 1425) {
    return '💎 Diamond III';
  } else if (ratingNum < 1500) {
    return '💎 Diamond IV';
  } else if (ratingNum < 1600) {
    return '👑 Champion I';
  } else if (ratingNum < 1700) {
    return '👑 Champion II';
  } else if (ratingNum < 1800) {
    return '👑 Champion III';
  } else if (ratingNum < 1900) {
    return '👑 Champion IV';
  } else if (ratingNum < 2025) {
    return '🔮 Legendary I';
  } else if (ratingNum < 2150) {
    return '🔮 Legendary II';
  } else if (ratingNum < 2275) {
    return '🔮 Legendary III';
  } else if (ratingNum < 2400) {
    return '🔮 Legendary IV';
  } else if (ratingNum < 2600) {
    return 'Legendary 🏆 Champion';
  } else if (ratingNum < 2800) {
    return 'Mythical 🏆 Champion'
  } else {
    return '✨ Supreme Champion ✨'
  }
}

function calculateDailyTier(ratingNum) {
  if (useNoRating) return emptyRating
  if (ratingNum < 200) {
    return '🔔 Bronze I';
  } else if (ratingNum < 400) {
    return '🔔 Bronze II';
  } else if (ratingNum < 600) {
    return '🔔 Bronze III';
  } else if (ratingNum < 800) {
    return '🔔 Bronze IV';
  } else if (ratingNum < 850) {
    return '🥄 Silver I';
  } else if (ratingNum < 900) {
    return '🥄 Silver II';
  } else if (ratingNum < 950) {
    return '🥄 Silver III';
  } else if (ratingNum < 1000) {
    return '🥄 Silver IV';
  } else if (ratingNum < 1050) {
    return '⚜ Gold I';
  } else if (ratingNum < 1100) {
    return '⚜ Gold II';
  } else if (ratingNum < 1150) {
    return '⚜ Gold III';
  } else if (ratingNum < 1200) {
    return '⚜ Gold IV';
  } else if (ratingNum < 1250) {
    return '⚔️ Platinum I';
  } else if (ratingNum < 1300) {
    return '⚔️ Platinum II';
  } else if (ratingNum < 1350) {
    return '⚔️ Platinum III';
  } else if (ratingNum < 1400) {
    return '⚔️ Platinum IV';
  } else if (ratingNum < 1450) {
    return '💎 Diamond I';
  } else if (ratingNum < 1500) {
    return '💎 Diamond II';
  } else if (ratingNum < 1550) {
    return '💎 Diamond III';
  } else if (ratingNum < 1600) {
    return '💎 Diamond IV';
  } else if (ratingNum < 1700) {
    return '👑 Champion I';
  } else if (ratingNum < 1800) {
    return '👑 Champion II';
  } else if (ratingNum < 1900) {
    return '👑 Champion III';
  } else if (ratingNum < 2000) {
    return '👑 Champion IV';
  } else if (ratingNum < 2125) {
    return '🔮 Legendary I';
  } else if (ratingNum < 2250) {
    return '🔮 Legendary II';
  } else if (ratingNum < 2375) {
    return '🔮 Legendary III';
  } else if (ratingNum < 2500) {
    return '🔮 Legendary IV';
  } else if (ratingNum < 2700) {
    return 'Legendary 🏆 Champion';
  } else if (ratingNum < 2900) {
    return 'Mythical 🏆 Champion'
  } else {
    return '✨ Supreme Champion ✨'
  }
}

function uscfNormalizedBlitzTier(ratingNum) {
  if (useNoRating) return emptyRating
  if (ratingNum < 200) {
    return '🔔 Bronze I';
  } else if (ratingNum < 400) {
    return '🔔 Bronze II';
  } else if (ratingNum < 600) {
    return '🔔 Bronze III';
  } else if (ratingNum < 800) {
    return '🔔 Bronze IV';
  } else if (ratingNum < 1000) {
    return '🥄 Silver I';
  } else if (ratingNum < 1133) {
    return '🥄 Silver II';
  } else if (ratingNum < 1266) {
    return '🥄 Silver III';
  } else if (ratingNum < 1400) {
    return '🥄 Silver IV';
  } else if (ratingNum < 1512) {
    return '⚜ Gold I';
  } else if (ratingNum < 1624) {
    return '⚜ Gold II';
  } else if (ratingNum < 1736) {
    return '⚜ Gold III';
  } else if (ratingNum < 1850) {
    return '⚜ Gold IV';
  } else if (ratingNum < 1910) {
    return '⚔️ Platinum I';
  } else if (ratingNum < 1960) {
    return '⚔️ Platinum II';
  } else if (ratingNum < 2020) {
    return '⚔️ Platinum III';
  } else if (ratingNum < 2100) {
    return '⚔️ Platinum IV';
  } else if (ratingNum < 2150) {
    return '💎 Diamond I';
  } else if (ratingNum < 2200) {
    return '💎 Diamond II';
  } else if (ratingNum < 2250) {
    return '💎 Diamond III';
  } else if (ratingNum < 2300) {
    return '💎 Diamond IV';
  } else if (ratingNum < 2350) {
    return '👑 Champion I';
  } else if (ratingNum < 2400) {
    return '👑 Champion II';
  } else if (ratingNum < 2450) {
    return '👑 Champion III';
  } else if (ratingNum < 2500) {
    return '👑 Champion IV';
  } else if (ratingNum < 2575) {
    return '🔮 Legendary I';
  } else if (ratingNum < 2650) {
    return '🔮 Legendary II';
  } else if (ratingNum < 2725) {
    return '🔮 Legendary III';
  } else if (ratingNum < 2800) {
    return '🔮 Legendary IV';
  } else if (ratingNum < 2900) {
    return 'Legendary 🏆 Champion';
  } else if (ratingNum < 3000) {
    return 'Mythical 🏆 Champion'
  } else {
    return '✨ Supreme Champion ✨'
  }
}

function uscfNormalizedRapidTier(ratingNum) {
  if (useNoRating) return emptyRating
  if (ratingNum < 250) {
    return '🔔 Bronze I';
  } else if (ratingNum < 500) {
    return '🔔 Bronze II';
  } else if (ratingNum < 750) {
    return '🔔 Bronze III';
  } else if (ratingNum < 1000) {
    return '🔔 Bronze IV';
  } else if (ratingNum < 1200) {
    return '🥄 Silver I';
  } else if (ratingNum < 1275) {
    return '🥄 Silver II';
  } else if (ratingNum < 1350) {
    return '🥄 Silver III';
  } else if (ratingNum < 1425) {
    return '🥄 Silver IV';
  } else if (ratingNum < 1500) {
    return '⚜ Gold I';
  } else if (ratingNum < 1625) {
    return '⚜ Gold II';
  } else if (ratingNum < 1750) {
    return '⚜ Gold III';
  } else if (ratingNum < 1850) {
    return '⚜ Gold IV';
  } else if (ratingNum < 1910) {
    return '⚔️ Platinum I';
  } else if (ratingNum < 1960) {
    return '⚔️ Platinum II';
  } else if (ratingNum < 2020) {
    return '⚔️ Platinum III';
  } else if (ratingNum < 2100) {
    return '⚔️ Platinum IV';
  } else if (ratingNum < 2150) {
    return '💎 Diamond I';
  } else if (ratingNum < 2200) {
    return '💎 Diamond II';
  } else if (ratingNum < 2250) {
    return '💎 Diamond III';
  } else if (ratingNum < 2300) {
    return '💎 Diamond IV';
  } else if (ratingNum < 2350) {
    return '👑 Champion I';
  } else if (ratingNum < 2400) {
    return '👑 Champion II';
  } else if (ratingNum < 2450) {
    return '👑 Champion III';
  } else if (ratingNum < 2500) {
    return '👑 Champion IV';
  } else if (ratingNum < 2575) {
    return '🔮 Legendary I';
  } else if (ratingNum < 2650) {
    return '🔮 Legendary II';
  } else if (ratingNum < 2725) {
    return '🔮 Legendary III';
  } else if (ratingNum < 2800) {
    return '🔮 Legendary IV';
  } else if (ratingNum < 2900) {
    return 'Legendary 🏆 Champion';
  } else if (ratingNum < 3000) {
    return 'Mythical 🏆 Champion'
  } else {
    return '✨ Supreme Champion ✨'
  }
}

chrome.storage.sync.get(['useTier', 'useUSCF', 'useNoRating'], (items) => {

  if (items['useUSCF'] === undefined) {
    chrome.storage.sync.set({ 'useUSCF': false });
  }

  if (items['useTier'] === undefined) {
    chrome.storage.sync.set({ 'useTier': true });
  }

  if (items['useNoRating'] === undefined) {
    chrome.storage.sync.set({ 'useNoRating': false });
  }

  if (items['useUSCF'] !== undefined) {
    useUSCF = items['useUSCF'];
  }

  if (items['useNoRating'] !== undefined) {
    useNoRating = items['useNoRating'];
  }

  if (useNoRating) {
    useTier = true;
    chrome.storage.sync.set({ 'useTier': true });
  }

  if (items['useUSCF'] === true) {
    return;
  }

  var observer = new MutationObserver(function (mutations) {
    run();
  });

  observer.observe(document, { childList: true, subtree: true });
});

