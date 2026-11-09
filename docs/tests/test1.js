
function lucasLehmer(p) {
    const M = 2n ** BigInt(p) - 1n;
    let r = 4n;

    for (let k = 2; k < p; k++) {
        r = (r * r - 2n) % M;
    }

    return r === 0n;
}

// test
const exponents = [521, 547, 593, 607];

for (const p of exponents) {
    const result = lucasLehmer(p);

    console.log(
        `M_${p} = 2^${p} - 1: ${result ? "Prime" : "Composite"}`
    );
}
