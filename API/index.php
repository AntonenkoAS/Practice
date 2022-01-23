<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json; charset=utf-8');
require 'connect.php';
require 'function.php';
$method = $_SERVER['REQUEST_METHOD'];
$params = explode('/', $_GET['q']);
$type = $params[0];
$id = $params[1];

if($method === 'GET')
{
    if($type === 'user')
    {
        if(isset($id))
        {
            getUser($connect, $id);
        }
        else getUsers($connect);
    }
    if($type === 'document')
    {
        if(isset($id))
        {
            getDocument($connect, $id);
        }
        else getDocuments($connect);
    }
    if($type === 'education')
    {
        if(isset($id))
        {
            getEducation($connect, $id);
        }
    }
    if($type === 'quality')
    {
        if(isset($id))
        {
            getQuality($connect, $id);
        }
    }
    if($type === 'work')
    {
        if(isset($id))
        {
            getWork($connect, $id);
        }
    }
    if($type === 'message')
    {
        if(isset($id))
        {
            getMessage($connect, $id);
        }
        else getMessages($connect);
    }
    if($type === 'events')
    {
        getEvents($connect);
    }
    if($type === 'session')
    {
        getSession($connect);
    }
}
else if($method === 'POST')
{
    if($type === 'user') addUser($connect, $_POST);
}
else if($method === 'PUT')
{
    if($type === 'user') 
    {
        if(isset($id)){ 
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            updateUser($connect, $id, $data);
        }
    }
}

else if($method === 'DELETE')
{
    if($type === 'user') 
    {
        if(isset($id)) deleteUser($connect, $id);
    }
}


else if($method === 'VIEW')
{
    if($type === 'user') 
    {
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);
        searchUser($connect, $data);
    }
}

