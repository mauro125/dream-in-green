export const sortScore = (questionCategory, score, setCategoryScores, categoryScores, setCurrentCatScores, setBadges, badges) => {
  let sortedCatScores;
  let currentCatScors;
  let badgges;
  let transpBadge = badges.transpBadge;
  let waterBadge = badges.waterBadge;
  let energyBadge = badges.energyBadge;
  let recycBadge = badges.recycBadge;
  let purchBadge = badges.purchBadge;

  let i = 0;
  let transScore = categoryScores.transScore;
  let waterScore = categoryScores.waterScore;
  let energyScore = categoryScores.energyScore;
  let recycScore = categoryScores.recycScore;
  let purchScore = categoryScores.purchScore;

  let currentTransScore = 0;
  let currentWaterScore = 0;
  let currentEnergyScore = 0;
  let currentRecycScore = 0;
  let currentPurchScore = 0;
  for (; i < 8; i++) {
    if (questionCategory[i] === "transportation") {
      transScore += score[i]
      currentTransScore += score[i]
    } else if (questionCategory[i] === "water") {
      waterScore += score[i];
      currentWaterScore += score[i]
    } else if (questionCategory[i] === "energy") {
      energyScore += score[i];
      currentEnergyScore += score[i]
    } else if (questionCategory[i] === "recycling") {
      recycScore += score[i];
      currentRecycScore += score[i]
    } else if (questionCategory[i] === "purchasing") {
      purchScore += score[i];
      currentPurchScore += score[i]
    }
  }

  let cat = [transScore,waterScore,energyScore,recycScore,purchScore];
  let bdg = [transpBadge,waterBadge,energyBadge,recycBadge,purchBadge]
  let arr = [];
  for (let i = 0; i < cat.length; i++){
    if ((cat[i] >= 300 && cat[i] <= 315) && bdg[i].awarded === false) {
      arr[i] = {
        awarded: true,
        displayModal: true
      }
    } else {
      arr[i] = {
        given: true,
        displayModal: false
      }
    }
  }

  transpBadge = arr[0];
  waterBadge = arr[1];
  energyBadge = arr[2];
  recycBadge = arr[3];
  purchBadge = arr[4];

  sortedCatScores = {transScore, waterScore, energyScore, recycScore, purchScore}
  currentCatScors = {currentTransScore, currentWaterScore, currentEnergyScore, currentRecycScore, currentPurchScore}
  badgges = {transpBadge, waterBadge, energyBadge, recycBadge, purchBadge}

  setCategoryScores(sortedCatScores)
  setCurrentCatScores(currentCatScors)
  setBadges(badgges)

  return {sortedCatScores, currentCatScors, badgges};
}
