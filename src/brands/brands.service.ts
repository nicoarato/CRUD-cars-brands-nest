import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';


import { Brand } from './entities/brand.entity';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';


@Injectable()
export class BrandsService {


  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    //   updatedAt: new Date().getTime()
    // }
  ]


  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(b => b.id === id);
    if (!brand) throw new NotFoundException(`Brand with id "${id}" not found`)
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDB = this.findOne(id);
    this.brands = this.brands.map(b => {
      if (b.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto }
        return brandDB;
      }
      return b;
    })

    return brandDB;
  }

  remove(id: string) {
    this.brands = this.brands.filter(b => b.id !== id);
  }

  fillBrandsWithSeedData(data) {
    this.brands = data;
  }
}
