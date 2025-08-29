package website.crm_backend.domain.repositories.teams;


import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.domain.models.teams.Team;



public interface TeamRepository extends JpaRepository<Team, Integer> {
}
