export const sortScore = (questionCategory, score, setCategoryScores, categoryScores) => {
    let sortedCatScores;
    let i = 0;
    let transScore = categoryScores.transScore;
    let waterScore = categoryScores.waterScore;
    let energyScore = categoryScores.energyScore;
    let recycScore = categoryScores.recycScore;
    let purchScore = categoryScores.purchScore;
    for (; i < 8; i++) {
        if (questionCategory[i] === "transportation") {
            transScore += score[i]
        } else if (questionCategory[i] === "water") {
            waterScore += score[i];
        } else if (questionCategory[i] === "energy") {
            energyScore += score[i];
        } else if (questionCategory[i] === "recycling") {
            recycScore += score[i];
        } else if (questionCategory[i] === "purchasing") {
            purchScore += score[i];
        }
    }
    sortedCatScores = {transScore,waterScore,energyScore,recycScore,purchScore}
    setCategoryScores(sortedCatScores)
    return sortedCatScores;
}
