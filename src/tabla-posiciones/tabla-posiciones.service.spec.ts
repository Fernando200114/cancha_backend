import { Test, TestingModule } from '@nestjs/testing';
import { TablaPosicionesService } from './tabla-posiciones.service';

describe('TablaPosicionesService', () => {
  let service: TablaPosicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablaPosicionesService],
    }).compile();

    service = module.get<TablaPosicionesService>(TablaPosicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
