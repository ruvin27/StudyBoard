<?php

class ServiceResponse
{
    private $status;
    private $data;
    private $message;

    public function __construct($status, $data = null, $message = null)
    {
        $this->status = $status;
        $this->data = $data;
        $this->message = $message;
    }

    public static function success($data, $message = null)
    {
        return new self('success', $data, $message);
    }

    public static function error($message)
    {
        return new self('error', null, $message);

    }

    public function isSuccess()
    {
        return $this->status === 'success';
    }

    public function getData()
    {
        return $this->data;
    }

    public function getMessage()
    {
        return $this->message;
    }


}


