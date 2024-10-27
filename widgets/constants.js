import { getDeviceInfo } from "@zos/device";

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
export const BAR_HEIGHT = 64;
export const PADDING = 16;
export const GAP = 8;