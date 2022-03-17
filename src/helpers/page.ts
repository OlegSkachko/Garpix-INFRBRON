export const getPagesArray = (totalPages:number): number[] => {
    let result = [1];
    for (let i = 1; i < totalPages; i++) {
        result.push(i+1)
    }
    return result;
}