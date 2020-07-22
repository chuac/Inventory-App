let current = [1, 2, 3];
let selected = [1, 2, 3, 4, 5];

let toAdd = [];
let toDelete = [];
for (let i = 0; i < current.length; i++) {

    if (!(selected.includes(current[i]))) {
        console.log(current[i]);
        toDelete.push(current[i]);
    }
}
for (let j = 0; j < selected.length; j++) {
    if (!(current.includes(selected[j]))) {

        toAdd.push(selected[j]);
    }
}

console.log(`------toAdd`)
for (let el of toAdd) {
    console.log(el);
}

console.log(`------toDelete`)
for (let el of toDelete) {
    console.log(el);
}