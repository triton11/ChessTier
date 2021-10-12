// This is needed to prevent infinite looping when the mutation observer is
// triggered.
let globalRatings = new Map();

function run() {
  // Hide chat ratings
  // const chatStartRatings = document.querySelectorAll('div.live-game-start-component')
  // for (let i = 0; i < chatStartRatings.length; i++) {
  //   chatStartRatings[i].style.display = "none";
  // }
  // const chatEndRatings = document.querySelectorAll('div.live-game-over-component')
  // for (let i = 0; i < chatEndRatings.length; i++) {
  //   chatEndRatings[i].style.display = "none";
  // }
  // Replace user rating with a tier
  const tagline = document.querySelectorAll('div.user-tagline-component:not(.archive-tab-player)');
  for (let i = 0; i < tagline.length; i++) {
    const rating = tagline[i].querySelector('span.user-tagline-rating');
    if (rating !== null) {
      const ratingNum = parseInt(rating.innerHTML.replace(/\D/g,''), 10);
      const username = tagline[i].querySelector('.user-username-component').innerHTML; 
      if (!isNaN(ratingNum) && globalRatings.get(username) !== ratingNum) {
        swapNewRating(tagline[i], rating, ratingNum, username)
      }
    }
  }
  // Replace end user rating (and rating change) with a tier
  const endRating = document.querySelector('div.rating-value-value');
  if (endRating !== null) {
    const rating = endRating.querySelector('span.new-rating-component')
    const ratingNum = parseInt(rating.innerHTML.replace(/\D/g,''), 10);
    const mapKey = 'endRating'
    const oldRatingNum = globalRatings.get(mapKey)
    if (!isNaN(ratingNum) && oldRatingNum !== ratingNum) {
      swapNewRating(endRating, rating, ratingNum, mapKey)
      const ratingChange = endRating.querySelector('div.rating-change-right')
      if (!isNaN(oldRatingNum) && calculateBlitzTier(ratingNum) !== calculateBlitzTier(oldRatingNum)) {
        if (oldRatingNum < ratingNum) {
          ratingChange.style.display = "block";
          ratingChange.innerHTML = 'Promoted!'
        } else {
          ratingChange.style.display = "block";
          ratingChange.innerHTML = 'Demoted.'
        }
      } else {
        ratingChange.style.display = "none";
      }
    }
  }
}

function swapNewRating(parentNode, ratingNode, ratingNum, globalKey) {
  const newTierNode = makeRatingNode(ratingNum, globalKey);
  const previousTierNode = parentNode.querySelector('#previous-rating');
  if (previousTierNode !== null) {
    parentNode.removeChild(previousTierNode);
  }
  parentNode.insertBefore(newTierNode, ratingNode);
  ratingNode.style.display = "none";
  globalRatings.set(globalKey, ratingNum);
}

function makeRatingNode(ratingNum, globalKey) {
  let childNodeText = document.createTextNode(`(${calculateTier(ratingNum)})`);
  if (globalKey === 'endRating') {
    childNodeText = document.createTextNode(calculateTier(ratingNum));
  }
  const childNode = document.createElement('span');
  childNode.setAttribute('id', 'previous-rating')
  childNode.style.color = 'hsla(0,0%,100%,.65)'
  if (globalKey === 'endRating') {
    childNode.style.color = '#000'
  }
  childNode.appendChild(childNodeText)
  return childNode
}

function calculateTier(ratingNum) {
  // Use data-tab="game" instead
  timeControlNode = document.querySelector('span.time-selector-icon')

  if (timeControlNode !== null) {
    if (timeControlNode.classList.contains('bullet') || (timeControlNode.classList.contains('blitz'))) {
      return calculateBlitzTier(ratingNum)
    } else if (timeControlNode.classList.contains('rapid')) {
      return calculateRapidTier(ratingNum)
    } else {
      return calculateDailyTier(ratingNum)
    }
  } else {
    return calculateDailyTier(ratingNum)
  }
}

