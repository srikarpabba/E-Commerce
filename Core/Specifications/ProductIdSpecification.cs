using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductIdSpecification : BaseSpecifcation<Product>
    {
        public ProductIdSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(p => p.Photos);
        }
    }
}