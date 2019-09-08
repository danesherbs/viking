import { haversineDistance, Position } from './geo'


export const progress = (start: Position, current: Position, finish: Position) => {
  return 100.0 * (1.0 - Math.min(1.0, haversineDistance(current, finish) / (haversineDistance(start, finish) + 1e-16)));
}
