import { TestBed } from '@angular/core/testing';

import { BuildQuestionerTableService } from './build-questioner-table.service';

describe('BuildQuestionerTableService', () => {
  let service: BuildQuestionerTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildQuestionerTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
