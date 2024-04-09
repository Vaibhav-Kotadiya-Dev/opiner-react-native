import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type DimensionType = {
  height: number;
  width: number;
};

/**
 *
 * @param dimensions Dimension Type {height, width}
 * @returns resolution (pythagorean theorem)
 */
const getResolution = ({height, width}: DimensionType) =>
  Math.sqrt(height * height + width * width);

// Dimensions of current device
const dimensions = Dimensions.get('screen');
const CURRENT_RESOLUTION = getResolution(dimensions);

// Referencing iPhone11 as per the designs
const designSize = {
  height: 896,
  width: 414,
};
const DESIGN_RESOLUTION = Math.sqrt(
  designSize.height * designSize.height + designSize.width * designSize.width,
);

const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;

/**
 * Returns responsive size for the provided size
 * @param size Number of pixels
 * @returns Responsive value
 */
const rs = (size: number) => RESOLUTIONS_PROPORTION * size;
const {width: deviceWidth, height: deviceHeight} = dimensions;

export {wp, hp, rs, deviceWidth, deviceHeight};
