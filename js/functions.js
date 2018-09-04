Array.prototype.rnd = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.fillRange = function(start, end){
    if(this.length > 0){
        throw new Error("Array is not empty")
    }
    else if(start>end){
        throw new Error("Range 'start' must be less than 'end'")
    }
    else{
        for(let i = start; i<=end; i++){
            this.push(i)
        }
    }
    return this;
}


//TESTS 
/*
var numbers = [];
numbers.fillRange(100,200);  //correct
numbers.fillRange(500,500);  //correct just one number
numbers.fillRange(500,1000); //incorrect with previous calls
console.table(numbers);
*/
