const risk1 = require('../../assets/braIcons/bra1.png');
const risk2 = require('../../assets/braIcons/bra2.png');
const risk3 = require('../../assets/braIcons/bra3.png');
const risk4 = require('../../assets/braIcons/bra4.png');
const risk5 = require('../../assets/braIcons/bra5.png');
const noInfo = require('../../assets/braIcons/noInfo.png');




export default function selectBraIcon(braIcon) {
  switch (braIcon) {
    case '1':
      return risk1;
    case '2':
      return risk2;
    case '3':
      return risk3;
    case '4':
      return risk4;
    case '5':
      return risk5;
    default:
      return noInfo; // default icon
  }
}
