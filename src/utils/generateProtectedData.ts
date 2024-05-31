import { v4 as uuidv4 } from 'uuid';

const MAX_PROTECTEDAREA_LENGTH = 100;

function getRandomInt(min, max) {
    // Use Math.floor to round down to the nearest whole number
    // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
    // Multiply by the range (max - min + 1) to cover the entire range
    // Add the minimum value to shift the range to [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// this methods return the reward values and associated coordinates on the map
// mapSize: 100000 pixels
// rewardRatio: 0.25 ( 25% of the pixels have an associated 
export const generateProtectedData = (mapSize, rewardRatio, totalRewardAmount) => {
    let mapId = uuidv4();

    const areaLength = Math.sqrt(mapSize);
    // now let's split this into protected data areas
    let cols = areaLength / 100;
    let lines = areaLength / 100;
    let boxesCount = cols * lines


    var result = [];
    var remainingRewardAmount = totalRewardAmount;
    var rewardCount = Math.ceil(boxesCount * rewardRatio)
    var maxRewardValue = totalRewardAmount / rewardCount;
    var maxItemReward = 0;
    while (rewardCount > 0) {
        var rewardX = getRandomInt(0, areaLength);
        var rewardY = getRandomInt(0, areaLength);

        var rewardValue = getRandomInt(80, 100) / 100.0 * maxRewardValue
        var exists = undefined != result.find((i) => { return i.x == rewardX && i.y == rewardY });
        var candidateRemainingReward = remainingRewardAmount - rewardValue;
        if (!exists && candidateRemainingReward > 0) {
            var item = {
                "x": rewardX,
                "y": rewardY,
                "reward": rewardValue,
                "boosted": false
            }
            result.push(item)
            rewardCount--;
            remainingRewardAmount = remainingRewardAmount - rewardValue;
            maxItemReward = rewardValue > maxItemReward ? rewardValue : maxItemReward;
        }
    }
    //console.log("totalRewardAmount", totalRewardAmount, "Nb rewards", rewardCount, "maxRewardValue", maxRewardValue, "maxItemReward", maxItemReward, "remainingRewardAmount", remainingRewardAmount)

    if (remainingRewardAmount) {
        var index = result.findIndex((i) => {
            return i.reward == maxItemReward
        })
        // console.log("index", index)
        result[index].boosted = true;
        result[index].reward += remainingRewardAmount;
    }


    var protectedDataList = [];
    for (var l = 0; l < lines; l++) {
        for (var c = 0; c < cols; c++) {
            var minX = c * 100;
            var maxX = (1 + c) * 100;
            var minY = l * 100;
            var maxY = (1 + l) * 100;

            var foundItems = result.filter((item) => {
                return item.x >= minX && item.x < maxX && item.y >= minY && item.y < maxY
            })

            if (foundItems.length > 0) {
                var boxReward = 0;
                foundItems.forEach((k) => {
                    boxReward += k.reward;
                })

                //console.log("minX", minX, "minY", minY, "maxX", maxX, "maxY", maxY, "foundItems", foundItems, "boxReward", boxReward)
                let protectedData = {
                    "mapId": mapId,
                    "minX": minX,
                    "minY": minY,
                    "maxX": maxX,
                    "maxY": maxY,
                    "rewardCount": foundItems.length,
                    "rewardAmount": boxReward,
                    "rewards": foundItems
                }
                protectedDataList.push(protectedData)
            }
        }
    }

    // console.log(JSON.stringify(protectedDataList, null, 1) )

    //var iexec = getIExec()
    // console.log("iexec", iexec)
    return  {
        "mapId": mapId, 
        "items":protectedDataList
    }
}
