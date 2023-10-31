<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/Objective.php');

class ObjectiveService
{
    private Objective $objectiveRepository;

    public function __construct()
    {
        $this->objectiveRepository = new Objective();
    }


    public function listAll(): ServiceResponse
    {
        $result = $this->objectiveRepository->listAll();

        return ServiceResponse::success($result);
    }

}

