document.addEventListener("DOMContentLoaded", function () {


  async function generateSHA256(index, contentdata, previousHash, nonce, timestamp) {
    const text = index + timestamp + contentdata + previousHash + nonce;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const input = this.querySelectorAll("input");

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
      const target = Array(difficulty + 1).join("0");

      let hash = "";
      while (true) {
        hash = await this.calculateHash();
        if (hash.substring(0, difficulty) === target) break;
        this.nonce++;
        this.hash = hash;
      }
      return this.nonce;

    }

  }

  const blocks = [
    { index: 'index1', data: 'data1', nonce: 'non1', button: 'btn1', container: 'gen' },
    { index: 'index2', data: 'data2', nonce: 'non2', button: 'btn2', container: 'blk1' },
    { index: 'index3', data: 'data3', nonce: 'non3', button: 'btn3', container: 'blk2' }
  ];

  let blockchain = [];

  blocks.forEach((blockEl, idx) => {
    const button = document.getElementById(blockEl.button);


    button.addEventListener('click', async () => {
      const index = document.getElementById(blockEl.index).value || idx;
      const data = document.getElementById(blockEl.data).value || "Empty";
      const nonce = document.getElementById(blockEl.nonce).value || 0;
      const previousHash = idx === 0 ? "0" : blockchain[idx - 1].hash;

      const newBlock = new Block(index, data, previousHash, nonce);
      const diff = document.getElementById("mySelect");
      const val = diff.value;
      const start = performance.now();
      newBlock.nonce = await newBlock.mineBlock(parseInt(val));
      newBlock.hash = await newBlock.calculateHash();

      blockchain[idx] = newBlock;

      // Update DOM
      const container = document.getElementById(blockEl.container);
      container.querySelector(".phash").innerText = "Previous Hash: " + newBlock.previousHash;
      container.querySelector(".hash").innerText = "Hash: " + newBlock.hash;
      container.querySelector(".ts").innerText = "TimeStamps: " + newBlock.timestamp;
      const statusEl = container.querySelector(".status");
      if (newBlock.hash.substring(0, parseInt(val)) === Array(parseInt(val) + 1).join("0")) {
        statusEl.innerText = "Status: ✅ Valid Block";
        statusEl.style.color = "green";
      } else {
        statusEl.innerText = "Status: ❌ Invalid Block";
        statusEl.style.color = "red";
      }

      document.getElementById(blockEl.nonce).value = newBlock.nonce;
      const end = performance.now();
      const seconds = ((end - start) / 1000).toFixed(2);
      button.innerHTML = `Mined in ${seconds}sec`;
      button.disabled = true;
      diff.addEventListener("change", () => { button.disabled = false; button.innerHTML = "Mine"; });
    
      ["index", "data", "nonce"].forEach(type => {
        const inp = document.getElementById(blockEl[type]);
        inp.addEventListener("input", () => {
          button.disabled = false;
          button.innerHTML = "Mine";
          statusEl.innerText = "Status: ⚠️ Needs Mining";
          statusEl.style.color = "orange";
        })
      });

    });



  });

  

});

