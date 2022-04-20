using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecificication : BaseSpecifcation<Product>
    {
        public ProductWithFiltersForCountSpecificication(ProductSpecParams productParams)  : base(x => 
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
            (!productParams.GenderId.HasValue || x.ProductGenderId == productParams.GenderId) &&
            (!productParams.AgeGroupId.HasValue || x.ProductAgeGroupId == productParams.AgeGroupId))
        {
            
        }
        
    }
}