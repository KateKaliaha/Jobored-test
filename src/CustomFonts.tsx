import { Global } from '@mantine/core';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Inter Regular',
            src: `url(./fonts/Inter/Inter-Regular.ttf) format("truetype")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter Bold',
            src: `url(./fonts/Inter/Inter-Bold.ttf) format("truetype")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter SemiBold',
            src: `url./fonts/Inter/Inter-SemiBold.ttf) format("truetype")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter Medium',
            src: `url(./fonts/Inter/Inter-Medium.ttf) format("truetype")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Poppins Regular',
            // src: `url('${poppinsRegular}') format("truetype")`,
            src: `url(./fonts/Poppins/Poppins-Regular.ttf) format("truetype")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Poppins SemiBold',
            src: `url(./fonts/Poppins/Poppins-SemiBold.ttf) format("truetype")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Open Sans SemiBold',
            src: `url(./fonts/OpenSans/OpenSans-SemiBold.ttf) format("truetype")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
