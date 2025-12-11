package website.crm_backend.features.users.services;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.users.dtos.response.UserDTOResponse;
import website.crm_backend.shared.mapper.UserMapper;

@Service
@RequiredArgsConstructor
public class UserServices {
 
    private final UserRepository userRepo;
    private final UserMapper userMapper;

    public Page<UserDTOResponse> getAllUser (Pageable pageable) {
        return userRepo.findAll(pageable).map(u -> userMapper.toUserDTO(u));
    }
}
