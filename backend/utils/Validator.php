<?php

class Validator
{
    public static function validate($data, $requiredFields)
    {
        $errors = [];

        foreach ($requiredFields as $field) {
            $value = is_array($data) ? (isset($data[$field]) ? $data[$field] : null) : (isset($data->$field) ? $data->$field : null);
            if (empty(trim($value))) {
                $errors[$field] = "$field is required";
            }
        }

        return empty($errors) ? null : $errors;
    }
}
