import { haversineDistance, Position } from './geo'

export const progress = (start: Position, current: Position, finish: Position) => {
  if (start && finish && current) {
    return 100.0 * (1.0 - Math.min(1.0, haversineDistance(current, finish) / haversineDistance(start, finish)));
  }
  return 0.0;
}
