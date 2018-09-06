import { Subject} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

/**
 * Used to broadcast the match generator level
 */
const level$ = new BehaviorSubject(undefined)

export {
    level$
}