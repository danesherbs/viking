import { useEffect, useState } from 'react';
import { mod } from 'mathjs';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { RADIUS_EARTH_KM, GPS_TIMEOUT_MILLISECONDS, MAY_SHOW_USER_SETTINGS_DIALOG } from './constants';


export type Angle = number;
export type Position = [Angle, Angle];


export const toRad = (degrees: number) => {
  return degrees * Math.PI / 180.0;
}

export const toDeg = (radians: number) => {
  return radians * 180.0 / Math.PI;
}

const locationOptions = {
  accuracy: Location.Accuracy.BestForNavigation, 
  timeInterval: GPS_TIMEOUT_MILLISECONDS,
  mayShowUserSettingsDialog: MAY_SHOW_USER_SETTINGS_DIALOG
};

export const requestLocationPermission = async () => {
  return await Permissions.askAsync(Permissions.LOCATION);
}

export const useLocation = () => {
  const [location, setLocation] = useState<Position>([0, 0]);

  useEffect(() => {
    Location.watchPositionAsync(locationOptions,
      ({coords: {latitude, longitude}}) => {
        if (latitude !== null && longitude !== null) {
          setLocation([latitude, longitude]);
        }
      });
  }, []);

  return location;
};

export const useHeading = () => {
    const [heading, setHeading] = useState<Angle>(0);

    useEffect(() => {
      Location.watchHeadingAsync(({trueHeading}) => {
        if (trueHeading !== -1) {
          setHeading(trueHeading);
        }
      });
    }, []);
  
    return heading;
};

export const haversineDistance = ([lat1, long1]: Position, [lat2, long2]: Position) => {
  return 2 * RADIUS_EARTH_KM * Math.asin(Math.sqrt(haversine(lat1-lat2) + Math.cos(lat1) * Math.cos(lat2) * haversine(long2-long1)));
}

const haversine = (radians: number) => {
  return (1 - Math.cos(radians)) / 2.0;
}

const targetHeading = (current: Position, finish: Position) => {
  const dy: number = (finish[0] - current[0]) * RADIUS_EARTH_KM;
  const dx: number = (finish[1] - location[1]) * RADIUS_EARTH_KM;
  return Math.atan2(dx, dy);
}

const deltaHeading = (current: Position, finish: Position, heading: Angle) => {
  return targetHeading(current, finish) - heading;
}

export const degreesToTarget = (current: Position, finish: Position, heading: Angle) => {
  return mod(toDeg(deltaHeading(current, finish, heading)), 360);
}
