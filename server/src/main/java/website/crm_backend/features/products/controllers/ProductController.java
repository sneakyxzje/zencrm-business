package website.crm_backend.features.products.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.products.dtos.request.CreateProductRequest;
import website.crm_backend.features.products.dtos.response.CreateProductResponse;
import website.crm_backend.features.products.dtos.response.GetAllProductResponse;
import website.crm_backend.features.products.services.ProductService;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;


    @PostMapping
    public ResponseEntity<CreateProductResponse> createProduct(@RequestBody CreateProductRequest request) {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @GetMapping 
    public ResponseEntity<Page<GetAllProductResponse>> getAllProduct(@RequestParam(name="q", required = false) String q, Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProduct(q, pageable));
    }
}
