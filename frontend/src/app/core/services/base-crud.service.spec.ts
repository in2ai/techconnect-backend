import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { API_URL } from '../tokens/api-url.token';

interface TestEntity {
  id: string;
  name: string;
}

@Injectable()
class TestService extends BaseCrudService<TestEntity> {
  protected endpoint = 'test-entities';
}

describe('BaseCrudService', () => {
  let service: TestService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: '/api' },
        TestService,
      ],
    });
    service = TestBed.inject(TestService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should list entities with pagination', () => {
    const mockEntities: TestEntity[] = [{ id: '1', name: 'Test' }];
    service.list(0, 10).subscribe((result) => {
      expect(result).toEqual(mockEntities);
    });
    const req = httpTesting.expectOne('/api/test-entities?offset=0&limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntities);
  });

  it('should get entity by id', () => {
    const mockEntity: TestEntity = { id: '42', name: 'Item 42' };
    service.get('42').subscribe((result) => {
      expect(result).toEqual(mockEntity);
    });
    const req = httpTesting.expectOne('/api/test-entities/42');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntity);
  });

  it('should create entity', () => {
    const body = { name: 'New' };
    const created: TestEntity = { id: '99', name: 'New' };
    service.create(body).subscribe((result) => {
      expect(result).toEqual(created);
    });
    const req = httpTesting.expectOne('/api/test-entities');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush(created);
  });

  it('should update entity', () => {
    const body = { name: 'Updated' };
    const updated: TestEntity = { id: '1', name: 'Updated' };
    service.update('1', body).subscribe((result) => {
      expect(result).toEqual(updated);
    });
    const req = httpTesting.expectOne('/api/test-entities/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(updated);
  });

  it('should delete entity', () => {
    service.delete('1').subscribe((result) => {
      expect(result).toEqual({ ok: true });
    });
    const req = httpTesting.expectOne('/api/test-entities/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ ok: true });
  });
});
