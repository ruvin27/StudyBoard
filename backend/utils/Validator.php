<?php

class Validator
{
    public static function validate($data, $requiredFields): ?array
    {
        $errors = [];

        foreach ($requiredFields as $field) {
            $value = is_array($data) ? ($data[$field] ?? null) : ($data->$field ?? null);
            if (is_null($value) || trim((string)$value) === '') {
                $errors[$field] = "$field is required";
            }
        }

        return empty($errors) ? null : $errors;
    }
}
