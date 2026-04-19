import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Device from "expo-device";

export const getDeviceInfo = () => {
  return {
    // DEVICE INFO
    brand: Device.brand,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    deviceName: Device.deviceName,
    osName: Device.osName,
    osVersion: Device.osVersion,
    totalMemory: Device.totalMemory,
    isDevice: Device.isDevice,

    // APP INFO
    appName: Application.applicationName,
    bundleId: Application.applicationId,
    version: Application.nativeApplicationVersion,
    buildVersion: Application.nativeBuildVersion,

    appOwnership: Constants.appOwnership,
  };
};
