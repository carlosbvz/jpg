import { Subject} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

/**
 * Used to broadcast the match generator level
 */
const level$ = new BehaviorSubject(undefined);

const newGuestName$ = new Subject();

const totalPlayers$ = new BehaviorSubject(undefined);

export {
    level$,
    newGuestName$,
    totalPlayers$
}