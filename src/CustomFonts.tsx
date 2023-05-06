import { Global } from '@mantine/core';

import interBold from '/fonts/Inter/Inter-Bold.ttf';
import interMedium from '/fonts/Inter/Inter-Medium.ttf';
import interRegular from '/fonts/Inter/Inter-Regular.ttf';
import interSemiBold from '/fonts/Inter/Inter-SemiBold.ttf';
import openSansSemiBold from '/fonts/OpenSans/OpenSans-SemiBold.ttf';
import poppinsRegular from '/fonts/Poppins/Poppins-Regular.ttf';
import poppinsSemiBold from '/fonts/Poppins/Poppins-SemiBold.ttf';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Inter Regular',
            src: `url('${interRegular}') format("truetype")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter Bold',
            src: `url('${interBold}') format("truetype")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter SemiBold',
            src: `url('${interSemiBold}') format("truetype")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter Medium',
            src: `url('${interMedium}') format("truetype")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Poppins Regular',
            src: `url('${poppinsRegular}') format("truetype")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Poppins SemiBold',
            src: `url('${poppinsSemiBold}') format("truetype")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Open Sans SemiBold',
            src: `url('${openSansSemiBold}') format("truetype")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
