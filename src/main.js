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

function findElement(startingElement, selector) {
  let currentElement = startingElement;

  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}

async function main() {
  const products = await getProducts();

  document.querySelector("#products").innerHTML = products
    .map(
      (product, index) => `
  <div class="product" data-product-id="${product.id}" data-product-index="${index}">
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

  document.querySelector("#products").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");
    const productIndex = productElement.getAttribute("data-product-index");
    const product = products[productIndex];
    console.log("product", product);

    if (targetElement.matches(".btn-decrease")) {
      console.log("감소");
    } else if (targetElement.matches(".btn-increase")) {
      console.log("증가");
    }
  });
}

main();
