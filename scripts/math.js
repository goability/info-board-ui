let multiplicands = [9,9];
let multiplyChangeEquationSeconds = 7;
let multipleRefreshSolution = 5;
setInterval(updateMultiply, multiplyChangeEquationSeconds*1000);

function updateMultiply(){
	multiplicands.forEach((item, index) => {
		multiplicands[index] = Math.random() * 12 + 0
	});
	var elMult1 = document.getElementById("mult1");
	var elMult2 = document.getElementById("mult2");
	var elProduct = document.getElementById("product");

	elMult1.innerHTML = multiplicands[0].toFixed(0);
	elMult2.innerHTML = multiplicands[1].toFixed(0);
	let product = (multiplicands[0].toFixed(0) * multiplicands[1].toFixed(0)).toFixed(0);
	elProduct.innerHTML = "???";
	
	setTimeout(() => {
		elProduct.innerHTML = product;
	}, multipleRefreshSolution*1000);	
}