export const sortScore = (questionCategory, score, setCategoryScores, categoryScores, setCurrentCatScores) => {
    let sortedCatScores;
    let currentCatScores;
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
    sortedCatScores = {transScore,waterScore,energyScore,recycScore,purchScore}
    currentCatScores = {currentTransScore,currentWaterScore,currentEnergyScore,currentRecycScore,currentPurchScore}
    setCategoryScores(sortedCatScores)
    setCurrentCatScores(currentCatScores)

    return {sortedCatScores, currentCatScores};
}
