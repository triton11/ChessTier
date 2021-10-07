// This is needed to prevent infinite looping when the mutation observer is
// triggered.
let globalRatings = new Map();

function run() {
  const tagline = document.querySelectorAll('div.user-tagline-component');
  for (let i = 0; i < tagline.length; i++) {
    const rating = tagline[i].querySelector('span.user-tagline-rating');
    if (rating !== null) {
      const ratingNum = parseInt(rating.innerHTML.replace(/\D/g,''), 10);
      const username = tagline[i].querySelector('a.user-username-component').innerHTML; 
      if (!isNaN(ratingNum) && globalRatings.get(username) !== ratingNum) {
        swapNewRating(tagline[i], rating, ratingNum, username)
      }
    }
  }
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
  let childNodeText = document.createTextNode(`(${calculateBlitzTier(ratingNum)})`);
  if (globalKey === 'endRating') {
    childNodeText = document.createTextNode(calculateBlitzTier(ratingNum));
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

function calculateBlitzTier(ratingNum) {
  if (ratingNum < 500) {
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
  } else {
    return "Champion"
  }
}

var observer = new MutationObserver(function(mutations) {
  run();
});

observer.observe(document, { childList: true, subtree: true });
