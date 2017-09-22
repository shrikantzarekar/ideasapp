/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyinterfaceService } from './myinterface.service';

describe('MyinterfaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyinterfaceService]
    });
  });

  it('should ...', inject([MyinterfaceService], (service: MyinterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
