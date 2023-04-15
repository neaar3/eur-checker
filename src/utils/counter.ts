let count = 0;

export function counter (increase: boolean) {
    if(count === 50) {
        count = 0
        return;
    }

    if (increase) {
        count++;
        return;
    }

    return count;
}