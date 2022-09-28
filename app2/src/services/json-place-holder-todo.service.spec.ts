import { TestBed } from '@angular/core/testing';

import { JsonPlaceHolderTodoService } from './json-place-holder-todo.service';

describe('JsonPlaceHolderTodoService', () => {
  let service: JsonPlaceHolderTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPlaceHolderTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
