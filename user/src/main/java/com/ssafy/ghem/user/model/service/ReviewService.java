package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.ReviewVO;

public interface ReviewService {
    HttpVo doReview(ReviewVO reviewInfo);
    HttpVo checkReview(ReviewVO reviewInfo);
    HttpVo deleteReview(Long user_game_id);
    HttpVo updateReview(ReviewVO reviewInfo);
    HttpVo listReview(Long user_id);
}
