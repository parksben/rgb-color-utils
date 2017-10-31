import 'core-js/shim';

export const hexToList = str => {
  const colorStr =
    str.length === 4
      ? str.replace(/^#/, '').replace(/(.)/g, '$1$1')
      : str.replace(/^#/, '');
  const rgb = [
    colorStr.slice(0, 2),
    colorStr.slice(2, 4),
    colorStr.slice(4, 6),
  ].map(x => parseInt(x, 16));
  return rgb;
};

export const rgbToList = str =>
  str
    .replace(/(^rgb\(|\)$)/g, '')
    .split(/\s*,\s*/g)
    .map(x => parseInt(x, 10));

export const parseColor = str => {
  if (/^#(.{3}|.{6})$/.test(str)) {
    return hexToList(str);
  }
  if (/^rgb\((\d+,\s?){2}\d+\)$/.test(str)) {
    return rgbToList(str);
  }
  return 'Invalid color string.';
};

export const gradientColor = (start, end, step) => {
  const startRGB = {
    r: parseColor(start)[0],
    g: parseColor(start)[1],
    b: parseColor(start)[2],
  };
  const endRGB = {
    r: parseColor(end)[0],
    g: parseColor(end)[1],
    b: parseColor(end)[2],
  };
  const sn = {
    r: (endRGB.r - startRGB.r) / step,
    g: (endRGB.g - startRGB.g) / step,
    b: (endRGB.b - startRGB.b) / step,
  };

  const colorArr = [];
  for (let i = 0; i < step; i++) {
    const hexArr = [
      Math.round(startRGB.r + i * sn.r).toString(16),
      Math.round(startRGB.g + i * sn.g).toString(16),
      Math.round(startRGB.b + i * sn.b).toString(16),
    ];
    colorArr.push(`#${hexArr.join('')}`);
  }

  return colorArr;
};

export const interpolate = (start, end, rate) =>
  gradientColor(start, end, 256)[Math.floor(256 * rate)];
