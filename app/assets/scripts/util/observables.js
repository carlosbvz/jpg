import { Subject} from 'rxjs';

/**
 * Used to broadcast the match generator level
 */
const level$ = new Subject()

export {
    level$
}