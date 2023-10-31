<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/Recommendation.php');

class RecommendationService
{
    private Recommendation $recommendationRepository;

    public function __construct()
    {
        $this->recommendationRepository = new Recommendation();
    }

    public function getAllByCourseId($course_id): array
    {
        $recommendationsData = $this->recommendationRepository->getAllByCourseId($course_id);

        $recommendations = [];
        foreach ($recommendationsData as $data) {
            $recommendation = [
                'recommendation_id' => $data['recommendation_id'],
                'message' => $data['recommendation_message'],
                'sender' => [
                    'id' => $data['sender_id'],
                    'name' => $data['sender_name'],
                    'email' => $data['sender_email'],
                    'role' => $data['sender_role'],
                ],
                'course' => [
                    'id' => $data['course_id'],
                    'name' => $data['course_name'],
                    'description' => $data['course_description'],
                ],
            ];
            $recommendations[] = $recommendation;
        }

        return $recommendations;
    }
}
