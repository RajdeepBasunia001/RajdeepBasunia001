    const getRandomInt = (max) =>{
         return Math.floor(Math.random() * max) + 1;
        }

        //PoW
    const miner1 = { name: "Miner1", power: getRandomInt(100) };
    const miner2 = { name: "Miner2", power: getRandomInt(100) };
    const miner3 = { name: "Miner3", power: getRandomInt(100) };

    const miners=[miner1,miner2,miner3];

    
    const selectPow = miners.reduce((max, miner) => miner.power > max.power ? miner : max);
    console.log(`Pow selected validator:${selectPow.name},power : ${selectPow.power}`);
    console.log("PoW Logic: Validator with the highest computational power wins.\n");

        //PoS
    const staker1 = { name: "Staker1", stake: getRandomInt(100) };
    const staker2 = { name: "Staker2", stake: getRandomInt(100) };
    const staker3 = { name: "Staker3", stake: getRandomInt(100) };

    const stakers = [staker1, staker2, staker3];


    const selectedPoS = stakers.reduce((max, staker) => staker.stake > max.stake ? staker : max);
    console.log(`PoS Selected Validator: ${selectedPoS.name} (Stake: ${selectedPoS.stake})`);
    console.log("PoS Logic: Validator with the highest amount of stake wins.\n");

        //DPoS

    const delegates = ["Delegate1", "Delegate2", "Delegate3"];
    const voters = [
        { name: "Voter1", vote: delegates[getRandomInt(3) - 1] },
        { name: "Voter2", vote: delegates[getRandomInt(3) - 1] },
        { name: "Voter3", vote: delegates[getRandomInt(3) - 1] },
    ];

    // Count votes
    const voteCount = {};
    voters.forEach((i) => {
        voteCount[i.vote] = (voteCount[i.vote] || 0) + 1;
    });

    // Find delegate with most votes
    let selectedDPoS = null;
    let maxVotes = 0;
    for (const [delegate, count] of Object.entries(voteCount)) {
        if (count > maxVotes) {
            maxVotes = count;
            selectedDPoS = delegate;
        }
    }

    console.log("DPoS Voter Selections:");
    voters.forEach((v) => console.log(`${v.name} voted for ${v.vote}`));
    console.log(`DPoS Selected Delegate: ${selectedDPoS} (Votes: ${maxVotes})`);
    console.log("DPoS Logic: Voters elect a delegate, most voted delegate wins.\n");
