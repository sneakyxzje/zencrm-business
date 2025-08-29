package website.crm_backend.domain.repositories.categories;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.domain.models.categories.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
    
}
