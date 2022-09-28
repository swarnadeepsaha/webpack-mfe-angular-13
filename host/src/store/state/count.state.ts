import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Selector } from '@ngxs/store';
import { lastValueFrom, take, tap } from 'rxjs';
import { ICount } from 'src/model/count.model';
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

    constructor(private service: JsonPlaceHolderTodoService) {}

    @Selector()
    static getCount(state: ICount) {
        return state;
    }

    @Action(AddCount)
    addCount({ getState, setState }: StateContext<ICount>) {
        const todos$ = this.service.getTodos(1).pipe(take(1));
        return lastValueFrom(todos$).then(() => {
            const countState = getState();
            setState({ count: countState.count + 1 });
        });
        /*
        .pipe(
            tap(() => {
                const countState = getState();
                setState({ count: countState.count + 1 });
            })
        );
        */
    }
}