import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Selector } from '@ngxs/store';
import { lastValueFrom, take, tap } from 'rxjs';
import { ICount } from '../../model/count.model';
import { JsonPlaceHolderTodoService } from '../../services/json-place-holder-todo.service';
import { AddCount } from '../action/count.action';

const COUNT_STATE_TOKEN = new StateToken<ICount>('count');
@State<ICount>({
    name: COUNT_STATE_TOKEN,
    defaults: {
        count: 0
    }
})

@Injectable()
export class CountState {

    constructor(private service: JsonPlaceHolderTodoService) { }

    @Selector()
    static getCount(state: ICount) {
        return state;
    }

    @Action(AddCount)
    addCount({ getState, setState }: StateContext<ICount>) {
        /*
        // Promise: Fire and Forget (not returning the handle)
        const todos$ = this.service.getTodos(1).pipe(take(1));
        lastValueFrom(todos$).then(() => {
            const countState = getState();
            setState({ count: countState.count + 1 });
        });
        */

        /*
        // Promise: Fire and wait (returning the handle)
        const todos$ = this.service.getTodos(1).pipe(take(1));
        return lastValueFrom(todos$).then(() => {
            const countState = getState();
            setState({ count: countState.count + 1 });
        });

        */

        // Observable: fire and wait (returning the handle)
        // Doesn't Work with Webpack MFE (remote) with http client doesn't work
        /**
         * if shared libraries such as -
         * "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
         * "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
         * "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
         * "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' }
         * are removed from webpack.config.json it works!
         */
        return this.service.getTodos(1)
            .pipe(
                tap(() => {
                    const countState = getState();
                    setState({ count: countState.count + 1 });
                })
            );

        /*
        // Observable: fire and wait (returning the handle)
        // Work with Webpack MFE (remote) with if http client is not involved
        return this.service.fakeCall()
            .pipe(
                tap(() => {
                    const countState = getState();
                    setState({ count: countState.count + 1 });
                })
            );
        */
       
        /*
        // Observable: fire and forget (not returning the handle)
        this.service.getTodos(1).subscribe(() => {
            const countState = getState();
            setState({ count: countState.count + 1 });
        });
        */
    }
}