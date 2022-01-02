import { TestBed } from '@angular/core/testing';

import { QuizstorageService } from './quizstorage.service';

describe('QuizstorageService', () => {
  let service: QuizstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
