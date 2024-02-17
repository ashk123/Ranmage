function generateRandom(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

function generateRandomHeight(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  let org = rand.toString() + "px";

  return org;
}

async function GetImages() {
  let result = await fetch("https://picsum.photos/" + "1024");
  console.log(result.url);
  // return await result.blob();
  return await result.url;
}

export { GetImages, generateRandom };
