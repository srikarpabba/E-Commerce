export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  productGender: string;
  productAgeGroup: string;
  photos: Photo[];
}

export class Product implements Product {}

export interface Photo {
  id: number;
  pictureUrl: string;
  fileName: string;
  isMain: boolean;
}

export interface ProductToCreate {
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
  productGenderId: number;
  productAgeGroupId: number;
}

export class ProductFormValues implements ProductToCreate {
  name: '';
  description: '';
  price: 0;
  pictureUrl: '';
  productTypeId: number;
  productBrandId: number;
  productGenderId: number;
  productAgeGroupId: number;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
}
