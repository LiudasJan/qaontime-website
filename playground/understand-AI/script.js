let model;
let isTrained = false;

let canvas = document.getElementById("network");
let ctx = canvas.getContext("2d");

const inputLayerSize = 2;
const hiddenLayerSize = 4;
const outputLayerSize = 2;

const positions = {
  input: [{ x: 100, y: 100 }, { x: 100, y: 200 }],
  hidden: [{ x: 300, y: 60 }, { x: 300, y: 120 }, { x: 300, y: 180 }, { x: 300, y: 240 }],
  output: [{ x: 500, y: 120 }, { x: 500, y: 180 }]
};

let latestActivations = {
  input: [0, 0],
  hidden: [0, 0, 0, 0],
  output: [0, 0]
};

function onTrainingDataChanged() {
  document.getElementById("predict-btn").disabled = true;
  isTrained = false;
  document.getElementById("output").innerText = "AI thinks it's a: ❓";
  drawNetwork(latestActivations); // Clear visuals
}

function updateInput() {
  const w = parseFloat(document.getElementById("weight").value);
  const e = parseFloat(document.getElementById("ears").value);

  document.getElementById("weight-val").innerText = w;
  document.getElementById("ears-val").innerText = e;

  // Tik input aktyvacijos atnaujinamos – realus grįžtamasis ryšys
  latestActivations.input = [w / 10000, e / 20];

  // Atvaizduojam tik input sluoksnio aktyvacijas
  drawNetwork(latestActivations);
}


async function trainModel() {
  const raw = document.getElementById("training-data").value.trim().split("\n");
  const inputs = [];
  const labels = [];

  raw.forEach(line => {
    const [weight, ears, label] = line.split(",");
    inputs.push([
        parseFloat(weight) / 15000, // svarbiausia
        parseFloat(ears) / 20       // normalizuotas ausų ilgis
        ]);
    labels.push(label.trim() === "rabbit" ? [1, 0] : [0, 1]);
  });



  const xs = tf.tensor2d(inputs);
  const ys = tf.tensor2d(labels);

  model = tf.sequential();
  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [2], units: 8, activation: "relu" }));  // daugiau galios
  model.add(tf.layers.dense({ units: 6, activation: "relu" }));  // antras paslėptas sluoksnis
  model.add(tf.layers.dense({ units: 2, activation: "softmax" }));  // išėjimas

  model.compile({ loss: "categoricalCrossentropy", optimizer: "adam" });

  await model.fit(xs, ys, { epochs: 300, shuffle: true });

  xs.dispose();
  ys.dispose();

  isTrained = true;
  document.getElementById("predict-btn").disabled = false;
  drawNetwork(latestActivations);
}

function getColorFromActivation(value) {
  return `rgba(255, 204, 0, ${value})`;
}

function drawNetwork(activations) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < inputLayerSize; i++) {
    for (let j = 0; j < hiddenLayerSize; j++) {
      ctx.beginPath();
      ctx.moveTo(positions.input[i].x, positions.input[i].y);
      ctx.lineTo(positions.hidden[j].x, positions.hidden[j].y);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }
  }

  for (let i = 0; i < hiddenLayerSize; i++) {
    for (let j = 0; j < outputLayerSize; j++) {
      ctx.beginPath();
      ctx.moveTo(positions.hidden[i].x, positions.hidden[i].y);
      ctx.lineTo(positions.output[j].x, positions.output[j].y);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }
  }

  function drawLayer(layer, activations, labels = []) {
    for (let i = 0; i < layer.length; i++) {
      const pos = layer[i];
      const act = activations[i];
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = getColorFromActivation(act);
      ctx.fill();
      ctx.strokeStyle = "#999";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(act.toFixed(2), pos.x, pos.y + 4);
      if (labels[i]) {
        ctx.fillText(labels[i], pos.x + 60, pos.y + 4);
      }
    }
  }

  drawLayer(positions.input, latestActivations.input);
  drawLayer(positions.hidden, latestActivations.hidden);
  drawLayer(positions.output, latestActivations.output, ["🐇 Rabbit", "🐶 Dog"]);
}

async function predict() {
  if (!model || !isTrained) return;

  // Disable button and show spinner
  const btn = document.getElementById("predict-btn");
  const text = document.getElementById("predict-text");
  const spinner = document.getElementById("spinner");
  btn.disabled = true;
  text.innerText = "Thinking...";
  spinner.style.display = "inline";

  await trainModel();  // Jei reikia – bet dažnai čia nereikia iš naujo treniruoti

  const w = parseFloat(document.getElementById("weight").value);
  const e = parseFloat(document.getElementById("ears").value);
  const inputTensor = tf.tensor2d([[w / 15000, e / 20]]);

  const intermediate = tf.model({ inputs: model.inputs, outputs: model.layers[0].output });
  const hiddenOut = intermediate.predict(inputTensor).dataSync();
  const outputOut = model.predict(inputTensor).dataSync();

  latestActivations.input = [w / 10000, e / 20];
  latestActivations.hidden = Array.from(hiddenOut);
  latestActivations.output = Array.from(outputOut);

  drawNetwork(latestActivations);

  const resultIndex = outputOut[0] > outputOut[1] ? 0 : 1;
  const label = resultIndex === 0 ? "🐇 Rabbit" : "🐶 Dog";
  document.getElementById("output").innerText =
    `AI thinks it's a: ${label}\n(Rabbit: ${(outputOut[0] * 100).toFixed(1)}%, Dog: ${(outputOut[1] * 100).toFixed(1)}%)`;

  inputTensor.dispose();

  // Re-enable button and reset spinner
  btn.disabled = false;
  text.innerText = "What is it?";
  spinner.style.display = "none";
}

