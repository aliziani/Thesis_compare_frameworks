import { TestBed } from '@angular/core/testing';

import { TodostoreService } from './todostore.service';

describe('TodostoreService', () => {
  let service: TodostoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodostoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