function calculateBlitzTier(ratingNum) {
  if (ratingNum < 200) {
    return "Bronze I"
  } else if (ratingNum < 300) {
    return "Bronze II"
  } else if (ratingNum < 400) {
    return "Bronze III"
  } else if (ratingNum < 500) {
    return "Bronze IV"
  } else if (ratingNum < 550) {
    return "Silver I"
  } else if (ratingNum < 600) {
    return "Silver II"
  } else if (ratingNum < 650) {
    return "Silver III"
  } else if (ratingNum < 700) {
    return "Silver IV"
  } else if (ratingNum < 775) {
    return "Gold I"
  } else if (ratingNum < 850) {
    return "Gold II"
  } else if (ratingNum < 925) {
    return "Gold III"
  } else if (ratingNum < 1000) {
    return "Gold IV"
  } else if (ratingNum < 1075) {
    return "Platinum I"
  } else if (ratingNum < 1150) {
    return "Platinum II"
  } else if (ratingNum < 1220) {
    return "Platinum III"
  } else if (ratingNum < 1300) {
    return "Platinum IV"
  } else if (ratingNum < 1400) {
    return "Diamond I"
  } else if (ratingNum < 1500) {
    return "Diamond II"
  } else if (ratingNum < 1600) {
    return "Diamond III"
  } else if (ratingNum < 1700) {
    return "Diamond IV"
  } else if (ratingNum < 1800) {
    return "Champion I"
  } else if (ratingNum < 1900) {
    return "Champion II"
  } else if (ratingNum < 2000) {
    return "Champion III"
  } else if (ratingNum < 2100) {
    return "Champion IV"
  } else {
    return "Grand Champion"
  }
}

function calculateRapidTier(ratingNum) {
  if (ratingNum < 200) {
    return "Bronze I"
  } else if (ratingNum < 300) {
    return "Bronze II"
  } else if (ratingNum < 400) {
    return "Bronze III"
  } else if (ratingNum < 500) {
    return "Bronze IV"
  } else if (ratingNum < 550) {
    return "Silver I"
  } else if (ratingNum < 600) {
    return "Silver II"
  } else if (ratingNum < 650) {
    return "Silver III"
  } else if (ratingNum < 700) {
    return "Silver IV"
  } else if (ratingNum < 775) {
    return "Gold I"
  } else if (ratingNum < 850) {
    return "Gold II"
  } else if (ratingNum < 925) {
    return "Gold III"
  } else if (ratingNum < 1000) {
    return "Gold IV"
  } else if (ratingNum < 1050) {
    return "Platinum I"
  } else if (ratingNum < 1100) {
    return "Platinum II"
  } else if (ratingNum < 1150) {
    return "Platinum III"
  } else if (ratingNum < 1200) {
    return "Platinum IV"
  } else if (ratingNum < 1275) {
    return "Diamond I"
  } else if (ratingNum < 1350) {
    return "Diamond II"
  } else if (ratingNum < 1425) {
    return "Diamond III"
  } else if (ratingNum < 1500) {
    return "Diamond IV"
  } else if (ratingNum < 1600) {
    return "Champion I"
  } else if (ratingNum < 1700) {
    return "Champion II"
  } else if (ratingNum < 1800) {
    return "Champion III"
  } else if (ratingNum < 1900) {
    return "Champion IV"
  } else {
    return "Grand Champion"
  }
}

function calculateDailyTier(ratingNum) {
  if (ratingNum < 200) {
    return "Bronze I"
  } else if (ratingNum < 400) {
    return "Bronze II"
  } else if (ratingNum < 600) {
    return "Bronze III"
  } else if (ratingNum < 800) {
    return "Bronze IV"
  } else if (ratingNum < 850) {
    return "Silver I"
  } else if (ratingNum < 900) {
    return "Silver II"
  } else if (ratingNum < 950) {
    return "Silver III"
  } else if (ratingNum < 1000) {
    return "Silver IV"
  } else if (ratingNum < 1050) {
    return "Gold I"
  } else if (ratingNum < 1100) {
    return "Gold II"
  } else if (ratingNum < 1150) {
    return "Gold III"
  } else if (ratingNum < 1200) {
    return "Gold IV"
  } else if (ratingNum < 1250) {
    return "Platinum I"
  } else if (ratingNum < 1300) {
    return "Platinum II"
  } else if (ratingNum < 1350) {
    return "Platinum III"
  } else if (ratingNum < 1400) {
    return "Platinum IV"
  } else if (ratingNum < 1450) {
    return "Diamond I"
  } else if (ratingNum < 1500) {
    return "Diamond II"
  } else if (ratingNum < 1550) {
    return "Diamond III"
  } else if (ratingNum < 1600) {
    return "Diamond IV"
  } else if (ratingNum < 1700) {
    return "Champion I"
  } else if (ratingNum < 1800) {
    return "Champion II"
  } else if (ratingNum < 1900) {
    return "Champion III"
  } else if (ratingNum < 2000) {
    return "Champion IV"
  } else {
    return "Grand Champion"
  }
}


var observer = new MutationObserver(function(mutations) {
  run();
});

observer.observe(document, { childList: true, subtree: true });
