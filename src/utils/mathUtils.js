//计算2个数的最大公因数
function gcd(a, b) {
    // 欧几里得算法计算GCD
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

//计算2个数的最小公倍数
export const lcm=(a, b)=> {
    if (a === 0 || b === 0) {
        return 0; // 如果其中一个数为0，则LCM为0
    }
    // 计算LCM
    return Math.abs(a * b) / gcd(a, b);
}