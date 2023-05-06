import { Loader, Overlay, useMantineTheme } from '@mantine/core';

export const AppLoader = () => {
  const { colors } = useMantineTheme();

  return (
    <Overlay color={colors.blackVariants[2]} opacity={0.2} center>
      <Loader size="xl" color={colors.blueVariants[0]} />
    </Overlay>
  );
};
