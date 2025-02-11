
export const stringsToarray = (lines) => {
 
    return lines.split('\n\n').map(item => item.replace(/\n/g, ' '));

};
