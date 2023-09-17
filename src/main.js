/*
//NOTE: ?raw vite의 기능 
js가 아닌 파일의 내용을 텍스트로 읽어서 가져올수 있음 */
import testData from "./test.json?raw";

// NOTE: DATA
const url = "https://learnwitheunjae.dev/api/sinabro-js/ecommerce";

async function getProducts() {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(testData);
  } else {
    const response = await fetch(url);
    return await response.json();
  }
}

async function main() {
  const products = await getProducts();

  console.log("getProducts()", products);

  document.querySelector("#products").innerHTML = products
    .map(
      (product) => `
  <div>
  <img src="${product.images[0]}" alt="Images of ${product.name}"/>
  <p>${product.name}</p>
  </div>
  <div>
  <div class="flex items-center justify-between">
<span>Price: ${product.regularPrice} <span>
<div>
<button type="button" class="btn-decrease bg-green-200 py-1 px-3 rounded-full text-green-800 hovder:bg-green-300">-</button>
<span class="text-green-800 hidden"> 3</span>
<button type="button" class="btn-increase bg-green-200 py-1 px-3 rounded-full text-green-800 hovder:bg-green-300">+</button>
</div>
</div>
  </div>
`
    )
    .join("");

  // document.querySelectorAll("");
}

main();
