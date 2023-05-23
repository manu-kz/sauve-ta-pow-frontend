const Sunny = require('../../assets/weatherIcon/1.png');
const MostlySunny = require('../../assets/weatherIcon/2.png');
const PartlySunny = require('../../assets/weatherIcon/3.png');
const IntermittentClouds = require('../../assets/weatherIcon/4.png');
const HazySunshine = require('../../assets/weatherIcon/5.png');
const MostlyCloudy = require('../../assets/weatherIcon/6.png');
const Cloudy = require('../../assets/weatherIcon/7.png');
const Dreary = require('../../assets/weatherIcon/8.png');
const Fog = require('../../assets/weatherIcon/11.png');
const Showers = require('../../assets/weatherIcon/12.png');
const MostlyCloudywShowers = require('../../assets/weatherIcon/13.png');
const PartlySunnywShowers = require('../../assets/weatherIcon/14.png');
const TStorms = require('../../assets/weatherIcon/15.png');
const MostlyCloudywTStorms = require('../../assets/weatherIcon/16.png');
const PartlySunnywTStorms = require('../../assets/weatherIcon/17.png');
const Rain = require('../../assets/weatherIcon/18.png');
const Flurries = require('../../assets/weatherIcon/19.png');
const MostlyCloudywFlurries = require('../../assets/weatherIcon/20.png');
const PartlySunnywFlurries = require('../../assets/weatherIcon/21.png');
const Snow = require('../../assets/weatherIcon/22.png');
const MostlyCloudywSnow = require('../../assets/weatherIcon/23.png');
const Ice = require('../../assets/weatherIcon/24.png');
const Sleet = require('../../assets/weatherIcon/25.png');
const FreezingRain = require('../../assets/weatherIcon/26.png');
const RainandSnow = require('../../assets/weatherIcon/29.png');
const Hot = require('../../assets/weatherIcon/30.png');
const Cold = require('../../assets/weatherIcon/31.png');
const Windy = require('../../assets/weatherIcon/32.png');
const Clear = require('../../assets/weatherIcon/33.png');
const MostlyClear = require('../../assets/weatherIcon/34.png');
const PartlyCloudy = require('../../assets/weatherIcon/35.png');
const IntermittentCloudsNight = require('../../assets/weatherIcon/36.png');
const HazyMoonlight = require('../../assets/weatherIcon/37.png');
const MostlyCloudyNight = require('../../assets/weatherIcon/38.png');
const PartlyCloudywShowers = require('../../assets/weatherIcon/39.png');
const MostlyCloudywShowersNight = require('../../assets/weatherIcon/40.png');
const PartlyCloudywTStorms = require('../../assets/weatherIcon/41.png');
const MostlyCloudywTStormsNight = require('../../assets/weatherIcon/42.png');
const MostlyCloudywFlurriesNight = require('../../assets/weatherIcon/43.png');
const MostlyCloudywSnowNight = require('../../assets/weatherIcon/44.png');
const Meteor = require('../../assets/weatherIcon/meteor.png');


export default function selectWeatherIcon(weatherIcon) {
  switch (weatherIcon) {
    case 1:
      return Sunny;
    case 2:
      return MostlySunny;
    case 3:
      return PartlySunny;
    case 4:
      return IntermittentClouds;
    case 5:
      return HazySunshine;
    case 6:
      return MostlyCloudy;
    case 7:
      return Cloudy;
    case 8:
      return Dreary;
    case 11:
      return Fog;
    case 12:
      return Showers;
    case 13:
      return MostlyCloudywShowers;
    case 14:
      return PartlySunnywShowers;
    case 15:
      return TStorms;
    case 16:
      return MostlyCloudywTStorms;
    case 17:
      return PartlySunnywTStorms;
    case 18:
      return Rain;
    case 19:
      return Flurries;
    case 20:
      return MostlyCloudywFlurries;
    case 21:
      return PartlySunnywFlurries;
    case 22:
      return Snow;
    case 23:
      return MostlyCloudywSnow;
    case 24:
      return Ice;
    case 25:
      return Sleet;
    case 26:
      return FreezingRain;
    case 29:
      return RainandSnow;
    case 30:
      return Hot;
    case 31:
      return Cold;
    case 32:
      return Windy;
    case 33:
      return Clear;
    case 34:
      return MostlyClear;
    case 35:
      return PartlyCloudy;
    case 36:
      return IntermittentCloudsNight;
    case 37:
      return HazyMoonlight;
    case 38:
      return MostlyCloudyNight;
    case 39:
      return PartlyCloudywShowers;
    case 40:
      return MostlyCloudywShowersNight;
    case 41:
      return PartlyCloudywTStorms;
    case 42:
      return MostlyCloudywTStormsNight;
    case 43:
      return MostlyCloudywFlurriesNight;
    case 44:
      return MostlyCloudywSnowNight;
    default:
      return Meteor; // default icon
  }
}
