package website.crm_backend.features.teams.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.teams.dtos.request.CreateTeamRequest;
import website.crm_backend.features.teams.dtos.response.CreateTeamResponse;
import website.crm_backend.features.teams.services.TeamService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team")
public class TeamController {

    private final TeamService teamService;
    
    @PostMapping("/create")
    public ResponseEntity<CreateTeamResponse> create(@RequestBody CreateTeamRequest request) {
        CreateTeamResponse res = teamService.createTeam(request);
        return ResponseEntity.ok(res);
    }
    
}
