package website.crm_backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.models.Team;



public interface TeamRepository extends JpaRepository<Team, Integer> {
}
