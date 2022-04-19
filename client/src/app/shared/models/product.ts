export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  productGender: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id: number;
  pictureUrl: string;
  fileName: string;
  isMain: boolean;
}

export interface IProductToCreate {
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
  productGenderId: number;
}

export class ProductFormValues implements IProductToCreate {
  name: '';
  description: '';
  price: 0;
  pictureUrl: '';
  productTypeId: number;
  productBrandId: number;
  productGenderId: number;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
}
