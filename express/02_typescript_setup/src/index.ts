function add(...args: number[]): number {
    return args.reduce((prev, curr) => prev + curr, 0);
}

console.log(add(1));
console.log(add(1, 2));
console.log(add(1, 2, 3, 4, 5));