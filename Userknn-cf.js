const ui = [
  { name: "A", evaluate: [1, 4, 5, 0, 3] },
  { name: "B", evaluate: [5, 1, 0, 5, 2] },
  { name: "C", evaluate: [4, 1, 2, 5, 0] },
  { name: "D", evaluate: [0, 3, 4, 0, 4] },
];

const K = 2;

// tim item lon nhat
const maxItems = ui.sort((x, y) => y.evaluate.length - x.evaluate.length)[0]
  .evaluate.length;
const maxUsers = ui.length;

const simCos = [];

console.log("----Khoitao-----");
console.log(ui);
try {
  for (let i = 0; i < maxUsers; i++) {
    simCos.push([]);

    for (let j = 0; j < i; j++) {
      simCos[i][j] = 0;
    }

    for (let j = i; j < maxUsers; j++) {
      if (j === i) {
        simCos[i][j] = 1;
      } else {
        let sumRue = 0;
        let sumPowRu = 0;
        let sumPowRe = 0;
        for (let k = 0; k < maxItems; k++) {
          if (ui[i].evaluate[k] > 0 && ui[j].evaluate[k] > 0) {
            sumRue += ui[i].evaluate[k] * ui[j].evaluate[k];
            sumPowRu += Math.pow(ui[i].evaluate[k], 2);
            sumPowRe += Math.pow(ui[j].evaluate[k], 2);
          }
        }

        simCos[i][j] =
          Math.round(
            100 * (sumRue / (Math.sqrt(sumPowRu) * Math.sqrt(sumPowRe)))
          ) / 100;
      }
    }
  }
  console.log("----SimCos-----");
  console.log(simCos);
  for (let i = 0; i < maxUsers; i++) {
    let simSort = [];
    for (let k = 0; k < maxUsers; k++) {
      if (k != i) {
        if (k > i) {
          simSort.push({ sim: simCos[i][k], name: ui[k].name, index: k });
        } else {
          simSort.push({ sim: simCos[k][i], name: ui[k].name, index: k });
        }
      }
    }
    simSort = simSort.sort((a, b) => b.sim - a.sim).slice(0, K);
    for (let j = 0; j < maxItems; j++) {
      if (ui[i].evaluate[j] === 0) {
        let sumSimUi = 0;
        let sumSim = 0;
        for (let k = 0; k < K; k++) {
          sumSimUi += simSort[k].sim * ui[k].evaluate[j];
          sumSim += simSort[k].sim;
        }

        ui[i].evaluate[j] = Math.round(100 * (sumSimUi / sumSim)) / 100;
      }
    }
  }

  console.log("--------------");
  console.log(ui);
} catch (e) {
  console.log(e);
}
