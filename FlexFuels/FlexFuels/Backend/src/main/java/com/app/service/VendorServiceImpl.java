package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AddVendorDto;
import com.app.dto.LoginDto;
import com.app.entities.Vendor;
import com.app.respository.VendorRepo;

@Service
@Transactional
public class VendorServiceImpl implements VendorService{

	@Autowired
	private VendorRepo vendorRepo;
	
	@Autowired
	private ModelMapper mapper;
	@Override
	public Vendor addNewVendo(AddVendorDto dto)
	{
		System.out.println("dto====="+dto);
		Vendor vendor =mapper.map(dto, Vendor.class);
				System.out.println("vendor-----"+vendor);
		return vendorRepo.save(vendor);
//		return ;
	}

	@Override
	public Vendor updateVendor(AddVendorDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Vendor> getAllVendor() {
		// TODO Auto-generated method stub
		return vendorRepo.findAll();
	}

	@Override
	public Vendor getVendorById(Long vendorId) {
		// TODO Auto-generated method stub
	return vendorRepo.findById(vendorId).orElseThrow(()-> new ResourceNotFoundException("Invalid Id"));
		
	}
	
	@Override
	public Vendor getVendorLogin(LoginDto dto) {
		
		
		
		Vendor v = vendorRepo.findByEmail(dto.getEmail());
		System.out.println("before comparing vendor"+ v);
		if(v.getEmail().equals(dto.getEmail()) && v.getPassword().equals(dto.getPassword()))
		{
			System.out.println("Login Details matched---");
			return v;
		}
		else
		{
			System.out.println("Login Details didn't matched---");
			v= null;
		}
		return v;
	
		
	}



}
