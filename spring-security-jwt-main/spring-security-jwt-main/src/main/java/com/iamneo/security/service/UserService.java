package com.iamneo.security.service;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import com.iamneo.security.dto.request.FeedBackRequest;
import com.iamneo.security.dto.request.UserRequest;
import com.iamneo.security.entity.User;
import com.iamneo.security.repository.UserRepository;
import com.iamneo.security.vo.Feedback;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;

	private final RestTemplate restTemplate;

	public void addUserFeedback(UserRequest userRequest) {
		var user = User.builder().name(userRequest.getEmail()).build();
		var feedback = FeedBackRequest.builder().email(userRequest.getEmail()).feedback(userRequest.getFeedback())
				.build();
		userRepository.save(user);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<FeedBackRequest> requestEntity = new HttpEntity<>(feedback, headers);
		restTemplate.postForObject("http://FEEDBACK-SERVICE/api/v1/feed/addFeedback", requestEntity, Feedback.class);
	}
}
