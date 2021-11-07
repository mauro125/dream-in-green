export const sortScore = (questionCategory, score, setCategoryScores) => {
    let sortedCatScores;
    let i = 0;
    let transScore = 0;
    let waterScore = 0;
    let energyScore = 0;
    let recycScore = 0;
    let purchScore = 0;
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
