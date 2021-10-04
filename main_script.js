// This is needed to prevent infinite looping when the mutation observer is
// triggered.
let global_elos = new Map();

function run() {
  const elo = document.querySelectorAll('div.user-tagline-component')
  for (let i = 0; i < elo.length; i++) {
    const orig = elo[i].querySelector('span.user-tagline-rating')
    if (orig !== null) {
      let current_elo = orig.innerHTML.replace(/\D/g,'')
      let num_elo = parseInt(current_elo, 10);
      const name = elo[i].querySelector('a.user-username-component').innerHTML   
      if (!isNaN(num_elo) && global_elos.get(name) !== num_elo) {
        // orig.innerHTML = current_elo + "<span style='display:'> (" + calculateBlitzTier(num_elo) + ") </span>"
        const childNodeText = document.createTextNode("(" + calculateBlitzTier(num_elo) + ")");
        const childNode = document.createElement("span");
        childNode.setAttribute("id", "previous-elo")
        childNode.style.color = 'hsla(0,0%,100%,.65)'
        childNode.appendChild(childNodeText)
        const previousNode = elo[i].querySelector("#previous-elo")
        if (previousNode !== null) {
          elo[i].removeChild(previousNode);
        }
        elo[i].insertBefore(childNode, orig)
        orig.style.display = "none";
        global_elos.set(name, num_elo)
      }
    }
  }
}

function calculateBlitzTier(num_elo) {
  if (num_elo < 500) {
    return "Bronze IV"
  } else if (num_elo < 550) {
    return "Silver I"
  } else if (num_elo < 600) {
    return "Silver II"
  } else if (num_elo < 650) {
    return "Silver III"
  } else if (num_elo < 700) {
    return "Silver IV"
  } else if (num_elo < 775) {
    return "Gold I"
  } else if (num_elo < 850) {
    return "Gold III"
  } else if (num_elo < 925) {
    return "Gold III"
  } else if (num_elo < 1000) {
    return "Gold IV"
  } else if (num_elo < 1075) {
    return "Platinum I"
  } else if (num_elo < 1150) {
    return "Platinum II"
  } else if (num_elo < 1220) {
    return "Platinum III"
  } else if (num_elo < 1300) {
    return "Platinum IV"
  } else if (num_elo < 1400) {
    return "Diamond I"
  } else if (num_elo < 1500) {
    return "Diamond II"
  } else if (num_elo < 1600) {
    return "Diamond III"
  } else if (num_elo < 1700) {
    return "Diamond IV"
  } else {
    return "Champion"
  }
}

var observer = new MutationObserver(function(mutations) {
  run();
});

observer.observe(document, { childList: true, subtree: true });
