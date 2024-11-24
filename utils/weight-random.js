export function weightRandom(weights){
    const min = Math.min(...weights);
    if(min <= 0){
        weights = weights.map(i=>i+min + 0.01);
    }
    const sum = weights.reduce((a,i)=>a+i);
    const random = Math.random()*sum;
    let b = 0;
    for(let i = 0; i < weights.length; i++){
        b+= weights[i];
        if(random< b){
            return i;
        }
    }
    return 0;
}