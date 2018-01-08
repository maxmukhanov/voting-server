import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handles NEXT', () => {
        const state = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = {type: 'NEXT'};

        let nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }))

    });

    it('handles VOTE', () => {
        const state = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};

        let nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting': 1
                }
            },
            entries: []
        }))
    });

    it('initializes state if undefined', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(undefined, {});
        expect(nextState).to.equal(fromJS({}));
    });

    it('can be used with reduce on array', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: '28 Days Later'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}
        ];

        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    })

});