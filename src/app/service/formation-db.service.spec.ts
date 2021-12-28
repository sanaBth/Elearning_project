import { TestBed } from '@angular/core/testing';

import { FormationDbService } from './formation-db.service';

describe('FormationDbService', () => {
  let service: FormationDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
