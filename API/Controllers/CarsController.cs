using API.DTO_s;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class CarsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IOrderService _orderService;

        public CarsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService, IOrderService orderService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<CarReturnDto>>> GetCars(
         [FromQuery] CarSpecParams carParams)
        {
            var spec = new CarWithBrandsAndTypesSpecification(carParams);
            var countSpec = new CarWithFiltersForCountSpecification(carParams);
            var totalItems = await _unitOfWork.Repository<Car>().CountAsync(countSpec);
            var cars = await _unitOfWork.Repository<Car>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Car>, IReadOnlyList<CarReturnDto>>(cars);
            return Ok(new Pagination<CarReturnDto>(carParams.PageIndex, carParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CarReturnDto>> GetCar(int id)
        {
            var spec = new CarWithBrandsAndTypesSpecification(id);
            var car = await _unitOfWork.Repository<Car>().GetEntityWithSpec(spec);
            if (car == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Car, CarReturnDto>(car);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<CarBrand>>> GetCarBrands()
        {
            return Ok(await _unitOfWork.Repository<CarBrand>().ListAllAsync());
        }

        [HttpGet("brands/{id}")]
        public async Task<ActionResult<CarBrandReturnDto>> GetCarBrand(int id)
        {
            var brand = await _unitOfWork.Repository<CarBrand>().GetByIdAsync(id);
            if (brand == null) return NotFound(new ApiResponse(404));
            return Ok(_mapper.Map<CarBrand, CarBrandReturnDto>(brand));
        }

        [HttpPost("brands")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CarBrandReturnDto>> CreateCarBrand(CarBrandCreateDto carBrandCreateDto)
        {
            var carBrand = _mapper.Map<CarBrandCreateDto, CarBrand>(carBrandCreateDto);
            _unitOfWork.Repository<CarBrand>().Add(carBrand);
            var result = await _unitOfWork.Complete();
            if (result <= 0) BadRequest(new ApiResponse(400, "problem with creating brand"));
            return _mapper.Map<CarBrand, CarBrandReturnDto>(carBrand);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/brands")]
        public async Task<ActionResult<CarBrandReturnDto>> UpdateCarBrand(int id, CarBrandCreateDto carBrandCreateDto)
        {
            var brand = await _unitOfWork.Repository<CarBrand>().GetByIdAsync(id);
            _mapper.Map(carBrandCreateDto, brand);
            _unitOfWork.Repository<CarBrand>().Update(brand);
            var result = await _unitOfWork.Complete();
            if (result <= 0) BadRequest(new ApiResponse(400, "problem updating brand"));
            return _mapper.Map<CarBrand, CarBrandReturnDto>(brand);
        }

        [HttpDelete("{id}/brands")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CarBrandReturnDto>> DeleteCarBrand(int id)
        {
            var brand = await _unitOfWork.Repository<CarBrand>().GetByIdAsync(id);
            _unitOfWork.Repository<CarBrand>().Delete(brand);
            var result = await _unitOfWork.Complete();
            if (result <= 0) return BadRequest(new ApiResponse(400, "problem with deleting brand"));
            return Ok();
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<CarType>>> GetCarTypes()
        {
            return Ok(await _unitOfWork.Repository<CarType>().ListAllAsync());
        }

        [HttpGet("types/{id}")]
        public async Task<ActionResult<IReadOnlyList<CarTypeReturnDto>>> GetCarType(int id)
        {
            var type = await _unitOfWork.Repository<CarType>().GetByIdAsync(id);
            if (type == null) return NotFound(new ApiResponse(404));
            return Ok(_mapper.Map<CarType, CarTypeReturnDto>(type));
        }


        [HttpPost("types")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CarTypeReturnDto>> CreateType(CarTypeCreateDto carTypeDto)
        {
            var carType = _mapper.Map<CarTypeCreateDto, CarType>(carTypeDto);
            _unitOfWork.Repository<CarType>().Add(carType);
            var result = await _unitOfWork.Complete();
            if (result <= 0) BadRequest(new ApiResponse(400, "Problem with creating"));
            return _mapper.Map<CarType, CarTypeReturnDto>(carType);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/types")]
        public async Task<ActionResult<CarTypeReturnDto>> UpdateCarType(int id, CarTypeCreateDto carTypeCreateDto)
        {
            var type = await _unitOfWork.Repository<CarType>().GetByIdAsync(id);
            _mapper.Map(carTypeCreateDto, type);
            _unitOfWork.Repository<CarType>().Update(type);
            var result = await _unitOfWork.Complete();
            if (result <= 0) BadRequest(new ApiResponse(400, "Problem updating brand"));
            return _mapper.Map<CarType, CarTypeReturnDto>(type);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}/types")]
        public async Task<ActionResult<CarTypeReturnDto>> DeleteCarType(int id)
        {
            var type = await _unitOfWork.Repository<CarType>().GetByIdAsync(id);
            _unitOfWork.Repository<CarType>().Delete(type);
            var result = await _unitOfWork.Complete();
            if (result <= 0) return BadRequest(new ApiResponse(400, "problem with deleting type"));
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<CarReturnDto>> CreateCar(CarCreateDto carCreateDto)
        {
            var car = _mapper.Map<CarCreateDto, Car>(carCreateDto);
            _unitOfWork.Repository<Car>().Add(car);
            var result = await _unitOfWork.Complete();
            if (result <= 0) BadRequest(new ApiResponse(400, "Problem creating car"));

            return _mapper.Map<Car, CarReturnDto>(car);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<CarReturnDto>> UpdateCar(int id, CarCreateDto carCreateDto)
        {
            var car = await _unitOfWork.Repository<Car>().GetByIdAsync(id);
            _mapper.Map(carCreateDto, car);
            _unitOfWork.Repository<Car>().Update(car);
            var result = await _unitOfWork.Complete();
            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating car"));
            return _mapper.Map<Car, CarReturnDto>(car);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCar(int id)
        {
            var car = await _unitOfWork.Repository<Car>().GetByIdAsync(id);
            foreach (var photo in car.Photos)
            {
                if (photo.Id > 18)
                {
                    _photoService.DeleteFromDisk(photo);
                }
            }

            _unitOfWork.Repository<Car>().Delete(car);
            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "problem with deleting car"));
            return Ok();
        }



        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/photo")]
        public async Task<ActionResult<CarReturnDto>> AddCarPhoto(int id, [FromQuery] CarPhotoDto carPhotoDto)
        {
            var spec = new CarWithBrandsAndTypesSpecification(id);
            var car = await _unitOfWork.Repository<Car>().GetEntityWithSpec(spec);

            if (carPhotoDto.Photo.Length > 0)
            {
                var photo = await _photoService.SaveToDiskAsync(carPhotoDto.Photo);

                if (photo != null)
                {
                    car.AddPhoto(photo.PictureUrl, photo.FileName);
                    _unitOfWork.Repository<Car>().Update(car);
                    var result = await _unitOfWork.Complete();
                    if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo car"));
                }
            }
            else
            {
                return BadRequest(new ApiResponse(400, "Problem saving photo to disk"));
            }

            return _mapper.Map<Car, CarReturnDto>(car);
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}/photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int id, int photoId)
        {
            var spec = new CarWithBrandsAndTypesSpecification(id);
            var car = await _unitOfWork.Repository<Car>().GetEntityWithSpec(spec);

            var photo = car.Photos.SingleOrDefault(x => x.Id == photoId);

            if (photo != null)
            {
                if (photo.IsMain)
                    return BadRequest(new ApiResponse(400,
                        "You cannot delete the main photo"));

                _photoService.DeleteFromDisk(photo);
            }
            else
            {
                return BadRequest(new ApiResponse(400, "Photo does not exist"));
            }

            car.RemovePhoto(photoId);

            _unitOfWork.Repository<Car>().Update(car);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo product"));

            return Ok();
        }

        [HttpPost("{id}/photo/{photoId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CarReturnDto>> SetMainPhoto(int id, int photoId)
        {
            var spec = new CarWithBrandsAndTypesSpecification(id);
            var car = await _unitOfWork.Repository<Car>().GetEntityWithSpec(spec);

            if (car.Photos.All(x => x.Id != photoId)) return NotFound();

            car.SetMainPhoto(photoId);

            _unitOfWork.Repository<Car>().Update(car);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo product"));

            return _mapper.Map<Car, CarReturnDto>(car);
        }

        [HttpGet("checkCar")]
        public async Task<ActionResult<bool>> GetCarReturned(int id)
        {
            var car = await _orderService.CheckCarAvailable(id);
            return Ok(car);
        }

    }
}