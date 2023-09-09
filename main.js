// NOTE: DATA
const url = "https://learnwitheunjae.dev/api/sinabro-js/ecommerce";

async function main() {
  const responses = await fetch(url);
  const products = await responses.json();

  docjument.querySelector("#products").innerHTML = products
    .map(
      (product) =>
        `
    <div class="product">
    <img src=""/>
    <p>${product.name}</p>
    </div>
    `
    )
    .join("");
}

main();
