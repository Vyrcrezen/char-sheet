export function convHexToRgb(hexColor) {
    return {
        r: parseInt(hexColor.substr(1, 2), 16),
        g: parseInt(hexColor.substr(3, 2), 16),
        b: parseInt(hexColor.substr(5, 2), 16),
    };
}

export function convRgbToHex(rgbString) {
    const rgbValues = rgbString.split(',');

    const rgbR = parseInt(rgbValues[0].replaceAll(' ', ''), 10);
    const rgbG = parseInt(rgbValues[1].replaceAll(' ', ''), 10);
    const rgbB = parseInt(rgbValues[2].replaceAll(' ', ''), 10);

    const hexR = (rgbR.toString(16).length === 1) ? `0${rgbR.toString(16)}` : rgbR.toString(16);
    const hexG = (rgbG.toString(16).length === 1) ? `0${rgbG.toString(16)}` : rgbG.toString(16);
    const hexB = (rgbB.toString(16).length === 1) ? `0${rgbB.toString(16)}` : rgbB.toString(16);

    return `#${hexR}${hexG}${hexB}`;
}
