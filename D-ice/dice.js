var randomNumber1= 1 + (Math.floor(Math.random()*6 ));
console.log(randomNumber1);
document.getElementById("dado1").src = "/images/dice"+randomNumber1+".png";
var randomNumber2= 1 + (Math.floor(Math.random() *6));
console.log(randomNumber2);
document.getElementById("dado2").src = "/images/dice"+randomNumber2+".png";
if (randomNumber1== randomNumber2){
    document.getElementById("anouncement").innerHTML="TIE";
}else{
    if(randomNumber1>randomNumber2){
        document.getElementById("anouncement").innerHTML="Winner Player 1";
    }else{
        document.getElementById("anouncement").innerHTML="Winner Player 2";

    }
}