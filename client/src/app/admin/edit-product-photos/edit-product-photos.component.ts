import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/models/product';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-photos',
  templateUrl: './edit-product-photos.component.html',
  styleUrls: ['./edit-product-photos.component.scss']
})
export class EditProductPhotosComponent implements OnInit {
  @Input() product: Product;
  addPhotoMode = false;
  progress = 0;

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  addPhotoModeToggle(): void {
    this.addPhotoMode = !this.addPhotoMode;
  }

  uploadFile(file: File): void {
    this.adminService.uploadImage(file, this.product.id).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.product = event.body;
          setTimeout(() => {
            this.progress = 0;
            this.addPhotoMode = false;
          }, 1500);
          break;
      }
    }, error => {
      if (error.errors) {
        this.toast.error(error.errors[0], 'Error');
      } else {
        this.toast.error('Problem uploading image', 'Error');
      }

      this.progress = 0;
    });
  }

  deletePhoto(photoId: number): void {
    this.adminService.deleteProductPhoto(photoId, this.product.id).subscribe(() => {
      const photoIndex = this.product.photos.findIndex(x => x.id === photoId);
      this.product.photos.splice(photoIndex, 1);
    }, error => {
      this.toast.error('Problem deleting photo');
      console.log(error);
    });
  }

  setMainPhoto(photoId: number): void {
    this.adminService.setMainPhoto(photoId, this.product.id).subscribe((product: Product) => {
      this.product = product;
    });
  }
}
