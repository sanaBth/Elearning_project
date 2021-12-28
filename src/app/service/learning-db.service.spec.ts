import { TestBed } from '@angular/core/testing';

import { LearningDbService } from './learning-db.service';

describe('LearningDbService', () => {
  let service: LearningDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
