import { TestBed } from '@angular/core/testing';

import { JwthttpInterceptorService } from './jwthttp-interceptor.service';

describe('JwthttpInterceptorService', () => {
  let service: JwthttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwthttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
