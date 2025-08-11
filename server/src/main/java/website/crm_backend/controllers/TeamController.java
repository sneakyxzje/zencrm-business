package website.crm_backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import website.crm_backend.DTOS.request.CreateTeamRequest;
import website.crm_backend.DTOS.response.CreateTeamResponse;
import website.crm_backend.services.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/team")
public class TeamController {

    @Autowired
    TeamService teamService;
    
    @PostMapping("/create")
    public ResponseEntity<CreateTeamResponse> create(@RequestBody CreateTeamRequest request) {
        CreateTeamResponse res = teamService.createTeam(request);
        return ResponseEntity.ok(res);
    }
    
}
