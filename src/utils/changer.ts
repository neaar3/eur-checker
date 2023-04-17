
export async function valueToChange(value: number | undefined): Promise<number|undefined> {
    if (value) {
        const floatValue = value / 100;
        return parseFloat(floatValue.toFixed(5))
    }
    
    return undefined;
}