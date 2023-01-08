namespace API.DTO_s
{
    public class CarReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public int Year { get; set; }
        public string Fuel { get; set; }
        public double Price { get; set; }
        public string CarBrand { get; set; }
        public string CarType { get; set; }
        public IEnumerable<PhotoToReturnDto> Photos { get; set; }
    }
}
