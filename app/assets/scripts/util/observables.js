import { Subject, BehaviorSubject } from 'rxjs';

/**
 * Used to broadcast the match generator level
 */
const level$ = new BehaviorSubject(undefined);

const newGuestData$ = new Subject();

const selectedPlayersData$ = new BehaviorSubject(undefined);

export {
    level$,
    newGuestData$,
    selectedPlayersData$
};
