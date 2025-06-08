async function generateSHA256(index, contentdata, previousHash, nonce, timestamp) {
    const text = index + timestamp + contentdata + previousHash + nonce;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }


class Block {
    constructor(index, data, previousHash, nonce) {
      this.index = index;
      this.timestamp = new Date().toLocaleString()
      this.data = data;
      this.previousHash = previousHash;
      this.nonce = parseInt(nonce);
      this.hash = "";
    }
    async calculateHash() {
      return await generateSHA256(this.index, this.data, this.previousHash, this.nonce, this.timestamp);
    }

    async mineBlock(difficulty) {
    const start = performance.now();
    const target = Array(difficulty + 1).join("0");

    while (true) {
      this.hash = await this.calculateHash();
      if (this.hash.substring(0, difficulty) === target) break;
      this.nonce++;
    }
      const end = performance.now();
      const seconds = ((end - start) / 1000).toFixed(2);
      console.log(`Hash : ${this.hash}`);
      console.log(`Nonce : ${this.nonce}`);
      console.log(`Time taken :${seconds}`);
    }

}


//change the data here
(async () => {
  let newBlock = new Block(1, "RajdeepBasunia", 0, 0);
  await newBlock.mineBlock(4); // Adjust difficulty here 
})();
//run on console to see the output