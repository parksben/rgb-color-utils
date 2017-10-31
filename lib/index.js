'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolate = exports.gradientColor = exports.parseColor = exports.rgbToList = exports.hexToList = undefined;

require('core-js/shim');

var hexToList = exports.hexToList = function hexToList(str) {
  var colorStr = str.length === 4 ? str.replace(/^#/, '').replace(/(.)/g, '$1$1') : str.replace(/^#/, '');
  var rgb = [colorStr.slice(0, 2), colorStr.slice(2, 4), colorStr.slice(4, 6)].map(function (x) {
    return parseInt(x, 16);
  });
  return rgb;
};

var rgbToList = exports.rgbToList = function rgbToList(str) {
  return str.replace(/(^rgb\(|\)$)/g, '').split(/\s*,\s*/g).map(function (x) {
    return parseInt(x, 10);
  });
};

var parseColor = exports.parseColor = function parseColor(str) {
  if (/^#(.{3}|.{6})$/.test(str)) {
    return hexToList(str);
  }
  if (/^rgb\((\d+,\s?){2}\d+\)$/.test(str)) {
    return rgbToList(str);
  }
  return 'Invalid color string.';
};

var gradientColor = exports.gradientColor = function gradientColor(start, end, step) {
  var startRGB = {
    r: parseColor(start)[0],
    g: parseColor(start)[1],
    b: parseColor(start)[2]
  };
  var endRGB = {
    r: parseColor(end)[0],
    g: parseColor(end)[1],
    b: parseColor(end)[2]
  };
  var sn = {
    r: (endRGB.r - startRGB.r) / step,
    g: (endRGB.g - startRGB.g) / step,
    b: (endRGB.b - startRGB.b) / step
  };

  var colorArr = [];
  for (var i = 0; i < step; i++) {
    var hexArr = [Math.round(startRGB.r + i * sn.r).toString(16), Math.round(startRGB.g + i * sn.g).toString(16), Math.round(startRGB.b + i * sn.b).toString(16)];
    colorArr.push('#' + hexArr.join(''));
  }

  return colorArr;
};

var interpolate = exports.interpolate = function interpolate(start, end, rate) {
  return gradientColor(start, end, 256)[Math.floor(256 * rate)];
};