namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address ()
        {
            
        }
        public Address(string firstName, string lastName, string phoneNumber, string addressLine, string city, string state, string zipCode)
        {
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            AddressLine = addressLine;
            City = city;
            State = state;
            ZipCode = zipCode;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber {get; set;}
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
    }
}