import { px } from "@zos/utils";

import { getDeviceInfo } from "@zos/device";

export const TEXT_STYLE = {
  x: px(0),
  y: px(0),
}

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
export const BAR_HEIGHT = 64;
export const PADDING = 16;
export const GAP = 8;
export const H1_FONT_SIZE = 20;
export const H1_SIZE = 26;