import { CarsService } from './../cars/cars.service';
import { BrandsService } from './../brands/brands.service';
import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';


@Injectable()
export class SeedService {

  constructor(
    private readonly carsServices: CarsService,
    private readonly brandsServices: BrandsService
  ) {

  }
  populateDB() {

    this.brandsServices.fillBrandsWithSeedData(BRANDS_SEED)
    this.carsServices.fillBrandsWithSeedData(CARS_SEED)
    return "SEED EXCECUTED succesfully"
  }
}
