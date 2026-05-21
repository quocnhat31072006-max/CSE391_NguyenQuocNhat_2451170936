// ===================== B3 - HIGHER ORDER FUNCTIONS =====================

// 1. PIPE
function pipe(...fns) {
    return function (input) {
        return fns.reduce((acc, fn) => fn(acc), input);
    };
}

// TEST PIPE
const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log("=== PIPE ===");
console.log(process(5));


// 2. MEMOIZE
function memoize(fn) {
    const cache = {};

    return function (n) {
        if (cache[n] !== undefined) {
            console.log("Cache hit");
            return cache[n];
        }

        console.log("Đang tính...");
        const result = fn(n);
        cache[n] = result;
        return result;
    };
}

// TEST MEMOIZE
console.log("\n=== MEMOIZE ===");

const expensiveCalc = memoize((n) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += i;
    return sum;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));


// 3. DEBOUNCE
function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// TEST DEBOUNCE
console.log("\n=== DEBOUNCE ===");

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("a");
search("ab");
search("abc");


// 4. RETRY
async function retry(fn, maxAttempts = 3) {
    let attempt = 0;

    while (attempt < maxAttempts) {
        try {
            const result = await fn();
            return result;
        } catch (err) {
            attempt++;
            console.log(`Retry ${attempt}...`);

            if (attempt === maxAttempts) {
                console.log("Failed after max attempts");
                throw err;
            }
        }
    }
}

// TEST RETRY
console.log("\n=== RETRY ===");

async function fakeAPI() {
    if (Math.random() < 0.7) {
        throw new Error("Fail request");
    }
    return "Success API";
}

retry(fakeAPI, 3)
    .then(res => console.log("Result:", res))
    .catch(err => console.log("Error:", err.message));