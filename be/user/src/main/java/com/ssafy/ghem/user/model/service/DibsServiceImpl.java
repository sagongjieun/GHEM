package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.AlreadyExistData;
import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Dib;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.individual.DibsIndividualRepository;
import com.ssafy.ghem.user.model.vo.DibsVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class DibsServiceImpl implements DibsService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final DibsIndividualRepository dibsIndividualRepository;

    @Override
    public HttpVO doDibs(DibsVO dibsInfo) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(dibsInfo.getUserId());
        Game game = getGame(dibsInfo.getAppId());

        Dib check = dibsIndividualRepository.getByAppIdAndUserId(dibsInfo.getAppId(),
                dibsInfo.getUserId());
        if(check != null) throw new AlreadyExistData("이미 찜을 하였습니다. app_id: "+dibsInfo.getAppId()+
                " user_id: "+dibsInfo.getAppId());

        Dib dib = Dib.builder()
                .app_id(game.getAppId())
                .user_id(user.getUser_id())
                .build();

        dibsIndividualRepository.save(dib);
        map.put("result", dib);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVO checkDibs(Long app_id, Long user_id) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(user_id);
        Game game = getGame(app_id);

        Dib dib = dibsIndividualRepository.getByAppIdAndUserId(app_id, user_id);
        map.put("Dib", dib);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVO listDibGame(Long user_id) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(user_id);

        List<Dib> dibs = dibsIndividualRepository.getListByAppId(user_id);
        List<DibsVO> dibsInfos = new ArrayList();
        for(Dib dib : dibs){
            dibsInfos.add(new DibsVO(dib.getDibs_id(),
                    dib.getApp_id(),
                    dib.getUser_id(),
                    getGame(dib.getApp_id())));
        }

        map.put("Dibs_List", dibsInfos);
        http.setData(map);
        http.setFlag(true);
        return http;
    }

    @Override
    public HttpVO deleteDibs(Long dibs_id) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        dibsIndividualRepository.deleteById(dibs_id);

        http.setFlag(true);
        return http;
    }

    @Transactional
    public User getUser(Long user_id){
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다."));

        return user;
    }

    @Transactional
    public Game getGame(Long app_id){
        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다."));

        return game;
    }

}
